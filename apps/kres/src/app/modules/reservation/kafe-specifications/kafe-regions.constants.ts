import { IKResRegionParams } from "../../../models/region/region.model";

export const KRES_KAFE_REGIONS: IKResRegionParams[] = [{
        id: 1,
        name: 'Main Hall',
        maxPeoplePerTable: 12,
        onlyAdults: false,
        smokingAllowed: false,
    }, {
        id: 2,
        name: 'Bar',
        maxPeoplePerTable: 4,
        onlyAdults: true,
        smokingAllowed: false,
    }, {
        id: 3,
        name: 'Riverside Smoke Free',
        maxPeoplePerTable: 8,
        onlyAdults: false,
        smokingAllowed: false,
    }, {
        id: 4,
        name: 'Riverside Smokers',
        maxPeoplePerTable: 6,
        onlyAdults: true,
        smokingAllowed: true,
    },
];