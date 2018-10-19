import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import { Icon } from 'antd';

import './Layout.scss';

class Layout extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    children: PropTypes.element,
    title: PropTypes.string,
    titleAccent: PropTypes.string,
    titleSuffix: PropTypes.string,
    footerLinkIcon: PropTypes.string,
    footerLink: PropTypes.string,
  };

  render() {
    return (
      <div className="Layout__container">
        <div className="Layout__headerContainer">
          <h1 className="Layout__header">{this.props.title}<span className="Layout__headerAccent">{this.props.titleAccent}</span>{this.props.titleSuffix}</h1>
        </div>
        <div className="Layout__contentContainer">
          {!this.props.loading
            ? this.props.children
            : (
              <Icon type="loading" theme="outlined" />
            )}
        </div>
        <div className="Layout__footerContainer">
          <Link to={this.props.footerLink}><Icon type={this.props.footerLinkIcon} theme="filled" style={{ fontSize: '26px' }} /></Link>
        </div>
      </div>
    );
  }
}

export default Layout;