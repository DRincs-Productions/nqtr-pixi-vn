import { CharacterBaseModel } from "@drincs/pixi-vn";
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

// TODO: In the case of group commitments, it does not check whether the other characters are available for this commitment
export function getCurrentCommitments<TCommitment extends CommitmentBaseModel = CommitmentBaseModel>(): TCommitment[] {
    let character_commitments: { [character: string]: TCommitment } = {}
    let oltherCommitments: TCommitment[] = []
    getTemporaryCommitments<TCommitment>().reverse().forEach(c => {
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
    return Object.values(character_commitments).concat(oltherCommitments)
}

export function getCommitmentByCharacter<TCommitment extends CommitmentBaseModel = CommitmentBaseModel, TCharacter extends CharacterBaseModel = CharacterBaseModel>(character: TCharacter): TCommitment | undefined {
    getCurrentCommitments().forEach(c => {
        if (c.characters.map(ch => ch.id).includes(character.id)) {
            return c
        }
    })
    return undefined
}
