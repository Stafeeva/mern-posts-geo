import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import AddressSearchField from './AddressSearchField';

// Import Style
import styles from './PostCreateWidget.css';

export class PostCreateWidget extends Component {
  addPost = () => {
    const nameRef = this.refs.name;
    const titleRef = this.refs.title;
    const contentRef = this.refs.content;
    const locationRef = this.refs.location;

    console.log('locationRef.value', locationRef.value);

    if (nameRef.value && titleRef.value && contentRef.value && nameRef.location) {
      this.props.addPost(nameRef.value, titleRef.value, contentRef.value, locationRef.value);
      nameRef.value = titleRef.value = contentRef.value = locationRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddPost ? styles.appear : '')}`;

    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewPost" /></h2>
          <input placeholder={this.props.intl.messages.authorName} className={styles['form-field']} ref="name" />
          <input placeholder={this.props.intl.messages.postTitle} className={styles['form-field']} ref="title" />
          <textarea placeholder={this.props.intl.messages.postContent} className={styles['form-field']} ref="content" />
          <AddressSearchField
            addresses={this.props.addresses}
            getAddresses={this.props.getAddresses}
          />
          <a className={styles['post-submit-button']} href="#" onClick={this.addPost}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired,
  addresses: PropTypes.arrayOf(PropTypes.shape({
    address: PropTypes.string,
    location: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
  })),
  getAddresses: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  showAddPost: PropTypes.bool.isRequired,
};

export default injectIntl(PostCreateWidget);
