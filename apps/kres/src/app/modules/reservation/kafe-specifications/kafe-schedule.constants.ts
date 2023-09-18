import { IKResDayScheduleParams } from "../../../models/schedule/day-schedule.model";
import { IKResScheduleParams } from "../../../models/schedule/schedule.model";
import { IKResServingHoursParams } from "../../../models/schedule/serving-hours.model";

export const KRES_KAFE_DEFAUTLT_DINNER_SCHEDULE: IKResServingHoursParams = {
  end: 22,
  start: 18,
}

export const KRES_KAFE_DEFAUTLT_LUNCH_SCHEDULE: IKResServingHoursParams = {
  end: null,
  start: null,
}

export const KRES_KAFE_DEFAUTLT_DAY_SCHEDULE: IKResDayScheduleParams = {
  dinner: KRES_KAFE_DEFAUTLT_DINNER_SCHEDULE,
  lunch: KRES_KAFE_DEFAUTLT_LUNCH_SCHEDULE,
}


export const KRES_KAFE_SCHEDULE: IKResScheduleParams = {
    monday: KRES_KAFE_DEFAUTLT_DAY_SCHEDULE,
    tuesday: KRES_KAFE_DEFAUTLT_DAY_SCHEDULE,
    wednesday: KRES_KAFE_DEFAUTLT_DAY_SCHEDULE,
    thursday: KRES_KAFE_DEFAUTLT_DAY_SCHEDULE,
    friday: KRES_KAFE_DEFAUTLT_DAY_SCHEDULE,
    saturday: KRES_KAFE_DEFAUTLT_DAY_SCHEDULE,
    sunday: KRES_KAFE_DEFAUTLT_DAY_SCHEDULE,
}