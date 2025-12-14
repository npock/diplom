export const setUser = (res) => {
	return { type: 'SET_USER', payload: { authUser: res } };
};
