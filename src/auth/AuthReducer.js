export const AuthReducer = (initialState = {}, action) => {
	switch (action.type) {
		case 'Login':
			return {
				logged: true,
				name: action.payload.name,
				data: action.payload.data,
			};

		case 'Logout':
			return {
				logged: false,
			};

		case 'Register':
			return {
				logged: true,
				name: action.payload.name,
				data: action.payload.data,
			};

		default:
			return initialState;
	}
};
