import React, { Component } from 'react';
import Pill from '../components/PillForm/PillForm';

import config from '../config';

class HomePage extends Component {
  render() {
    return (
      <Pill categories={config.pillCategories} days={config.days} />
    );
  }
}

export default HomePage;