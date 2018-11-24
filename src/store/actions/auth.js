import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
		userId: userId,
	};
};

export const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

const logout = () => {
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const checkAuthTimeout = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
    }, expirationTime * 1000);
	};
};

export const auth = (email, password, isSignUp) => {
	return async dispatch => {
		dispatch(authStart());

		try {
			const authData = {
				email: email,
				password: password,
				returnSecureToken: true,
			};
			// Sign up or sign in
			let url =
				'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCKMBk7lafHH6F95F7QB-Iwrg8ta1ejI3Q';
			if (!isSignUp) {
				url =
					'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCKMBk7lafHH6F95F7QB-Iwrg8ta1ejI3Q';
			}

			const response = await axios.post(url, authData);
			dispatch(authSuccess(response.data.idToken, response.data.localId));
			dispatch(checkAuthTimeout(response.data.expiresIn));
		} catch (error) {
			dispatch(authFail(error.response.data.error));
		}
	};
};
