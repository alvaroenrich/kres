export interface IKResReservationRegionData {
    id: number;
    name: string;
}
export interface IKResReservationData {
    date: Date;
    username: string;
    email: string;
    phone: string;
    people: string;
    children: string;
    region: IKResReservationRegionData;
    smokers: boolean;
    birthday: boolean;
    birthdayName: string;
}