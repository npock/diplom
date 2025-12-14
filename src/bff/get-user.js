export const getUser = async (emailToFind) =>
	fetch(`http://localhost:3000/users/?email=${emailToFind}`)
		.then((loadedUsers) => loadedUsers.json())
		.then(([user]) => user);
