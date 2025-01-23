import { CommitmentInterface } from "../interface";

export const registeredCommitments: { [id: string]: CommitmentInterface } = {};
export const fixedCommitments: { [id: string]: CommitmentInterface } = {};

/**
 * Save a commitment in the registered commitments. If the commitment already exists, it will be overwritten.
 * @param commitment The commitment or commitments to save.
 * @returns
 */
export function saveCommitment(commitment: CommitmentInterface | CommitmentInterface[]) {
	if (Array.isArray(commitment)) {
		commitment.forEach((c) => saveCommitment(c));
		return;
	}
	if (registeredCommitments[commitment.id]) {
		console.warn(`[NQTR] Commitment id ${commitment.id} already exists, it will be overwritten`);
	}
	registeredCommitments[commitment.id] = commitment;
}

/**
 * Get a commitment by its id.
 * @param id The id of the commitment.
 * @returns The commitment or undefined if not found.
 */
export function getCommitmentById(id: string): CommitmentInterface | undefined {
	try {
		let commitment = registeredCommitments[id];
		if (!commitment) {
			console.error(`[NQTR] Commitment ${id} not found`);
			return;
		}
		return commitment;
	} catch (e) {
		console.error(`[NQTR] Error while getting Commitment ${id}`, e);
		return;
	}
}
