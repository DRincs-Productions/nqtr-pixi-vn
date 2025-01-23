import { registeredRooms } from "../decorators/RoomDecorator";
import { LocationInterface, MapInterface } from "../interface";

export default class NavigatorManager {
	get rooms() {
		return Object.values(registeredRooms);
	}
	get locations() {
		let result: { [id: string]: LocationInterface } = {};
		Object.values(registeredRooms).forEach((room) => {
			result[room.location.id] = room.location;
		});
		return Object.values(result);
	}
	get maps() {
		let result: { [id: string]: MapInterface } = {};
		Object.values(registeredRooms).forEach((room) => {
			result[room.location.map.id] = room.location.map;
		});
		return Object.values(result);
	}
}
