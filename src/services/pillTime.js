import React, { Component } from 'react';

import config from '../config';
import { DateTime } from 'luxon';

const pillTime = async (pillsCategories = config.pillCategories, storage) => {
  const storageInstance = storage ? await storage : null;
  const pillTimeInstance = {
    pillTimes: {},
    handlers: [
      pillTimes => console.log('PillTimes updated', pillTimes),
    ],
  };

  // take a pill method
  pillTimeInstance.takeAPill = async (category, dateTime = DateTime.local()) => {
    pillTimeInstance.pillTimes[category][dateTime.toFormat(config.storageFormat)] = dateTime.toISO();
    if (storage) {
      await storageInstance.set(config.storageKey, JSON.stringify(pillTimeInstance.pillTimes));
    }
    pillTimeInstance.handlers.forEach(handler => handler(pillTimeInstance.pillTimes));

    return pillTimeInstance.pillTimes;
  };

  // untake a pill method
  pillTimeInstance.untakeAPill = async (category, dateTime = DateTime.local()) => {
    delete pillTimeInstance.pillTimes[category][dateTime.toFormat(config.storageFormat)];
    if (storage) {
      await storageInstance.set(config.storageKey, JSON.stringify(pillTimeInstance.pillTimes));
    }
    pillTimeInstance.handlers.forEach(handler => handler(pillTimeInstance.pillTimes));

    return pillTimeInstance.pillTimes;
  };

  // is taken method
  pillTimeInstance.isTaken = (category, dateTime = DateTime.local()) => {
    return !!pillTimeInstance.pillTimes[category][dateTime.toFormat(config.storageFormat)];
  };

  // on update method
  pillTimeInstance.onUpdate = handler => {
    pillTimeInstance.handlers.push(handler);
  };

  if (storage) {
    const storedData = JSON.parse(await storageInstance.get(config.storageKey));
    if (storedData) {
      pillTimeInstance.pillTimes = storedData;
    }
  }

  // creating categories (if not already exist)
  pillsCategories.forEach(category => {
    if (!pillTimeInstance.pillTimes[category]) {
      pillTimeInstance.pillTimes[category] = {};
    }
  });


  return pillTimeInstance;
};

export function withPillTime(WrappedComponent, pillsCategories, storageService) {

  return class pillTimeHOC extends Component {
    state = {
      loading: true,
      loaded: false,
      pillTimes: {},
    };

    async componentDidMount() {
      this.pillTimeServiceInstance = await pillTime(pillsCategories, storageService());
      this.setState({ loading: false, loaded: true, pillTimes: this.pillTimeServiceInstance.pillTimes });
    }

    takeAPill = async (category, n = 0) => {
      this.setState({ loading: true });
      let dateTime = DateTime.local().minus({ days: n });
      if (n !== 0) {
        dateTime = dateTime.set(config.defaultTimes[category] || { hour: 9, minute: 0 });
      }
      const pillTimes = await this.pillTimeServiceInstance.takeAPill(category, dateTime);
      this.setState({ loading: false, pillTimes });
    }

    untakeAPill = async (category, n = 0) => {
      this.setState({ loading: true });
      const dateTime = DateTime.local().minus({ days: n });
      const pillTimes = await this.pillTimeServiceInstance.untakeAPill(category, dateTime);
      this.setState({ loading: false, pillTimes });
    }

    isTaken = (category, n = 0) => {
      if (!this.state.loaded) {
        return false;
      }
      const dateTime = DateTime.local().minus({ days: n });
      return this.pillTimeServiceInstance.isTaken(category, dateTime);
    }

    render() {
      return <WrappedComponent
        takeAPill={this.takeAPill}
        untakeAPill={this.untakeAPill}
        isTaken={this.isTaken}
        loading={this.state.loading}
        loaded={this.state.loaded}
        pillTimes={this.state.pillTimes}
        {...this.props}
      />;
    }
  };
}

export default pillTime;
