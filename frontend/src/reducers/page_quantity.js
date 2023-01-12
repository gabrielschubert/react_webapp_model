const INITIAL_STATE = {
  data: [

  ],
};

export function pageQty(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "CLEAR_QUANTITY":
      let clearIndex = state.data.findIndex(
        (obj) => obj.id === action.product.id
      );

      if (clearIndex !== -1) {
        return {
          ...state,
          data: [
            ...state.data.slice(0, clearIndex),
            ...state.data.slice(clearIndex + 1),
          ],
        };};
      return state

    case "SET_QUANTITY":
      let setIndex = state.data.findIndex(
        (obj) => obj.id === action.product.id
      );

      if (setIndex !== -1) {
        return {
          ...state,
          data: [
            ...state.data.slice(0, setIndex),
            {
              id: state.data[setIndex].id,
              quantity: action.quantity,
            },
            ...state.data.slice(setIndex + 1),
          ],
        };
      } else {
        return {
          ...state,
          data: [
            ...state.data,
            { id: action.product.id, quantity: action.quantity},
          ],
        };
      }
      
    case "INCREASE_QUANTITY":
      let incIndex = state.data.findIndex(
        (obj) => obj.id === action.product.id
      );

      if (incIndex !== -1) {
        return {
          ...state,
          data: [
            ...state.data.slice(0, incIndex),
            {
              id: state.data[incIndex].id,
              quantity: state.data[incIndex].quantity + 1,
            },
            ...state.data.slice(incIndex + 1),
          ],
        };
      } else {
        return {
          ...state,
          data: [
            ...state.data,
            { id: action.product.id, quantity: 1 },
          ],
        };
      }

    case "DECREASE_QUANTITY":
      let decIndex = state.data.findIndex(
        (obj) => obj.id === action.product.id
      );

      if (decIndex !== -1) {
        if (state.data[decIndex].quantity - 1 === 0 || state.data[decIndex].quantity - 1 === -1){
          return {
            ...state,
            data: [
              ...state.data.slice(0, decIndex),
              ...state.data.slice(decIndex + 1),
            ],
          };
        }
        else{
          return {
            ...state,
            data: [
              ...state.data.slice(0, decIndex),
              {
                id: state.data[decIndex].id,
                quantity: state.data[decIndex].quantity - 1,
              },
              ...state.data.slice(decIndex + 1),
            ],
          };
        }

      } else {
        return {
          ...state,
          data: [
            ...state.data,
            { id: action.product.id, quantity: 0 },
          ],
        };
      }

    default:
      return state;
  }
}
