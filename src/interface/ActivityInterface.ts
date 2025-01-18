export default interface ActivityBaseInterface extends ActivityBaseInternalInterface // ActivityInterface 
{ }

export interface ActivityBaseInternalInterface {
    /**
     * The id of the activity.
     */
    readonly id: string;
}
