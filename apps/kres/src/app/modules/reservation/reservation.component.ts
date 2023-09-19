import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KResRestaurant } from '../../models/restaurant.model';
import { KRES_KAFE_CONFIG } from './kafe-specifications/kafe-config.constants';
import { KResCustomValidators } from './reservation.validators';
import { Subject, takeUntil } from 'rxjs';
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
    let schedule: KResDaySchedule;
    switch (selectedDate.getDay()) {
      case 0:
        schedule = this.restaurant.schedule.sunday;
      break
      case 1:
        schedule = this.restaurant.schedule.monday;
      break
      case 2:
        schedule = this.restaurant.schedule.tuesday;
      break
      case 3:
        schedule = this.restaurant.schedule.wednesday;
      break
      case 4:
        schedule = this.restaurant.schedule.thursday;
      break
      case 5:
        schedule = this.restaurant.schedule.friday;
      break
      case 6:
        schedule = this.restaurant.schedule.saturday;
      break
    }
    if (!schedule) return [];
    return this.generateDayTimeOptions(schedule);
  }

  constructor(private router: Router, private reservationsService: KResReservationService) {
    this.fieldToFocus = this.router.getCurrentNavigation()?.extras?.state['focusField'];
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
    const timeValue: string= this.form.get('time').value;
    const date: Date = this.form.get('date').value;
    date.setHours(Number(timeValue.split(':')[0]), Number(timeValue.split(':')[1]))
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
    this.reservationsService.reservationData = reservationData;
    this.router.navigateByUrl('/home/confirmation');
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
    const options = [...this.generateTurnTimeOptions(daySchedule.lunch), ...this.generateTurnTimeOptions(daySchedule.dinner)]
    return options;
  }

  private generateTurnTimeOptions(turnSchedule: KResServingHours): string[] {
    const options = [];
    if (turnSchedule.start !== undefined && turnSchedule.start !== null && turnSchedule.end !== undefined && turnSchedule.end !== null) {
      for (let i = turnSchedule.start; i <= turnSchedule.end; i++) {
        if (i === turnSchedule.end) {
          options.push(`${i}:00`)
        } else {
          options.push(...[`${i}:00`, `${i}:30`]);
        }
      }
    }
    return options;
  }
}
