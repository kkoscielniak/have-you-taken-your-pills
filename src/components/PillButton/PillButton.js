import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'antd';

import './PillButton.scss';

class PillButton extends Component {
  static propTypes = {
    isTaken: PropTypes.func,
    takeAPill: PropTypes.func,
    untakeAPill: PropTypes.func,
    category: PropTypes.string,
    day: PropTypes.number,
  };

  mapDayToString = (day, category) => {
    switch (day) {
      case 0:
        return `Today ${category}`;
      case 1:
        return `Yesterday ${category}`;
      default:
        return `${day} days ago ${category}`;
    }
  }

  onTakenAPill = async () => {
    await this.props.takeAPill(this.props.category, this.props.day);
  };

  onUntakenAPill = async () => {
    await this.props.untakeAPill(this.props.category, this.props.day);
  };

  render() {
    const isTaken = this.props.isTaken(this.props.category, this.props.day);

    return (
      <div className="PillButton__container">
        <Button
          className="PillButton__button"
          size="large"
          block
          type={isTaken ? 'primary' : 'danger'}
          onClick={isTaken ? this.onUntakenAPill : this.onTakenAPill}
        >
          {this.mapDayToString(this.props.day, this.props.category)}
        </Button>
      </div>
    );
  }
}

export default PillButton;
