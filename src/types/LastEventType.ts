type LastEventType =
    | {
          type: "editroom";
          value: string;
      }
    | {
          type: "edittime";
          currentHour: number;
          currentDay: number;
      };
export default LastEventType;
