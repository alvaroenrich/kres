import { Injectable } from '@angular/core';
import { IKResReservationData } from '../models/reservation.model';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class KResReservationService {

    private _wholeRestaurantReservations: Subject<IKResReservationData[]> = new Subject<IKResReservationData[]>()

    private _reservationData: IKResReservationData;

    get reservationData(): IKResReservationData {
        return this._reservationData;
    }

    set reservationData(val: IKResReservationData) {
        this._reservationData = val;
    }

    get wholeRestaurantReservations$(): Observable<IKResReservationData[]> {
        return this._wholeRestaurantReservations.asObservable();
    }

    constructor(private http: HttpClient) {}


    public getReservations(): void {
        const res = this.http.get<IKResReservationData[]>('http://localhost:3000/reservations');
        res.subscribe(v => {
            this._wholeRestaurantReservations.next(v.map(r => {
                return {...r, date: new Date(r.date)}
            }));
        });
    }
}