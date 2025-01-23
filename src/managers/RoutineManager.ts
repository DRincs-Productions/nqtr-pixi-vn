import { storage } from "@drincs/pixi-vn";
import { fixedCommitments, getCommitmentById } from "../decorators/CommitmentDecorator";
import { CommitmentInterface } from "../interface";

const TEMPORARY_COMMITMENT_CATEGORY_MEMORY_KEY = "___nqtr-temporary_commitment___";
export default class RoutineManager {
	get fixedRoutine(): CommitmentInterface[] {
		return Object.values(fixedCommitments);
	}
	/**
	 * Set a commitment as fixed, it will be always available. They cannot be deleted or edit during the game session.
	 */
	set fixedRoutine(commitments: CommitmentInterface[]) {
		commitments.forEach((c) => {
			if (fixedCommitments[c.id]) {
				console.warn(`[NQTR] Commitment id ${c.id} already exists, it will be overwritten`);
			}
			fixedCommitments[c.id] = c;
		});
	}

	/**
	 * Get the temporary commitments by its id.
	 * @returns The temporary commitments.
	 */
	get temporaryRoutine(): CommitmentInterface[] {
		let commitmentsIds = storage.getVariable<string[]>(TEMPORARY_COMMITMENT_CATEGORY_MEMORY_KEY);
		if (!commitmentsIds) {
			return [];
		}
		let commitments = commitmentsIds
			.map((id) => getCommitmentById(id))
			.filter((commitment) => commitment !== undefined);
		return commitments;
	}

	get allRoutine(): CommitmentInterface[] {
		return [...this.fixedRoutine, ...this.temporaryRoutine];
	}

	/**
	 * This feature adds the commitments during the game session.
	 * @param commitment The commitment or commitments to add.
	 */
	add(commitment: CommitmentInterface[] | CommitmentInterface) {
		if (!Array.isArray(commitment)) {
			commitment = [commitment];
		}
		let commitmentsIds = commitment
			.map((commitment) => {
				let commitmentTest = getCommitmentById(commitment.id);
				if (!commitmentTest) {
					console.warn(`[NQTR] Commitment ${commitment.id} not found, it will be ignored`);
					return undefined;
				}
				return commitment.id;
			})
			.filter((id) => id !== undefined);

		storage.setVariable(TEMPORARY_COMMITMENT_CATEGORY_MEMORY_KEY, commitmentsIds);
	}

	/**
	 * Get the commitments added during the game session.
	 * @param id The id of the commitment.
	 * @returns The commitment or undefined if not found.
	 */
	find(id: string): CommitmentInterface | undefined {
		return getCommitmentById(id);
	}

	/**
	 * Remove the commitments added during the game session.
	 * @param commitment The commitment or commitments to remove.
	 */
	remove(commitment: CommitmentInterface[] | CommitmentInterface) {
		if (!Array.isArray(commitment)) {
			commitment = [commitment];
		}
		let commitmentsIds = commitment.map((commitment) => {
			return commitment.id;
		});

		let currentCommitments = storage.getVariable<string[]>(TEMPORARY_COMMITMENT_CATEGORY_MEMORY_KEY);
		if (!currentCommitments) {
			return;
		}
		currentCommitments = currentCommitments.filter((id) => !commitmentsIds.includes(id));
		storage.setVariable(TEMPORARY_COMMITMENT_CATEGORY_MEMORY_KEY, currentCommitments);
	}
}
