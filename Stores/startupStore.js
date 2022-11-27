export const INITIAL_STATE = {
  counterVal: 10,
};

//Types
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

//action

export const increment = numberAdd => ({
  type: INCREMENT,
  numberAdd: numberAdd,
});

export const decrement = () => ({
  type: DECREMENT,
});

//Reducers

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        counterVal: state.counterVal + action.numberAdd,
      };
    case DECREMENT:
      return {
        ...state,
        counterVal: state.counterVal - 1,
      };
    default:
      return state;
  }
};
