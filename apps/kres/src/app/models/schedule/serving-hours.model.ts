export interface IKResServingHoursParams {
    start: number;
    end: number;
}

export class KResServingHours {
    start: number;
    end: number;

    constructor(params: IKResServingHoursParams) {
        this.start = params.start;
        this.end = params.end;
    }

}