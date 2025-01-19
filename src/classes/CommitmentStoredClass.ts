import { CharacterInterface } from "@drincs/pixi-vn"
import { RoomInterface } from "../interface"
import { CommitmentBaseInternalInterface } from "../interface/CommitmentInterface"
import { ExecutionType } from "../types"
import { OnRunActivityEvent } from "../types/OnRunActivityEvent"
import ActivityStoredClass from "./ActivityStoredClass"

const COMMITMENT_CATEGORY = "__nqtr-commitment__"
export default class CommitmentStoredClass extends ActivityStoredClass implements CommitmentBaseInternalInterface {
    constructor(
        id: string,
        private readonly _characters: CharacterInterface[],
        private readonly _room: RoomInterface,
        private readonly defaultExecutionType: ExecutionType,
        private readonly defaultPriority: number,
        onRun: OnRunActivityEvent,
        props: {
            fromHour?: number
            toHour?: number
            fromDay?: number
            toDay?: number
        }
    ) {
        super(id, onRun, props, COMMITMENT_CATEGORY)
    }

    get characters(): CharacterInterface[] {
        return this._characters
    }

    get room(): RoomInterface {
        return this._room
    }

    get executionType(): ExecutionType {
        return this.getStorageProperty<ExecutionType>("executionType") || this.defaultExecutionType
    }
    set executionType(value: ExecutionType) {
        this.setStorageProperty("executionType", value)
    }

    get priority(): number {
        return this.getStorageProperty<number>("priority") || this.defaultPriority || 0
    }
    set priority(value: number) {
        this.setStorageProperty("priority", value)
    }
}
