import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KResRestaurant } from '../../models/restaurant.model';
import { KRES_KAFE_CONFIG } from './kafe-specifications/kafe-config.constants';
import { KResCustomValidators } from './reservation.validators';
import { Subject, interval, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { KResReservationService } from '../../services/reservation.service';
import { IKResReservationData } from '../../models/reservation.model';
import { createMask } from '@ngneat/input-mask';
import { KResDaySchedule } from '../../models/schedule/day-schedule.model';
import { KResServingHours } from '../../models/schedule/serving-hours.model';

@Component({
  selector: 'kres-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KResReservationComponent implements OnInit, AfterViewInit, OnDestroy {

  private destroy$: Subject<void> = new Subject();

  private restaurant: KResRestaurant = new KResRestaurant(KRES_KAFE_CONFIG);

  private fieldToFocus: string;

  public dateMask = createMask<Date>({
    alias: 'datetime',
    inputFormat: 'dd/mm/yyyy',
    parser: (value: string) => {
      const values = value.split('/');
      const year = +values[2];
      const month = +values[1] - 1;
      const date = +values[0];
      return new Date(year, month, date);
    },
  });

  public suggestedDate: Date;

  public noAvailableSuggestionsForInvalidDate = false;

  @ViewChild('dateInput') dateInput: ElementRef<HTMLInputElement>;
  @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;
  @ViewChild('phoneInput') phoneInput: ElementRef<HTMLInputElement>;
  @ViewChild('peopleInput') peopleInput: ElementRef<HTMLInputElement>;
  @ViewChild('childrenInput') childrenInput: ElementRef<HTMLInputElement>;
  @ViewChild('smokersInput') smokersInput: ElementRef<HTMLInputElement>;
  @ViewChild('birthdayInput') birthdayInput: ElementRef<HTMLInputElement>;
  @ViewChild('birthdayNameInput') birthdayNameInput: ElementRef<HTMLInputElement>;
  @ViewChild('regionSelect') regionSelect: ElementRef<HTMLSelectElement>;

  public form: FormGroup = new FormGroup({
    date: new FormControl<string>(null, [Validators.required, KResCustomValidators.dateValidator, KResCustomValidators.minDateValidator(new Date(2023, 6, 24)), KResCustomValidators.maxDateValidator(new Date(2023, 6, 31, 23, 59, 59, 999))]),
    time: new FormControl<string>(null, Validators.required),
    userName: new FormControl<string>(null, Validators.required),
    email: new FormControl<string>(null, [Validators.required, Validators.email]),
    phone: new FormControl<string>(null, [Validators.required, KResCustomValidators.phoneValidator]),
    people: new FormControl<number>(null, [Validators.required, KResCustomValidators.positiveNumberValidator]),
    children: new FormControl<number>(null, [Validators.required, KResCustomValidators.zeroOrLargerNumberValidator]),
    region: new FormControl<number>(null, Validators.required),
    smokers: new FormControl<boolean>(false, Validators.required),
    birthday: new FormControl<boolean>(false, Validators.required),
    birthdayName: new FormControl<string>(null),
  });

  get region(): string {
    return this.form.get('region')?.value;
  }

  get time(): string {
    return this.form.get('time')?.value;
  }

  get smokers(): boolean {
    return !!this.form.get('smokers')?.value;
  }

  get timeFieldEnabled(): boolean {
    const dateControl = this.getControl('date');
    return dateControl.touched && dateControl.value && !dateControl.errors;
  }

  get availableRegions(): {name:string, id: number, disabled: boolean}[] {
    return this.restaurant.regions.map(region => {
      return {
        name: region.name,
        id: region.id,
        disabled: 
          this.form.get('smokers').value && !region.smokingAllowed ||
          this.form.get('children').value > 0 && region.onlyAdults ||
          region.maxPeoplePerTable < this.form.get('people').value
      };
    })
  }

  get availableTimeSlots(): string[] {
    const selectedDate = new Date(this.form.get('date').value);
    const schedule = this.mapDateToRestaurantSchedule(selectedDate);
    if (!schedule) return [];
    return this.generateDayTimeOptions(schedule);
  }

  constructor(private router: Router, private reservationsService: KResReservationService, private cdr: ChangeDetectorRef) {
    this.fieldToFocus = this.router.getCurrentNavigation()?.extras?.state?.['focusField'];
  }

  ngOnInit(): void {
    if (this.reservationsService.reservationData) {
      this.form.setValue({
        date: this.reservationsService.reservationData.date,
        time: `${this.reservationsService.reservationData.date.getHours()}:${this.reservationsService.reservationData.date.getMinutes()}`,
        userName: this.reservationsService.reservationData.username,
        email: this.reservationsService.reservationData.email,
        phone: this.reservationsService.reservationData.phone,
        people: this.reservationsService.reservationData.people,
        children: this.reservationsService.reservationData.children,
        region: this.reservationsService.reservationData.region.id,
        smokers: this.reservationsService.reservationData.smokers,
        birthday: this.reservationsService.reservationData.birthday,
        birthdayName: this.reservationsService.reservationData.birthdayName,
      });
    }
    this.initFormSubscriptions();
    this.reservationsService.wholeRestaurantReservations$.pipe(takeUntil(this.destroy$)).subscribe(reservations => {
      const currentReservation = this.getCurrentReservationData();
      if (currentReservation.date && currentReservation.region.id !== null && currentReservation.region.id !== undefined && !this.checkCurrentReservationIsValid(reservations, currentReservation)) {
        this.suggestedDate = this.findAnotherAvailableSlotSameDay(reservations);
        this.noAvailableSuggestionsForInvalidDate = !this.suggestedDate
      } else {
        this.suggestedDate = null;
        this.noAvailableSuggestionsForInvalidDate = false;
      }
      this.cdr.markForCheck();
    });
    this.startReservationsPolling();
  }
  

  ngAfterViewInit(): void {
    switch (this.fieldToFocus) {
      case 'username':
        this.userNameInput.nativeElement.focus();
        break;
      case 'date':
        this.dateInput.nativeElement.focus();
        break;
      case 'email':
        this.emailInput.nativeElement.focus();
        break;
      case 'phone':
        this.phoneInput.nativeElement.focus();
        break;
      case 'people':
        this.peopleInput.nativeElement.focus();
        break;
      case 'children':
        this.childrenInput.nativeElement.focus();
        break;
      case 'region':
        this.regionSelect.nativeElement.focus();
        break;
      case 'smokers':
        this.smokersInput.nativeElement.focus();
        break;
      case 'birthday':
        this.birthdayInput.nativeElement.focus();
        break;
      case 'birthdayName':
        this.birthdayNameInput.nativeElement.focus();
        break;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  public updateRegion(id: string): void {
    this.form.get('region')?.setValue(+id);
  }

  public updateTime(time: string): void {
    this.form.get('time')?.setValue(time);
  }

  public updateCheckbox(val: string, controlName: string): void {
    this.form.get(controlName)?.setValue(val === 'true');
  }

  public getControl<T>(controlName: string): FormControl<T> {
    const control = this.form.get(controlName);
    if (!control) throw Error ('Invalid control name')
    return this.form.get(controlName) as FormControl<T>;
  }

  public submitForm(): void {
    this.reservationsService.reservationData = this.getCurrentReservationData();
    this.router.navigateByUrl('/confirmation');
  }

  public modifyDate(): void {
    this.form.get('date').setValue(this.suggestedDate);
    this.form.get('time').setValue(`${this.suggestedDate.getHours()}:${String(this.suggestedDate.getMinutes()).padStart(2, '0')}`);
    this.suggestedDate = null;
    this.cdr.markForCheck();
  }

  public initFormSubscriptions(): void {
    this.form.get('smokers').valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.verifyRegionIsStillValid();
    });
    this.form.get('children').valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.verifyRegionIsStillValid();
    });
    this.form.get('people').valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.verifyRegionIsStillValid();
    });
    this.form.get('birthday').valueChanges.pipe(takeUntil(this.destroy$)).subscribe(val => {
      if (!val) {
        this.form.get('birthdayName').setValue(null);
      }
    });
    this.form.get('date').valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.form.get('time').setValue(null);
    });
  }

  public startReservationsPolling(): void {
    interval(3000).pipe(takeUntil(this.destroy$)).subscribe(() => this.getReservations());
  }

  private  getReservations(): void {
    this.reservationsService.getReservations();
  }

  /**
   * Clears region since it is no longer valid
   */
  private verifyRegionIsStillValid(): void {
    const selectedRegion = this.availableRegions.find(r => r.id === this.form.get('region').value);
    if (selectedRegion && selectedRegion.disabled) {
      this.form.get('region').setValue(null);
    }
  }

  private generateDayTimeOptions(daySchedule: KResDaySchedule): string[] {
    const options = [...this.generateShiftTimeOptions(daySchedule.lunch), ...this.generateShiftTimeOptions(daySchedule.dinner)]
    return options;
  }

  private generateShiftTimeOptions(shiftSchedule: KResServingHours): string[] {
    const options = [];
    if (shiftSchedule.start !== undefined && shiftSchedule.start !== null && shiftSchedule.end !== undefined && shiftSchedule.end !== null) {
      for (let i = shiftSchedule.start; i <= shiftSchedule.end; i++) {
        if (i === shiftSchedule.end) {
          options.push(`${i}:00`)
        } else {
          options.push(...[`${i}:00`, `${i}:30`]);
        }
      }
    }
    return options;
  }

  private getCurrentReservationData(): IKResReservationData {
    const timeValue: string= this.form.get('time').value;
    const date: Date = this.form.get('date').value;
    date?.setHours(Number(timeValue.split(':')[0]), Number(timeValue.split(':')[1]))
    const reservationData: IKResReservationData = {
      date: date,
      username: this.form.get('userName').value,
      email: this.form.get('email').value,
      phone: this.form.get('phone').value,
      people: this.form.get('people').value,
      children: this.form.get('children').value,
      region: {
        id: this.form.get('region').value,
        name: this.availableRegions.find(r => r.id === this.form.get('region').value)?.name,
      },
      smokers: this.form.get('smokers').value,
      birthday: this.form.get('birthday').value,
      birthdayName: this.form.get('birthdayName').value,
    };
    return reservationData;
  }

  /**
   * Checks if current slot is available. If not, it suggests another slot.
   * Since it is not defined in the specs, I have added the max number of reservations for each region in the constant KRES_KAFE_REGIONS.
   */
  private checkCurrentReservationIsValid(reservations: IKResReservationData[], currentReservation: IKResReservationData): boolean {
    return reservations.filter(res => res.region.id === currentReservation.region.id
      && res.date.getFullYear() === currentReservation.date.getFullYear()
      && res.date.getMonth() === currentReservation.date.getMonth()
      && res.date.getDate() === currentReservation.date.getDate()
      && res.date.getHours() === currentReservation.date.getHours()
      && res.date.getMinutes() ===currentReservation.date.getMinutes()
    ).length < this.restaurant.regions.find(region => region.id === currentReservation.region.id)?.maxReservationsSimultaneously;
  }

  /**
   * The current slot is not available. Thus, this function tries to find a slot for the same region, the same day in the same shift (dinner/lunch)
   */
  private findAnotherAvailableSlotSameDay(reservations: IKResReservationData[]): Date {
    const currentReservationData = this.getCurrentReservationData();
    const currentDaySameRegionReservations = reservations.filter(res => res.region.id === currentReservationData.region.id
      && res.date.getFullYear() === currentReservationData.date.getFullYear()
      && res.date.getMonth() === currentReservationData.date.getMonth()
      && res.date.getDate() === currentReservationData.date.getDate());

    let finding = true;
    let slotsSkipped = 1;
    const slotInMilliseconds = 30 * 60 * 1000;
    while (finding) {
      const early: IKResReservationData = {...currentReservationData, date: new Date(currentReservationData.date.getTime() - slotInMilliseconds * slotsSkipped)};
      if (this.checkCurrentReservationIsValid(currentDaySameRegionReservations, early) && this.verifySuggestedSlotIsAvailableInSchedule(early.date)) {
        finding = false;
        return early.date;
      }
      const next: IKResReservationData = {...currentReservationData, date: new Date(currentReservationData.date.getTime() + slotInMilliseconds * slotsSkipped)};
      if (this.checkCurrentReservationIsValid(currentDaySameRegionReservations, next) && this.verifySuggestedSlotIsAvailableInSchedule(next.date)) {
        finding = false;
        return next.date;
      }
      slotsSkipped ++;
      if (!this.verifySuggestedSlotIsAvailableInSchedule(early.date) && !this.verifySuggestedSlotIsAvailableInSchedule(next.date)) {
        finding = false;
      }
    }
    return null;
  }

  private verifySuggestedSlotIsAvailableInSchedule(date: Date): boolean {
    const schedule = this.mapDateToRestaurantSchedule(date);
    const dinnerStart = new Date(date.getTime());
    dinnerStart.setHours(schedule.dinner.start, 0)

    const dinnerEnd = new Date(date.getTime());
    dinnerEnd.setHours(schedule.dinner.end, 0)

    const lunchStart = new Date(date.getTime());
    lunchStart.setHours(schedule.lunch.start, 0)

    const lunchEnd = new Date(date.getTime());
    lunchEnd.setHours(schedule.lunch.end, 0)

    if (date.getTime() >= lunchStart.getTime() && date.getTime() <= lunchEnd.getTime()) return true;
    if (date.getTime() >= dinnerStart.getTime() && date.getTime() <= dinnerEnd.getTime()) return true;
    return false;
  }

  private mapDateToRestaurantSchedule(date: Date): KResDaySchedule {
    switch (date.getDay()) {
      case 0:
        return this.restaurant.schedule.sunday;
      case 1:
        return this.restaurant.schedule.monday;
      case 2:
        return this.restaurant.schedule.tuesday;
      case 3:
        return this.restaurant.schedule.wednesday;
      case 4:
        return this.restaurant.schedule.thursday;
      case 5:
        return this.restaurant.schedule.friday;
      case 6:
        return this.restaurant.schedule.saturday;
    }
    return null;
  }
}
