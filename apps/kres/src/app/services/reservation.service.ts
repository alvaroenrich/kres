import { Injectable } from '@angular/core';
import { IKResReservationData } from '../models/reservation.model';

@Injectable({
    providedIn: 'root',
})
export class KResReservationService {

    private _reservationData: IKResReservationData;

    get reservationData(): IKResReservationData {
        return this._reservationData;
    }

    set reservationData(val: IKResReservationData) {
        this._reservationData = val;
    }
}