import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import AddressSearchField from '../AddressSearchField/AddressSearchField';

import styles from './PostFilter.css';

class PostFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: null,
      radius: '',
      text: '',
    };
  }

  onClickFind = () => {
    console.log('state', this.state);

    this.props.findPosts(this.state);
  };

  onTypeTextFilter = event => {
    this.setState({ text: event.target.value });
  };

  onTypeRadius = event => {
    this.setState({ radius: event.target.value });
  };

  selectAddress = address => {
    this.setState({ location: address });
  };

  clearAddressField = () => {
    this.setState({ location: null });
  };

  clearFilters = () => {
    this.setState({
      location: null,
      radius: '',
      text: '',
    });
  };

  render() {
    const {
      clearAddressField,
      clearFilters,
      onClickFind,
      onTypeRadius,
      onTypeTextFilter,
      selectAddress,
    } = this;
    const { messages } = this.props.intl;
    const { location, radius, text } = this.state;

    return (
      <div>
        <div className={styles['post-filters']}>
          <div className={styles['post-filter']}>
            <p className={styles['filter-title']}>{messages.locationFilter}</p>
            <AddressSearchField
              onRemoveAddress={clearAddressField}
              onSelectAddress={selectAddress}
              selectedAddress={location}
            />
            <p className={styles['filter-title']}>{messages.radius}</p>
            <input
              value={radius}
              className={styles['post-filter-input']}
              onChange={onTypeRadius}
            />
          </div>
          <div className={styles['post-filter']}>
            <p className={styles['filter-title']}>{messages.textFilter}</p>
            <input
              value={text}
              className={styles['post-filter-input']}
              onChange={onTypeTextFilter}
            />
          </div>
        </div>
        <div className={styles['filter-buttons']}>
          <button
            className={styles['filter-button']}
            type="button"
            onClick={onClickFind}
          >
            {messages.findPosts}
          </button>
          <button
            className={styles['filter-button']}
            type="button"
            onClick={clearFilters}
          >
            {messages.clearFilters}
          </button>
        </div>
      </div>
    );
  }
}

PostFilter.propTypes = {
  findPosts: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(PostFilter);
