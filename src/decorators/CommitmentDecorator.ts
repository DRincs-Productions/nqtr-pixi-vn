import { GameStorageManager } from "@drincs/pixi-vn"
import CommitmentBaseModel from "../classes/Commitment"

const TEMPORARY_COMMITMENT_CATEGORY_MEMORY_KEY = "___nqtr-temporary_commitment___"
export const registeredCommitments: { [id: string]: CommitmentBaseModel } = {}
export const fixedCommitments: { [id: string]: CommitmentBaseModel } = {}

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

export function setFixedCommitments<TCommitment extends CommitmentBaseModel = CommitmentBaseModel>(commitments: TCommitment[] | TCommitment) {
    if (Array.isArray(commitments)) {
        commitments.forEach(c => saveCommitment(c))
        return
    }
    if (registeredCommitments[commitments.id]) {
        console.warn(`[NQTR] Commitment id ${commitments.id} already exists, it will be overwritten`)
    }
    registeredCommitments[commitments.id] = commitments
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

export function getFixedCommitments<TCommitment extends CommitmentBaseModel = CommitmentBaseModel>(): TCommitment[] {
    return Object.values(fixedCommitments) as TCommitment[]
}

export function getTemporaryCommitments<TCommitment extends CommitmentBaseModel = CommitmentBaseModel>(): TCommitment[] {
    let commitmentsIds = GameStorageManager.getVariable<string[]>(TEMPORARY_COMMITMENT_CATEGORY_MEMORY_KEY)
    if (!commitmentsIds) {
        return []
    }
    let commitments = commitmentsIds.map(id => getCommitmentById<TCommitment>(id)).filter(commitment => commitment !== undefined)
    return commitments as TCommitment[]
}
