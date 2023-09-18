import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KResRestaurant } from '../../models/restaurant.model';
import { KRES_KAFE_CONFIG } from './kafe-specifications/kafe-config.constants';
import { KResCustomValidators } from './reservation.validators';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'kres-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KResReservationComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject();

  private restaurant: KResRestaurant = new KResRestaurant(KRES_KAFE_CONFIG);

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

  ngOnInit(): void {
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
    alert(JSON.stringify(this.form.value));
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
