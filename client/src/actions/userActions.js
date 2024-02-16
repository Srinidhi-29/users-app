// Action creator to update form values
export const updateForm = (field, value) => ({
    type: 'UPDATE_FORM',
    payload: { field, value }
  });
  
  // Action creator to update users list
  export const updateUserList = (users) => ({
    type: 'UPDATE_USER_LIST',
    payload: users
  });

  // Action creator to clear form data
  export const clearForm = () => ({
    type: 'CLEAR_FORM'
  });

  // Action creator to select tab
  export const selectTab = (tabIndex) => ({
    type: 'SELECT_TAB',
    payload: tabIndex
  });
  