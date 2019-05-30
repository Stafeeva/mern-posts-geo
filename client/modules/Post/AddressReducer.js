import { ADD_ADDRESSES } from './AddressActions';

// Initial State
const initialState = { data: [] };

const AddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ADDRESSES :
      return {
        data: action.addresses,
      };

    default:
      return state;
  }
};

export const getAddresses = state => state.addresses.data;

export default AddressReducer;
