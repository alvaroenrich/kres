
export interface IKResRegionParams {
    onlyAdults: boolean;
    smokingAllowed: boolean;
    maxPeoplePerTable: number;
}

export class KResRegion {
    onlyAdults: boolean;
    smokingAllowed: boolean;
    maxPeoplePerTable: number;


    constructor(params: IKResRegionParams) {
        this.onlyAdults = params.onlyAdults;
        this.smokingAllowed = params.smokingAllowed;
        this.maxPeoplePerTable = params.maxPeoplePerTable;
    }

}