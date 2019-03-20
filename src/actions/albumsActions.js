import axios from "axios";

export const FETCH_ALBUMS_START = "FETCH_ALBUMS_START";
export const RECIEVED_ALBUMS = "RECIEVED_ALBUMS";
export const FETCH_ALBUMS_ERROR = "FETCH_ALBUMS_ERROR";

export function getAlbumList() {
	console.log("albumsActions");
	return async (dispatch) => {
		dispatch({
			type : "FETCH_ALBUMS_START",
		});
		setTimeout(() => {
			axios
				.get("http://localhost:4000/albums", {
					params : {
						userId : 1,
					},
				})
				.then((response) => response.data)
				.then((albums) =>
					dispatch({
						type    : "RECIEVED_ALBUMS",
						payload : albums,
					})
				);
		}, 500);
	};
}
