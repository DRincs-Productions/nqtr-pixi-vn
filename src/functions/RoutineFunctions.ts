import { CharacterBaseModel, getAllCharacters } from "@drincs/pixi-vn";
import CommitmentBaseModel from "../classes/Commitment";
import { getFixedCommitments, getTemporaryCommitments } from "../decorators";
import { registeredCommitments } from "../decorators/CommitmentDecorator";

export function clearExpiredRoutine() {
    Object.entries(registeredCommitments).forEach(([_, commitment]) => {
        if (commitment.isExpired()) {
            delete registeredCommitments[commitment.id]
        }
    })
}

export function getCurrentCommitments<TCommitment extends CommitmentBaseModel = CommitmentBaseModel>(): TCommitment[] {
    let commitments: TCommitment[] = []
    getAllCharacters().forEach(character => {
        const commitment = getCommitmentByCharacter<TCommitment>(character)
        if (commitment) {
            commitments.push(commitment)
        }
    })
    return commitments
}

export function getCommitmentByCharacter<TCommitment extends CommitmentBaseModel = CommitmentBaseModel, TCharacter extends CharacterBaseModel = CharacterBaseModel>(character: TCharacter): TCommitment | undefined {
    getTemporaryCommitments<TCommitment>().reverse().forEach(c => {
        if (!c.hidden) {
            c.characters.forEach(ch => {
                if (ch.id === character.id) {
                    return c
                }
            })
        }
    })
    getFixedCommitments<TCommitment>().reverse().forEach(c => {
        if (!c.hidden) {
            c.characters.forEach(ch => {
                if (ch.id === character.id) {
                    return c
                }
            })
        }
    })
    return undefined
}
