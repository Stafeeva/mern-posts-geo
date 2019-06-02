import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import AddressSearchField from '../AddressSearchField/AddressSearchField';

// Import Style
import styles from './PostCreateWidget.css';

const defaultState = {
  name: '',
  title: '',
  content: '',
  address: null,
};

export class PostCreateWidget extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  onChangeName = (event) => {
    this.setState({ name: event.target.value });
  }

  onChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  }

  onChangeContent = (event) => {
    this.setState({ content: event.target.value });
  }

  saveAddress = address => {
    this.setState({ address });
  };

  clearAddressField = () => {
    this.setState({ address: null });
  };

  addPost = () => {
    const { name, title, content, address } = this.state;

    if (name && title && content && address) {
      this.props.addPost(name, title, content, address);
      this.state = defaultState;
    }
  };

  render() {
    const { messages } = this.props.intl;
    const {
      addPost,
      clearAddressField,
      onChangeContent,
      onChangeName,
      onChangeTitle,
      saveAddress,
    } = this;
    const { name, title, content, address } = this.state;

    return (
      <div className={styles.form}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewPost" /></h2>
          <input
            value={name}
            onChange={onChangeName}
            placeholder={messages.authorName}
            className={styles['form-field']}
          />
          <input
            value={title}
            onChange={onChangeTitle}
            placeholder={messages.postTitle}
            className={styles['form-field']}
          />
          <textarea
            value={content}
            onChange={onChangeContent}
            placeholder={messages.postContent}
            className={styles['form-field']}
          />
          <AddressSearchField
            onRemoveAddress={clearAddressField}
            onSelectAddress={saveAddress}
            selectedAddress={address}
          />
          <a className={styles['post-submit-button']} href="#" onClick={addPost}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(PostCreateWidget);
