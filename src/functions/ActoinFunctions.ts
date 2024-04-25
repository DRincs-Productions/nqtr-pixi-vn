import { registeredRooms } from "../decorators/RoomDecorator"

export function clearExpiredActions() {
    Object.entries(registeredRooms).forEach(([_, room]) => {
        room.clearExpiredActions()
    })
}

currentActions(){

}

def is_action_in_current_room(
    act_id: str,
    action: Act,
    room: Room,
    now_hour: int,
    current_day: int,
    tm: TimeHandler,
) -> bool:
"""Return True if the action is in the current room and available for the current time"""
if room.id in action.room_ids or act_id in room.action_ids:
if action.have_valid_day(current_day) and tm.now_is_between(
    start = action.hour_start, end = action.hour_stop, now = now_hour
):
return True
return False


def current_button_actions(
    actions: dict[str, Act],
    room: Room,
    now_hour: int,
    current_day: int,
    tm: TimeHandler,
    flags: dict[str, bool] = {},
) -> list[Act]:
"""Return a button action list for the current room and available for the current time"""
acts: list[Act] = []
for act_id, act in actions.items():
    if act.is_button and not act.is_hidden(flags):
if is_action_in_current_room(act_id, act, room, now_hour, current_day, tm):
    acts.append(act)
return acts


def current_picture_in_background_actions(
    actions: dict[str, Act],
    room: Room,
    now_hour: int,
    current_day: int,
    tm: TimeHandler,
    flags: dict[str, bool] = {},
) -> list[Act]:
"""Return a picture in background action list for the current room and available for the current time"""
acts: list[Act] = []
for act_id, act in actions.items():
    if act.is_picture_in_background and not act.is_hidden(flags):
if is_action_in_current_room(act_id, act, room, now_hour, current_day, tm):
    acts.append(act)
return acts
