import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KResRestaurant } from '../../models/restaurant.model';
import { KRES_KAFE_CONFIG } from './kafe-specifications/kafe-config.constants';
import { KResCustomValidators } from './reservation.validators';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { KResReservationService } from '../../services/reservation.service';
import { IKResReservationData } from '../../models/reservation.model';

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

  get smokers(): boolean {
    return !!this.form.get('smokers')?.value;
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

  constructor(private router: Router, private reservationsService: KResReservationService) {
    this.fieldToFocus = this.router.getCurrentNavigation()?.extras?.state['focusField'];
  }

  ngOnInit(): void {
    if (this.reservationsService.reservationData) {
      this.form.setValue({
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
  }
  

  ngAfterViewInit(): void {
    switch (this.fieldToFocus) {
      case 'username':
        this.userNameInput.nativeElement.focus();
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

  public updateCheckbox(val: string, controlName: string): void {
    this.form.get(controlName)?.setValue(val === 'true');
  }

  public getControl<T>(controlName: string): FormControl<T> {
    const control = this.form.get(controlName);
    if (!control) throw Error ('Invalid control name')
    return this.form.get(controlName) as FormControl<T>;
  }

  public submitForm(): void {
    const reservationData: IKResReservationData = {
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
}
