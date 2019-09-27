import axios from "axios";

export const FETCH_PHOTOS_START = "FETCH_PHOTOS_START";
export const RECIEVED_PHOTOS = "RECIEVED_PHOTOS";

export function getPhotoList() {
	console.log("photosActions");
	return async (dispatch) => {
		dispatch({
			type : "FETCH_PHOTOS_START",
		});
		setTimeout(() => {
			axios
				.get("http://localhost:5555/photos", {
					params : {
						albumId : 1,
					},
				})
				.then((response) => response.data)
				.then((photos) =>
					dispatch({
						type    : "RECIEVED_PHOTOS",
						payload : photos,
					})
				);
		}, 2000);
	};
}
