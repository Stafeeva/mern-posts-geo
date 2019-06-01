import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAddressesRequest, saveSelectedAddress } from '../../AddressActions';

import { getAddresses, getSelectedAddress } from '../../AddressReducer';

import styles from './PostCreateWidget.css';

class AddressSearchField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showOptions: false,
    };
  }

  onTypeAddress = (event) => {
    const address = event.target.value;

    if (address.length > 2) {
      this.props.dispatch(getAddressesRequest(address));

      this.state.showOptions = true;
    }
  };

  onSelectAddress = (address) => {
    this.setState({
      showOptions: false,
    });

    this.props.dispatch(saveSelectedAddress(address));
  }

  onClickRemoveLocation = () => {
    this.saveAddress('');

    this.setState({
      showOptions: false,
    });
  }

  render() {
    const { onClickRemoveLocation, onSelectAddress, onTypeAddress } = this;
    const { addresses, selectedAddress } = this.props;
    const { showOptions } = this.state;

    return (
      <div className={styles['address-search-field']}>
        {selectedAddress.formattedAddress ? (
          <div className={styles['selected-option-container']}>
            <input
              key="selected-address"
              value={selectedAddress.formattedAddress}
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

function mapStateToProps(state) {
  return {
    addresses: getAddresses(state),
    selectedAddress: getSelectedAddress(state),
  };
}

AddressSearchField.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.shape({
    address: PropTypes.string,
    location: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
  })),
  dispatch: PropTypes.func.isRequired,
  selectedAddress: PropTypes.shape({
    formattedAddress: PropTypes.string,
    location: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
  }),
};

export default connect(mapStateToProps)(AddressSearchField);
