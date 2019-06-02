import React, { Component } from 'react';
import PropTypes from 'prop-types';
import callApi from '../../../../util/apiCaller';

import styles from './AddressSearchField.css';

class AddressSearchField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addresses: [],
      selectedAddress: '',
      showOptions: false,
    };
  }

  onTypeAddress = (event) => {
    const address = event.target.value;

    if (address.length > 2) {
      // what if this api call fails?
      callApi(`addresses?address=${address}`).then(addresses => {
        this.setState({
          addresses,
          showOptions: addresses && addresses.length > 0,
        });
      });
    }
  };

  onSelectAddress = (address) => {
    this.setState({
      selectedAddress: address.formattedAddress,
      showOptions: false,
    });

    this.props.onSelectAddress(address);
  }

  onClickRemoveLocation = () => {
    // update
    this.setState({
      address: [],
      selectedAddress: '',
      showOptions: false,
    });
  }

  render() {
    const { onClickRemoveLocation, onSelectAddress, onTypeAddress } = this;
    const { addresses, selectedAddress, showOptions } = this.state;

    return (
      <div className={styles['address-search-field']}>
        {selectedAddress ? (
          <div className={styles['selected-option-container']}>
            <input
              key="selected-address"
              value={selectedAddress}
              className={styles['address-input']}
              readOnly
            />
            <button
              onClick={onClickRemoveLocation}
              className={styles['remove-button']}
            >
              Remove
            </button>
          </div>
        ) : (
          <div>
            <input
              key="address-input"
              onChange={onTypeAddress}
              className={styles['address-input']}
              placeholder="Location"
            />
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
  onSelectAddress: PropTypes.func.isRequired,
};

export default AddressSearchField;
