const initialState = {
	fetching : false,
	fetched  : false,
	list     : [],
};

export default function usersReducer(state = initialState, { type, payload }) {
	console.log("usersReducer", payload);

	switch (type) {
		case "FETCH_USERS_START":
			return {
				...state,
				fetching : true,
			};

		case "RECIEVED_USERS":
			return {
				...state,
				fetching : false,
				fetched  : true,
				list     : payload,
			};

		case "FETCH_USERS_ERROR":
			return {
				...state,
				fetching : false,
				fetched  : false,
				error    : payload,
			};

		default:
			return state;
	}
}
