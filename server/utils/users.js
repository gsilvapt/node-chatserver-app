[{
	id: '',
	name: '',
	room: '',
}]

// addUser(id, name, room)
// removeUser(id, name, room)
// fetchUser(id)
// getUserList(room)

class Users {

	constructor() {
		this.users = [];
	}

	addUser(id, name, room) {
		let user = {
			id,
			name,
			room
		};
		this.users.push(user);
		return user;
	}

	removeUser(mId) {
		let user = this.getUser(mId);

		if (user) {
			this.users = this.users.filter((user) => user.id !== mId);
		}

		return user;
	}

	getUser(mId) {
		return this.users.filter((user) => user.id === mId)[0];
	}

	getUserList(mRoom) {
		let filtered = this.users.filter((user) => user.room === mRoom);
		let namesArray = filtered.map((user) => user.name);
		return namesArray;
	}

}

module.exports = {
	Users
}