import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IKResReservationData } from '../../models/reservation.model';
import { KResReservationService } from '../../services/reservation.service';

@Component({
  selector: 'kres-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KResSuccessComponent {

  get data(): IKResReservationData {
    return this.reservationsService.reservationData;
  }

  constructor(private reservationsService: KResReservationService) {}
}
