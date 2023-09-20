import { IKResRegionParams, KResRegion } from "./region/region.model";
import { IKResScheduleParams, KResSchedule } from "./schedule/schedule.model";

export interface IKResRestaurant {
    schedule: IKResScheduleParams;
    regions: IKResRegionParams[];
}

export class KResRestaurant {
    schedule: KResSchedule;
    regions: KResRegion[];


    constructor(params: IKResRestaurant) {
        this.schedule = new KResSchedule(params.schedule);
        this.regions = params.regions ? params.regions.map(r => new KResRegion(r)) : [];
    }

    /**
     * Just in case in the future we needed to add some region.
     */
    public addRegion(newRegion: KResRegion): void {
        this.regions?.push(newRegion);
    }
}