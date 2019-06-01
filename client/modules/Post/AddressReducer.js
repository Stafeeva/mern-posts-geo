import { ADD_ADDRESSES, SAVE_SELECTED_ADDRESS } from './AddressActions';

const initialState = {
  data: [],
  selectedAddress: {},
};

const AddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ADDRESSES:
      return {
        ...state,
        data: action.addresses,
      };

    case SAVE_SELECTED_ADDRESS:
      return {
        ...state,
        selectedAddress: action.address,
      };

    default:
      return state;
  }
};

export const getAddresses = state => state.addresses.data;

export const getSelectedAddress = state => state.addresses.selectedAddress;

export default AddressReducer;
