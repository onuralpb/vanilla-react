const initialState = {
	fetching         : false,
	fetched          : false,
	list             : [],
	productsInBasket : [],
};

export default function productsReducer(state = initialState, { type, payload }) {
	console.log("productsReducer", payload);

	switch (type) {
		case "FETCH_PRODUCTS_START":
			return {
				...state,
				fetching : true,
			};

		case "RECIEVED_PRODUCTS":
			return {
				...state,
				fetching : false,
				fetched  : true,
				list     : payload,
			};

		case "FETCH_PRODUCTS_ERROR":
			return {
				...state,
				fetching : false,
				fetched  : false,
				error    : payload,
			};

		case "ADDTOBASKET_PRODUCTS":
			return {
				...state,
				productsInBasket : [ ...state.productsInBasket, payload ],
			};

		case "INTHEBASKET_PRODUCTS":
			state.productsInBasket.map((product) => {
				if (product.id === payload.id) {
					product.piece += payload.piece;
				}
			});
			return {
				...state,
				productsInBasket : [ ...state.productsInBasket ],
			};

		case "DELETE_FROMBASKET_PRODUCTS":
			state.productsInBasket.map((product) => {
				if (product.id === payload) {
					let index = state.productsInBasket.indexOf(product);
					state.productsInBasket.splice(index, 1);
				}
			});
			return {
				...state,
				productsInBasket : [ ...state.productsInBasket ],
			};

		default:
			return state;
	}
}
