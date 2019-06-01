import callApi from '../../util/apiCaller';

export const ADD_ADDRESSES = 'ADD_ADDRESSES';
export const SAVE_SELECTED_ADDRESS = 'SAVE_SELECTED_ADDRESS';

export function addAddresses(addresses) {
  return {
    type: ADD_ADDRESSES,
    addresses,
  };
}

export function saveSelectedAddress(address) {
  return {
    type: SAVE_SELECTED_ADDRESS,
    address,
  };
}

export function getAddressesRequest(address) {
  return (dispatch) => {
    return callApi(`addresses?address=${address}`).then(res => {
      dispatch(addAddresses(res));
    });
  };
}
