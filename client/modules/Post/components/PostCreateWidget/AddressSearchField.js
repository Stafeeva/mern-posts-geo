import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './PostCreateWidget.css';

class AddressSearchField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAddress: undefined,
      showOptions: false,
    };
  }

  onTypeAddress = (event) => {
    const address = event.target.value;

    if (address.length > 2) {
      this.props.getAddresses(address);

      this.state.showOptions = true;
    }
  };

  onSelectAddress = (event) => {
    const { address } = event.target.dataset;

    this.setState({
      selectedAddress: address,
      showOptions: false,
    });
  }

  onClickRemoveLocation = () => {
    this.setState({
      selectedAddress: undefined,
      showOptions: false,
    });
  }

  render() {
    const { onClickRemoveLocation, onSelectAddress, onTypeAddress } = this;
    const { addresses } = this.props;
    const { selectedAddress, showOptions } = this.state;

    return (
      <div className={styles['address-search-field']}>
        {selectedAddress ? (
          <div className={styles['selected-option-container']}>
            <input
              key="selected-address"
              value={selectedAddress}
              className={styles['form-field']}
              ref="location"
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
              className={styles['form-field']}
              placeholder="Location"
            />
            {showOptions && addresses && addresses.length > 0 && (
              <div className={styles['options-list']}>
                {addresses.map(address => (
                  <a
                    className={styles['option-field']}
                    onClick={onSelectAddress}
                    key={address.formattedAddress}
                    data-address={address.formattedAddress}
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
  addresses: PropTypes.arrayOf(PropTypes.shape({
    address: PropTypes.string,
    location: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
  })),
  getAddresses: PropTypes.func.isRequired,
};

export default AddressSearchField;
