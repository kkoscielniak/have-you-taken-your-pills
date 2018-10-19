import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { DateTime } from 'luxon';
import { Icon } from 'antd';
import { withPillTime } from '../../services/pillTime';
import storageService from '../../services/storage';
import times from '../../util/times';
import config from '../../config';

import Layout from '../Layout/Layout';

import './History.scss';

class History extends Component {
  static propTypes = {
    pillTimes: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    isTaken: PropTypes.func,
  };

  render() {
    return (
      <Layout title="Show me your " titleAccent="history" titleSuffix="" footerLinkIcon="step-backward" footerLink="/">
        <div className="History__container">
          {times(config.historyLength, index => {
            const dateTime = DateTime.local().minus({ days: index });
            return (
              <div className="History__dayContainer" key={index}>
                <div className="History__dayContainerDate">
                  {dateTime.toFormat('DDDD')}
                </div>
                {config.pillCategories.map(category => {
                  const isTaken = this.props.isTaken(category, index);
                  return (
                    <div className={classnames('History__categoryContainer', { 'History__categoryContainer--good': isTaken })} key={category}>
                      <div className="History__categoryContainerCategory">
                        {category}
                      </div>
                      <div className="History__categoryContainerStatus">
                        {isTaken
                          ? (
                            <Icon className="History__goodIcon" type="like" theme="filled" />
                          )
                          : (
                            <Icon className="History__badIcon" type="dislike" theme="filled" />
                          )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </Layout>
    );
  }
}

export default withPillTime(History, config.pillCategories, storageService);
