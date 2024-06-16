import { GameStorageManager } from "@drincs/pixi-vn"
import CommitmentBaseModel from "../classes/Commitment"

const TEMPORARY_COMMITMENT_CATEGORY_MEMORY_KEY = "___nqtr-temporary_commitment___"
export const registeredCommitments: { [id: string]: CommitmentBaseModel } = {}
export const fixedCommitments: { [id: string]: CommitmentBaseModel } = {}

/**
 * Save a commitment in the registered commitments. If the commitment already exists, it will be overwritten.
 * @param commitment The commitment or commitments to save.
 * @returns 
 */
export function saveCommitment<TCommitment extends CommitmentBaseModel = CommitmentBaseModel>(commitment: TCommitment | TCommitment[]) {
    if (Array.isArray(commitment)) {
        commitment.forEach(c => saveCommitment(c))
        return
    }
    if (registeredCommitments[commitment.id]) {
        console.warn(`[NQTR] Commitment id ${commitment.id} already exists, it will be overwritten`)
    }
    registeredCommitments[commitment.id] = commitment
}

/**
 * Get a commitment by its id.
 * @param id The id of the commitment.
 * @returns The commitment or undefined if not found.
 */
export function getCommitmentById<TCommitment extends CommitmentBaseModel = CommitmentBaseModel>(id: string): TCommitment | undefined {
    try {
        let commitment = registeredCommitments[id]
        if (!commitment) {
            console.error(`[NQTR] Commitment ${id} not found`)
            return
        }
        return commitment as TCommitment
    }
    catch (e) {
        console.error(`[NQTR] Error while getting Commitment ${id}`, e)
        return
    }
}

/**
 * Set a commitment as fixed, it will be always available. They cannot be deleted or edit during the game session.
 * @param commitment The commitment or commitments to set as fixed.
 */
export function setFixedRoutine<TCommitment extends CommitmentBaseModel = CommitmentBaseModel>(commitments: TCommitment[] | TCommitment) {
    if (Array.isArray(commitments)) {
        commitments.forEach(c => setFixedRoutine(c))
        return
    }
    if (fixedCommitments[commitments.id]) {
        console.warn(`[NQTR] Commitment id ${commitments.id} already exists, it will be overwritten`)
    }
    fixedCommitments[commitments.id] = commitments
}

/**
 * This feature adds the commitments during the game session.
 * @param commitment The commitment or commitments to add.
 */
export function addCommitment<TCommitment extends CommitmentBaseModel = CommitmentBaseModel>(commitment: TCommitment[] | TCommitment) {
    if (!Array.isArray(commitment)) {
        commitment = [commitment]
    }
    let commitmentsIds = commitment.map(commitment => {
        let commitmentTest = getCommitmentById(commitment.id)
        if (!commitmentTest) {
            console.warn(`[NQTR] Commitment ${commitment.id} not found, it will be ignored`)
            return undefined
        }
        return commitment.id
    }).filter(id => id !== undefined)

    GameStorageManager.setVariable(TEMPORARY_COMMITMENT_CATEGORY_MEMORY_KEY, [commitmentsIds])
}

/**
 * Remove the commitments added during the game session.
 * @param commitment The commitment or commitments to remove.
 * @returns 
 */
export function removeCommitment<TCommitment extends CommitmentBaseModel = CommitmentBaseModel>(commitment: TCommitment[] | TCommitment) {
    if (!Array.isArray(commitment)) {
        commitment = [commitment]
    }
    let commitmentsIds = commitment.map(commitment => {
        return commitment.id
    })

    let currentCommitments = GameStorageManager.getVariable<string[]>(TEMPORARY_COMMITMENT_CATEGORY_MEMORY_KEY)
    if (!currentCommitments) {
        return
    }
    currentCommitments = currentCommitments.filter(id => !commitmentsIds.includes(id))
    GameStorageManager.setVariable(TEMPORARY_COMMITMENT_CATEGORY_MEMORY_KEY, currentCommitments)
}

/**
 * Get the fixed commitments by its id.
 * @returns The fixed commitments.
 */
export function getFixedRoutine<TCommitment extends CommitmentBaseModel = CommitmentBaseModel>(): TCommitment[] {
    return Object.values(fixedCommitments) as TCommitment[]
}

/**
 * Get the temporary commitments by its id.
 * @returns The temporary commitments.
 */
export function getTemporaryCommitments<TCommitment extends CommitmentBaseModel = CommitmentBaseModel>(): TCommitment[] {
    let commitmentsIds = GameStorageManager.getVariable<string[]>(TEMPORARY_COMMITMENT_CATEGORY_MEMORY_KEY)
    if (!commitmentsIds) {
        return []
    }
    let commitments = commitmentsIds.map(id => getCommitmentById<TCommitment>(id)).filter(commitment => commitment !== undefined)
    return commitments as TCommitment[]
}
