import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import AddressSearchField from '../AddressSearchField/AddressSearchField';

import styles from './PostFilter.css';

class PostFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationFilter: '',
      radius: null,
      textFilter: '',
    };
  }

  onClickClear = () => {
    this.setState = {
      locationFilter: '',
      radius: null,
      textFilter: '',
    };
  };

  onClickFind = () => {
    this.props.findPosts({
      find: this.state.textFilter,
      radius: null,
      locationFilter: '',
    });
  };

  onTypeTextFilter = event => {
    this.setState({ textFilter: event.target.value });
  };

  render() {
    const {
      onClickClear,
      onClickFind,
      onTypeRadius,
      onTypeTextFilter,
    } = this;
    const { messages } = this.props.intl;

    return (
      <div>
        <div className={styles['post-filters']}>
          <div className={styles['post-filter']}>
            <p className={styles['filter-title']}>{messages.locationFilter}</p>
            <AddressSearchField />
            <p className={styles['filter-title']}>{messages.radius}</p>
            <input
              className={styles['post-filter-input']}
              onChange={onTypeRadius}
            />
          </div>
          <div className={styles['post-filter']}>
            <p className={styles['filter-title']}>{messages.textFilter}</p>
            <input
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
            onClick={onClickClear}
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
