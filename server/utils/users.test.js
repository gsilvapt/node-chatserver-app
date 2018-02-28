/**
 * Third party modules required for this test suite.
 */
const expect = require('expect');

/**
 * Custom modules required
 */
const {
	Users
} = require('./users');

describe('Users', () => {
	let users;
	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'Mike',
			room: 'Jazzy'
		}, {
			id: '2',
			name: 'Jen',
			room: 'React'
		}, {
			id: '3',
			name: 'Jenny',
			room: 'Jazzy'

		}]
	})
	it('should add new user', () => {
		let users = new Users();
		let userToAdd = {
			id: '123',
			name: 'some User Name',
			room: 'Office Fans'
		}
		let resUser = users.addUser(userToAdd.id, userToAdd.name, userToAdd.room);
		expect(users.users).toEqual([userToAdd])

	});

	it('should remove an user by id', () => {
		expect(users.users.length).toBe(3);

		let userId = '1';
		let user = users.removeUser(userId);

		expect(user.id).toBe(userId);
		expect(users.users.length).toBe(2);
	});

	it('should not be able to remove an user with invalid id', () => {
		expect(users.users.length).toBe(3);
		let userId = '00';
		let user = users.removeUser(userId);
		expect(user).toNotExist();
		expect(users.users.length).toBe(3);

	})

	it('should find user by id', () => {
		let userId = '2';
		let user = users.getUser(userId);
		expect(user.id).toBe(userId);
	})

	it('should not find user with id', () => {
		let userId = '99';
		let user = users.getUser(userId);
		expect(user).toNotExist();

	})

	it('should return name for room jazzy', () => {
		let userList = users.getUserList('Jazzy');
		expect(userList).toEqual(['Mike', 'Jenny']);
	});

	it('should return name for room React', () => {
		let userList = users.getUserList('React');
		expect(userList).toExist().toEqual(['Jen']);
	})
})