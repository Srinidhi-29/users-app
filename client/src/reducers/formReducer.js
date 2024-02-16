const initialState = {
  name: "",
  email: "",
  age: "",
  city: "",
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_FORM":
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case "CLEAR_FORM":
      return initialState;
    default:
      return state;
  }
};

export default formReducer;
