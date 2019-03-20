const initialState = {
	fetching : false,
	fetched  : false,
	list     : [],
};

export default function photosReducer(state = initialState, action) {
	console.log("photosReducer");
	switch (action.type) {
		case "FETCH_PHOTOS_START":
			return {
				...state,
				fetching : true,
			};
		case "RECIEVED_PHOTOS":
			return {
				...state,
				fetching : false,
				fetched  : true,
				list     : action.payload,
			};

		default:
			return state;
	}
}
