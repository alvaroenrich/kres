import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { KResReservationService } from '../../services/reservation.service';
import { IKResReservationData } from '../../models/reservation.model';

@Component({
  selector: 'kres-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KResConfirmationComponent {

  get data(): IKResReservationData {
    return this.reservationsService.reservationData;
  }

  constructor(private router: Router, private reservationsService: KResReservationService) {}

  public editField(controlName: string): void {
    this.router.navigateByUrl('/reservation', {state: {focusField: controlName}});
  }

  public confirmReservation(): void {
    this.router.navigateByUrl('/success');
  }
}
