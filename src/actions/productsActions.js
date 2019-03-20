import axios from 'axios';

export const FETCH_PRODUCTS_START = 'FETCH_PRODUCTS_START';
export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR';
export const RECIEVED_PRODUCTS = 'RECIEVED_PRODUCTS';
export const ADDTOBASKET_PRODUCTS = 'ADDTOBASKET_PRODUCTS';
export const INTHEBASKET_PRODUCTS = 'INTHEBASKET_PRODUCTS';
export const DELETE_FROMBASKET_PRODUCTS = 'DELETE_FROMBASKET_PRODUCTS';

export function getProductList () {
  console.log ('getProductList');
  return async dispatch => {
    dispatch ({
      type: 'FETCH_PRODUCTS_START',
    });
    setTimeout (() => {
      axios
        .get ('http://localhost:4000/products')
        .then (response => response.data)
        .then (products =>
          dispatch ({
            type: 'RECIEVED_PRODUCTS',
            payload: products,
          })
        )
        .catch (error =>
          dispatch ({
            type: 'FETCH_PRODUCTS_ERROR',
            payload: error,
          })
        );
    }, 500);
  };
}

export function addToBasket (id, piece) {
  console.log ('addToBasket');
  return dispatch => {
    dispatch ({
      type: 'ADDTOBASKET_PRODUCTS',
      payload: {id, piece},
    });
  };
}
export function inTheBasket (id, piece) {
  console.log ('inTheBasket');
  return dispatch => {
    dispatch ({
      type: 'INTHEBASKET_PRODUCTS',
      payload: {id, piece},
    });
  };
}

export function deleteFromBasket (id) {
  console.log ('deleteFromBasket');
  return dispatch => {
    dispatch ({
      type: 'DELETE_FROMBASKET_PRODUCTS',
      payload: id,
    });
  };
}
