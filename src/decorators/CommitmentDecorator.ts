import { GameStorageManager } from "@drincs/pixi-vn"
import CommitmentBaseModel from "../classes/Commitment"

const FIXED_COMMITMENT_CATEGORY_MEMORY_KEY = "___nqtr-fixed_commitment___"
const TEMPORARY_COMMITMENT_CATEGORY_MEMORY_KEY = "___nqtr-temporary_commitment___"
export const registeredCommitments: { [id: string]: CommitmentBaseModel } = {}

export function saveCommitment(commitment: CommitmentBaseModel | CommitmentBaseModel[]) {
    if (Array.isArray(commitment)) {
        commitment.forEach(c => saveCommitment(c))
        return
    }
    if (registeredCommitments[commitment.id]) {
        console.warn(`[NQTR] Commitment id ${commitment.id} already exists, it will be overwritten`)
    }
    registeredCommitments[commitment.id] = commitment
}

export function getCommitmentById(id: string): CommitmentBaseModel | undefined {
    try {
        let commitment = registeredCommitments[id]
        if (!commitment) {
            console.error(`[NQTR] Commitment ${id} not found`)
            return
        }
        return commitment as CommitmentBaseModel
    }
    catch (e) {
        console.error(`[NQTR] Error while getting Commitment ${id}`, e)
        return
    }
}

export function setFixedCommitments<TCommitment extends CommitmentBaseModel = CommitmentBaseModel>(commitments: TCommitment[] | TCommitment) {
    if (!Array.isArray(commitments)) {
        commitments = [commitments]
    }
    let commitmentsIds = commitments.map(commitment => {
        let commitmentTest = getCommitmentById(commitment.id)
        if (!commitmentTest) {
            console.warn(`[NQTR] Commitment ${commitment.id} not found, it will be ignored`)
            return undefined
        }
        return commitment.id
    }).filter(id => id !== undefined)

    GameStorageManager.setVariable(FIXED_COMMITMENT_CATEGORY_MEMORY_KEY, commitmentsIds)
}

export function addTemporaryCommitment<TCommitment extends CommitmentBaseModel = CommitmentBaseModel>(commitment: TCommitment[] | TCommitment) {
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
