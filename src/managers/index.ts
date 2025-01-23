import NavigatorManager from "./NavigatorManager";
import { default as TimeManager } from "./TimeManager";

const timeTracker = new TimeManager();
const navigator = new NavigatorManager();

export { navigator, timeTracker };
