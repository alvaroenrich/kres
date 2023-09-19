
export interface IKResRegionParams {
    onlyAdults: boolean;
    smokingAllowed: boolean;
    maxPeoplePerTable: number;
    id: number;
    name: string;
    maxReservationsSimultaneously: number;
}

export class KResRegion {
    onlyAdults: boolean;
    smokingAllowed: boolean;
    maxPeoplePerTable: number;
    id: number;
    name: string;
    maxReservationsSimultaneously: number;

    constructor(params: IKResRegionParams) {
        this.onlyAdults = params.onlyAdults;
        this.smokingAllowed = params.smokingAllowed;
        this.maxPeoplePerTable = params.maxPeoplePerTable;
        this.id = params.id;
        this.name = params.name;
        this.maxReservationsSimultaneously = params.maxReservationsSimultaneously;
    }

}