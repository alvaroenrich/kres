import { KResDaySchedule, IKResDayScheduleParams } from "./day-schedule.model";

export interface IKResScheduleParams {
    monday: IKResDayScheduleParams;
    tuesday: IKResDayScheduleParams;
    wednesday: IKResDayScheduleParams;
    thursday: IKResDayScheduleParams;
    friday: IKResDayScheduleParams;
    saturday: IKResDayScheduleParams;
    sunday: IKResDayScheduleParams;
}

export class KResSchedule {
    monday: KResDaySchedule;
    tuesday: KResDaySchedule;
    wednesday: KResDaySchedule;
    thursday: KResDaySchedule;
    friday: KResDaySchedule;
    saturday: KResDaySchedule;
    sunday: KResDaySchedule;

    constructor(params: IKResScheduleParams) {
        this.monday = new KResDaySchedule(params.monday);
        this.tuesday = new KResDaySchedule(params.tuesday);
        this.wednesday = new KResDaySchedule(params.wednesday);
        this.thursday = new KResDaySchedule(params.thursday);
        this.friday = new KResDaySchedule(params.friday);
        this.saturday = new KResDaySchedule(params.saturday);
        this.sunday = new KResDaySchedule(params.sunday);
    }

}