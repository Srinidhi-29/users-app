const initialState = 0;
  
  const tabReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SELECT_TAB':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default tabReducer;