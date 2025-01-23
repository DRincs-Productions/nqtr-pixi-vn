import NavigatorManager from "./NavigatorManager";
import QuestManager from "./QuestManager";
import RoutineManager from "./RoutineManager";
import { default as TimeManager } from "./TimeManager";

const timeTracker = new TimeManager();
const navigator = new NavigatorManager();
const routine = new RoutineManager();
const questsNotebook = new QuestManager();

export { navigator, questsNotebook, routine, timeTracker };
