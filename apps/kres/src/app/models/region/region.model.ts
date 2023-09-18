
export interface IKResRegionParams {
    onlyAdults: boolean;
    smokingAllowed: boolean;
    maxPeoplePerTable: number;
    id: number;
    name: string;
}

export class KResRegion {
    onlyAdults: boolean;
    smokingAllowed: boolean;
    maxPeoplePerTable: number;
    id: number;
    name: string;

    constructor(params: IKResRegionParams) {
        this.onlyAdults = params.onlyAdults;
        this.smokingAllowed = params.smokingAllowed;
        this.maxPeoplePerTable = params.maxPeoplePerTable;
        this.id = params.id;
        this.name = params.name;
    }

}