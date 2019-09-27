
import axios from "axios";

export const FETCH_USERS_START = "FETCH_USERS_START";
export const RECIEVED_USERS = "RECIEVED_USERS";
export const FETCH_USERS_ERROR = "FETCH_USERS_ERROR";

export function getUsersList() {
	console.log("getUserList");
	return async (dispatch) => {
		dispatch({
			type : "FETCH_USERS_START",
		});
		setTimeout(() => {
			axios
				.get("http://localhost:5555/users")
				.then((response) => response.data)
				.then((users) =>
					dispatch({
						type    : "RECIEVED_USERS",
						payload : users,
					})
				)
				.catch((error) =>
					dispatch({
						type    : "FETCH_USERS_ERROR",
						payload : error,
					})
				);
		}, 1000);
	};
}
export function addUser() {}
export function updateUser() {}
export function deleteUser() {}
export function searchUser() {}