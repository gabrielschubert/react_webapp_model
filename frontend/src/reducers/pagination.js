function initialState() {
  return {
    page: 1,
    perPage: 20,
    totalPages: 1,
    pageUpdated: true,
    updating: false,
  };
}

export function pagination(state = initialState(), action) {
  switch (action.type) {
    case "NEXT_PAGE":
      if (state.page + 1 <= state.totalPages) {
        return { ...state, page: state.page + 1, pageUpdated: false };
      } else {
        return state;
      }
    case "PREVIOUS_PAGE":
      if (state.page - 1 >= 1) {
        return { ...state, page: state.page - 1, pageUpdated: false };
      } else {
        return state;
      }
    case "SET_PAGE":
      return {
        ...state,
        totalPages: action.totalPages ? action.totalPages : state.totalPages,
        page: action.actualPage,
        pageUpdated: action.pageUpdated,
      };
    case "SET_PER_PAGE":
      return {
        ...state,
        perPage: action.perPage,
        pageUpdated: action.pageUpdated,
      };

    default:
      return state;
  }
}
