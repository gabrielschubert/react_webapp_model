function initialState() {
  return { searchTerm: "", onFocus: false };
}

export function searchState(state = initialState(), action) {
  switch (action.type) {
    case "SEARCH_TERM":
      return { ...state, searchTerm: action.searchTerm };
    case "SET_SEARCH_FOCUS":
      return { ...state, onFocus: action.onFocus };
    default:
      return state;
  }
}
