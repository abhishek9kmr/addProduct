export const INITIAL_STATE = {
  products: [],
};

//Types
export const GET_PRODUCT = 'GET_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';

//action

export const getProduct = () => ({
  type: GET_PRODUCT,
});

export const setProduct = products => ({
  type: SET_PRODUCT,
  products,
});

//Reducers

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      const {products} = action;
      return {
        ...state,
        products,
      };
    default:
      return state;
  }
};
