import TimeDataType from "./TimeDataType";

type LastEventType =
    | {
          type: "editroom";
          value: string;
      }
    | {
          type: "edittime";
          value: TimeDataType;
      };
export default LastEventType;
