import { CharacterBaseModel } from "@drincs/pixi-vn";
import CommitmentBaseModel from "../classes/Commitment";
import { getFixedCommitments, getTemporaryCommitments, registeredCommitments } from "../decorators/CommitmentDecorator";

/**
 * Clear all the expired commitments.
 */
export function clearExpiredRoutine() {
    Object.entries(registeredCommitments).forEach(([_, commitment]) => {
        if (commitment.isExpired()) {
            delete registeredCommitments[commitment.id]
        }
    })
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
export function getCurrentCommitments<TCommitment extends CommitmentBaseModel = CommitmentBaseModel>(): TCommitment[] {
    let character_commitments: { [character: string]: TCommitment } = {}
    let oltherCommitments: TCommitment[] = []
    getTemporaryCommitments<TCommitment>().reverse().forEach(c => {
        if (!c.hidden) {
            if (c.characters.length > 1) {
                // all the characters don't already have commitments
                let allAvailable = c.characters.every(ch => !character_commitments[ch.id])
                if (allAvailable) {
                    c.characters.forEach(ch => {
                        character_commitments[ch.id] = c
                    })
                }
            }
            else {
                oltherCommitments.push(c)
            }
        }
    })
    getFixedCommitments<TCommitment>().reverse().forEach(c => {
        if (!c.hidden) {
            if (c.characters.length > 1) {
                c.characters.forEach(ch => {
                    if (!character_commitments[ch.id]) {
                        character_commitments[ch.id] = c
                    }
                })
            }
            else {
                oltherCommitments.push(c)
            }
        }
    })
    let list = Object.values(character_commitments).concat(oltherCommitments)
    list.sort((a, b) => a.priority - b.priority)
    return list
}

/**
 * Get the character commitment.
 * @param character The character.
 * @returns The commitment or undefined if not found.
 */
export function getCommitmentByCharacter<TCommitment extends CommitmentBaseModel = CommitmentBaseModel, TCharacter extends CharacterBaseModel = CharacterBaseModel>(character: TCharacter): TCommitment | undefined {
    getCurrentCommitments().forEach(c => {
        if (c.characters.map(ch => ch.id).includes(character.id)) {
            return c
        }
    })
    return undefined
}
