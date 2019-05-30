import callApi from '../../util/apiCaller';

export const ADD_ADDRESSES = 'ADD_ADDRESSES';

export function addAddresses(addresses) {
  return {
    type: ADD_ADDRESSES,
    addresses,
  };
}

export function getAddressesRequest(address) {
  return (dispatch) => {
    return callApi(`addresses?address=${address}`).then(res => {
      dispatch(addAddresses(res));
    });
  };
}
