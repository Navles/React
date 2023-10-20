import actionTypes from "../Hooks/Actions";

export const initialState = {
  formData: {
    name: "",
    email: "",
    phone: "",
    password: "",
    cpass: "",
    language: "",
    gender: "",
    dob: "",
  },
  errors: {},
  isEditing: false,
  isLoading: false,
  showPassword: false,
  cshowPassword: false,
  apiData: [],
  searchText: "",
  selectedProducts: [],
  deleteDialogVisible: false,
  deleteTarget: null,
  deleteSelectedDialogVisible: false,
};

export function reducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_FIELD:
      return {
        ...state,
        formData: { ...state.formData, [action.field]: action.value },
      };
    case actionTypes.SET_ERRORS:
      return { ...state, errors: action.errors };
    case actionTypes.SET_IS_EDITING:
      return { ...state, isEditing: action.value };
    case actionTypes.SET_API_DATA:
      return { ...state, apiData: action.value };
    case actionTypes.SET_SEARCH_TEXT:
      return { ...state, searchText: action.value };
    case actionTypes.SET_SELECTED_PRODUCTS:
      return { ...state, selectedProducts: action.value };
    case actionTypes.SET_DELETE_DIALOG_VISIBLE:
      return { ...state, deleteDialogVisible: action.value };
    case actionTypes.SET_DELETE_TARGET:
      return { ...state, deleteTarget: action.value };
    case actionTypes.SET_DELETE_SELECTED_DIALOG_VISIBLE:
      return { ...state, deleteSelectedDialogVisible: action.value };
    default:
      return state;
  }
}
