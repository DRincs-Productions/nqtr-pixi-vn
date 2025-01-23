import { CharacterInterface } from "@drincs/pixi-vn";
import { getFixedRoutine, getTemporaryCommitments, registeredCommitments } from "../decorators/CommitmentDecorator";
import { CommitmentInterface } from "../interface";
import { getCurrentRoom } from "./NavigationFunctions";

/**
 * Clear all the expired commitments.
 */
export function clearExpiredRoutine() {
	Object.entries(registeredCommitments).forEach(([_, commitment]) => {
		if (commitment.expired()) {
			delete registeredCommitments[commitment.id];
		}
	});
}

/**
 * Get the current commitments. The hidden commitments are not included.
 * In case there is a character who has two or more commitments at the same time, will be selected the commitment with the highest priority.
 * Higher priority commitments are calculated using the following steps:
 * 1. The commitments that have Commitments BaseModel.priority set to a higher value will be selected first.
 * 2. If there are commitments with the same priority, the commitments that are not fixed will be selected first.
 * 3. If there are commitments with the same priority and the same fixed status, priority will be given to the commitment with a lower index.
 * @returns The current commitments.
 */
export function getCurrentRoutine(): CommitmentInterface[] {
	let character_commitments: { [character: string]: CommitmentInterface } = {};
	getTemporaryCommitments()
		.reverse()
		.forEach((c) => {
			if (!c.hidden) {
				if (c.characters.length > 0) {
					// all the characters don't already have commitments or the commitment has a higher priority
					let allAvailable = c.characters.every(
						(ch) => !character_commitments[ch.id] || c.priority > character_commitments[ch.id].priority
					);
					if (allAvailable) {
						c.characters.forEach((ch) => {
							character_commitments[ch.id] = c;
						});
					}
				} else {
					console.error(`[NQTR] The commitment ${c.id} has no characters assigned`);
				}
			}
		});
	getFixedRoutine()
		.reverse()
		.forEach((c) => {
			if (!c.hidden) {
				if (c.characters.length > 0) {
					// all the characters don't already have commitments or the commitment has a higher priority
					let allAvailable = c.characters.every(
						(ch) => !character_commitments[ch.id] || c.priority > character_commitments[ch.id].priority
					);
					if (allAvailable) {
						c.characters.forEach((ch) => {
							character_commitments[ch.id] = c;
						});
					}
				} else {
					console.error(`[NQTR] The commitment ${c.id} has no characters assigned`);
				}
			}
		});
	return Object.values(character_commitments);
}

/**
 * Get the current room routine. The hidden commitments are not included.
 * @returns The current room routine.
 */
export function getCurrentRoomRoutine(): CommitmentInterface[] {
	let room = getCurrentRoom();
	if (!room) {
		return [];
	}
	return room.getRoutine();
}

/**
 * Get the character commitment.
 * @param character The character.
 * @returns The commitment or undefined if not found.
 */
export function getCommitmentByCharacter(character: CharacterInterface): CommitmentInterface | undefined {
	getCurrentRoutine().forEach((c) => {
		if (c.characters.map((ch) => ch.id).includes(character.id)) {
			return c;
		}
	});
	return undefined;
}
