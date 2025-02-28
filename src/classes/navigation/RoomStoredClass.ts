import { CharacterInterface, narration, storage } from "@drincs/pixi-vn";
import { CURRENT_ROOM_MEMORY_KEY } from "../../constants";
import { getLastEvent } from "../../functions/tracking-changes";
import { ActivityInterface, CommitmentInterface, LocationInterface } from "../../interface";
import { RoomBaseInternalInterface } from "../../interface/navigation/RoomInterface";
import { routine, timeTracker } from "../../managers";
import { OnRunProps } from "../../types";
import NavigationAbstractClass from "./NavigationAbstractClass";

const ROOM_CATEGORY = "__nqtr-room__";
export default class RoomStoredClass extends NavigationAbstractClass implements RoomBaseInternalInterface {
    constructor(
        id: string,
        /**
         * The location where the room is.
         */
        private readonly _location: LocationInterface,
        activities: ActivityInterface[] = []
    ) {
        super(ROOM_CATEGORY, id, activities);
    }
    get routine(): CommitmentInterface[] {
        return routine.currentRoutine.filter((c) => c.room.id === this.id);
    }

    get location(): LocationInterface {
        return this._location;
    }

    get characters(): CharacterInterface[] {
        let characters: CharacterInterface[] = [];
        this.routine.forEach((commitment) => {
            characters.push(...commitment.characters);
        });
        return characters;
    }

    get automaticFunction(): ((props: OnRunProps) => void) | undefined {
        let run = this.routine.find((commitment) => commitment.executionType === "automatic")?.run;
        return run
            ? (props) => {
                  let lastEvent = getLastEvent();
                  switch (lastEvent?.type) {
                      case "editroom":
                          storage.setVariable(CURRENT_ROOM_MEMORY_KEY, lastEvent.value);
                          narration.addCurrentStepToHistory();
                          storage.setVariable(CURRENT_ROOM_MEMORY_KEY, this.id);
                          break;
                      case "edittime":
                          let currentHour = timeTracker.currentHour;
                          let currentDay = timeTracker.currentDay;
                          narration.addCurrentStepToHistory();
                          break;
                  }
                  return run(props);
              }
            : undefined;
    }
}
