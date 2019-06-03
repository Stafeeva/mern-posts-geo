import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import callApi from '../../../../util/apiCaller';

import styles from './AddressSearchField.css';

class AddressSearchField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addresses: [],
      isError: false,
      isLoading: false,
      showOptions: false,
    };
  }

  onTypeAddress = (event) => {
    const address = event.target.value;

    this.setState({
      isError: false,
      showOptions: false,
    });

    if (address.length > 2 && !this.state.isLoading) {
      this.setState({ isLoading: true });
      callApi(`addresses?address=${address}`).then(addresses => {
        this.setState({
          addresses,
          isLoading: false,
          showOptions: addresses && addresses.length > 0,
        });
      }).catch(() => {
        this.setState({
          isLoading: false,
          isError: true,
        });
      });
    }
  };

  onSelectAddress = (address) => {
    this.setState({
      showOptions: false,
    });

    this.props.onSelectAddress(address);
  }

  onClickRemoveLocation = () => {
    this.setState({
      address: [],
      showOptions: false,
    });

    this.props.onRemoveAddress();
  }

  render() {
    const { onClickRemoveLocation, onSelectAddress, onTypeAddress } = this;
    const { addresses, isError, isLoading, showOptions } = this.state;
    const { selectedAddress } = this.props;
    const { messages } = this.props.intl;

    return (
      <div className={styles['address-search-field']}>
        {selectedAddress ? (
          <div className={styles['selected-option-container']}>
            <input
              key="selected-address"
              value={selectedAddress.formattedAddress}
              className={styles['address-input']}
              readOnly
            />
            <button
              onClick={onClickRemoveLocation}
              className={styles['remove-button']}
            >
              {messages.remove}
            </button>
          </div>
        ) : (
          <div className={styles['address-search-container']}>
            <input
              key="address-input"
              onChange={onTypeAddress}
              className={styles['address-input']}
              placeholder={messages.location}
            />
            {isLoading && (
              <span className={styles['loading-message']}>
                {messages.loading}
              </span>
            )}
            {isError && (
              <p className={styles['error-message']}>{messages.error}</p>
            )}
            {showOptions && (
              <div className={styles['options-list']}>
                {addresses.map(address => (
                  <a
                    className={styles['option-field']}
                    onClick={() => onSelectAddress(address)}
                    key={address.formattedAddress}
                  >
                    {address.formattedAddress}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

AddressSearchField.propTypes = {
  intl: intlShape.isRequired,
  onRemoveAddress: PropTypes.func.isRequired,
  onSelectAddress: PropTypes.func.isRequired,
  selectedAddress: PropTypes.shape({
    formattedAddress: PropTypes.string,
    location: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
  }),
};

export default injectIntl(AddressSearchField);
