const initialState = {
  access: null,
  location: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACCESS':
      return { ...state, access: action.payload };
    case "GET_LOCATION":
      return {
        ...state,
        location: action.payload,
      };
    default:
      return state;
  }
};
