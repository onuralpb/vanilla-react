const initialState = {
	fetching : false,
	fetched  : false,
	list     : [],
	error    : null,
};

export default function albumsReducer(state = initialState, action) {
	console.log("albumsReducer");
	switch (action.type) {
		case "FETCH_ALBUMS_START":
			return {
				...state,
				fetching : true,
			};
		case "RECIEVED_ALBUMS":
			return {
				...state,
				fetching : false,
				fetched  : true,
				list     : action.payload,
			};
		case "FETCH_ALBUMS_ERROR":
			return {};
		default:
			return state;
	}
}
