const initialState = [];

const userListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_USER_LIST":
      return action.payload;
    default:
      return state;
  }
};

export default userListReducer;
