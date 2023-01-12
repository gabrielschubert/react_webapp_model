function initialState() {
  return({list:[], loading:true})
}

export function itemsList(state = initialState(), action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.loading}
    case 'SET_LIST':
      return { ...state, list: action.list}
    default:
      return state
  }
}