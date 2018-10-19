import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withPillTime } from '../../services/pillTime';
import storageService from '../../services/storage';
import times from '../../util/times';
import config from '../../config';

import { Icon } from 'antd';
import Layout from '../Layout/Layout';
import PillButton from '../PillButton/PillButton';

import './PillForm.scss';

class Pill extends Component {
  static propTypes = {
    takeAPill: PropTypes.func,
    untakeAPill: PropTypes.func,
    isTaken: PropTypes.func,
    loaded: PropTypes.bool,
    loading: PropTypes.bool,

    categories: PropTypes.arrayOf(PropTypes.string),
    days: PropTypes.number,
  };

  render() {
    return (
      <Layout title="Have you taken your " titleAccent="pills" titleSuffix="?" footerLinkIcon="setting" footerLink="/history">
        <div className="PillForm__container">
          {this.props.loaded
            ? times(this.props.days, index => (
              this.props.categories.map(category => (
                <PillButton
                  key={category}
                  takeAPill={this.props.takeAPill}
                  untakeAPill={this.props.untakeAPill}
                  isTaken={this.props.isTaken}
                  category={category}
                  day={index}
                />
              ))
            ))
            : (
              <Icon type="loading" theme="outlined" />
            )}
        </div>
      </Layout>
    );
  }
}

export default withPillTime(Pill, config.pillCategories, storageService);
