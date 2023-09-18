import { KResServingHours, IKResServingHoursParams } from "./serving-hours.model";

export interface IKResDayScheduleParams {
    lunch: IKResServingHoursParams;
    dinner: IKResServingHoursParams;
}

export class KResDaySchedule {
    lunch: KResServingHours;
    dinner: KResServingHours;

    constructor(params: IKResDayScheduleParams) {
        this.lunch = new KResServingHours(params.lunch);
        this.dinner = new KResServingHours(params.dinner);
    }

}