import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { InputMaskModule } from '@ngneat/input-mask';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { Observable, Subject } from 'rxjs';
import { IKResRegionParams } from '../../models/region/region.model';
import { IKResReservationData } from '../../models/reservation.model';
import { KResRestaurant } from '../../models/restaurant.model';
import { IKResDayScheduleParams } from '../../models/schedule/day-schedule.model';
import { IKResServingHoursParams } from '../../models/schedule/serving-hours.model';
import { KResReservationService } from '../../services/reservation.service';
import { KResReservationComponent } from './reservation.component';

const ENGLISH_TRANSLATIONS = {
  'kreservations.reservations.form.date': 'date',
  'kreservations.reservations.form.username': 'username',
  'kreservations.reservations.form.email': 'email',
  'kreservations.reservations.form.phone': 'phone',
  'kreservations.reservations.form.people.placeholder': 'people',
  'kreservations.reservations.form.children': 'children',
  'kreservations.reservations.form.smokers': 'smokers',
  'kreservations.reservations.form.birthday': 'birthday',
  'kreservations.reservations.form.region': 'region',
  'kreservations.reservations.form.time': 'time',
  'kreservations.reservations.form.birthdayName': 'Bday name',
};
const ENGLISH_LANGUAGE = 'en';

const TRANSLATIONS = {
  [ENGLISH_LANGUAGE]: ENGLISH_TRANSLATIONS,
};

const VALID_FORM_VALUE = {
  date: new Date(2023, 6, 25),
  time: '19:30',
  userName: 'someUser',
  email: 'user@domain.com',
  phone: '666555666',
  people: 2,
  children: 0,
  region: 1,
  smokers: false,
  birthday: true,
  birthdayName: 'John'
};

const MOCK_RESERVATIONS: IKResReservationData[] = [
  {
    date: new Date('2023-07-25T16:30:43.511Z'),
    username: 'user1',
    email: 'user1@domain.com',
    phone: '666555444',
    people: '2',
    children: '0',
    region: {
      id: 1,
      name: 'Room One'
    },
    smokers: false,
    birthday: false,
    birthdayName: null
  }, {
    date: new Date('2023-07-24T16:00:43.511Z'),
    username: 'user1',
    email: 'user1@domain.com',
    phone: '666555444',
    people: '2',
    children: '0',
    region: {
      id: 1,
      name: 'Room One'
    },
    smokers: false,
    birthday: false,
    birthdayName: null
  }, {
    date: new Date('2023-07-24T16:30:43.511Z'),
    username: 'user1',
    email: 'user1@domain.com',
    phone: '666555444',
    people: '2',
    children: '0',
    region: {
      id: 1,
      name: 'Room One'
    },
    smokers: false,
    birthday: false,
    birthdayName: null
  }, {
    date: new Date('2023-07-24T17:00:43.511Z'),
    username: 'user1',
    email: 'user1@domain.com',
    phone: '666555444',
    people: '2',
    children: '0',
    region: {
      id: 1,
      name: 'Room One'
    },
    smokers: false,
    birthday: false,
    birthdayName: null
  }, {
    date: new Date('2023-07-26T16:00:43.511Z'),
    username: 'user1',
    email: 'user1@domain.com',
    phone: '666555444',
    people: '2',
    children: '0',
    region: {
      id: 1,
      name: 'Room One'
    },
    smokers: false,
    birthday: false,
    birthdayName: null
  }, {
    date: new Date('2023-07-26T16:30:43.511Z'),
    username: 'user1',
    email: 'user1@domain.com',
    phone: '666555444',
    people: '2',
    children: '0',
    region: {
      id: 1,
      name: 'Room One'
    },
    smokers: false,
    birthday: false,
    birthdayName: null
  }, {
    date: new Date('2023-07-26T17:00:43.511Z'),
    username: 'user1',
    email: 'user1@domain.com',
    phone: '666555444',
    people: '2',
    children: '0',
    region: {
      id: 1,
      name: 'Room One'
    },
    smokers: false,
    birthday: false,
    birthdayName: null
  }, {
    date: new Date('2023-07-26T17:30:43.511Z'),
    username: 'user1',
    email: 'user1@domain.com',
    phone: '666555444',
    people: '2',
    children: '0',
    region: {
      id: 1,
      name: 'Room One'
    },
    smokers: false,
    birthday: false,
    birthdayName: null
  }, {
    date: new Date('2023-07-26T18:00:43.511Z'),
    username: 'user1',
    email: 'user1@domain.com',
    phone: '666555444',
    people: '2',
    children: '0',
    region: {
      id: 1,
      name: 'Room One'
    },
    smokers: false,
    birthday: false,
    birthdayName: null
  }, {
    date: new Date('2023-07-26T18:30:43.511Z'),
    username: 'user1',
    email: 'user1@domain.com',
    phone: '666555444',
    people: '2',
    children: '0',
    region: {
      id: 1,
      name: 'Room One'
    },
    smokers: false,
    birthday: false,
    birthdayName: null
  }, {
    date: new Date('2023-07-26T19:00:43.511Z'),
    username: 'user1',
    email: 'user1@domain.com',
    phone: '666555444',
    people: '2',
    children: '0',
    region: {
      id: 1,
      name: 'Room One'
    },
    smokers: false,
    birthday: false,
    birthdayName: null
  }, {
    date: new Date('2023-07-26T19:30:43.511Z'),
    username: 'user1',
    email: 'user1@domain.com',
    phone: '666555444',
    people: '2',
    children: '0',
    region: {
      id: 1,
      name: 'Room One'
    },
    smokers: false,
    birthday: false,
    birthdayName: null
  }, {
    date: new Date('2023-07-26T20:00:43.511Z'),
    username: 'user1',
    email: 'user1@domain.com',
    phone: '666555444',
    people: '2',
    children: '0',
    region: {
      id: 1,
      name: 'Room One'
    },
    smokers: false,
    birthday: false,
    birthdayName: null
  }
];

class KResReservationMockService {
  private _reservationData: IKResReservationData;
  private _wholeRestaurantReservations: Subject<IKResReservationData[]> = new Subject<IKResReservationData[]>()

  get reservationData(): IKResReservationData {
      return this._reservationData;
  }

  set reservationData(val: IKResReservationData) {
      this._reservationData = val;
  }

  get wholeRestaurantReservations$(): Observable<IKResReservationData[]> {
      return this._wholeRestaurantReservations.asObservable();
  }

  mockResponseFromBe(): void {
    this._wholeRestaurantReservations.next(MOCK_RESERVATIONS);
  }
}

describe('KResReservationComponent', () => {
  let fixture: ComponentFixture<KResReservationComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, TranslateTestingModule.withTranslations(TRANSLATIONS), ReactiveFormsModule, FormsModule, InputMaskModule],
      declarations: [KResReservationComponent],
      providers: [
        {
            provide: KResReservationService,
            useClass: KResReservationMockService,
        }
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(KResReservationComponent);
    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(KResReservationComponent).toBeTruthy();
  });

  describe('display form', () => {
    let debugElement: DebugElement;
    beforeEach(() => {
      debugElement = fixture.debugElement;
    });

    it ('Should display date field', () => {
      const dateField = debugElement.queryAll(By.css('input')).find(e => e.nativeElement['placeholder'] === 'date');
      expect(dateField).toBeTruthy();
    });
    it ('Should display username field', () => {
      const usernameField = debugElement.queryAll(By.css('input')).find(e => e.nativeElement['placeholder'] === 'username');
      expect(usernameField).toBeTruthy();
    });
    it ('Should display email field', () => {
      const emailField = debugElement.queryAll(By.css('input')).find(e => e.nativeElement['placeholder'] === 'email');
      expect(emailField).toBeTruthy();
    });
    it ('Should display phone field', () => {
      const phoneField = debugElement.queryAll(By.css('input')).find(e => e.nativeElement['placeholder'] === 'phone');
      expect(phoneField).toBeTruthy();
    });
    it ('Should display people field', () => {
      const peopleField = debugElement.queryAll(By.css('input')).find(e => e.nativeElement['placeholder'] === 'people');
      expect(peopleField).toBeTruthy();
    });
    it ('Should display children field', () => {
      const childrenField = debugElement.queryAll(By.css('input')).find(e => e.nativeElement['placeholder'] === 'children');
      expect(childrenField).toBeTruthy();
    });
    it ('Should display birthday field', () => {
      const birthdayField = debugElement.queryAll(By.css('input[type=checkbox]')).filter(e => e.parent.children[0].name === 'label').find(e => e.parent.children[0].nativeElement.innerHTML.includes('birthday'));
      expect(birthdayField).toBeTruthy();
    });
    it ('Should display smokers field', () => {
      const smokersField = debugElement.queryAll(By.css('input[type=checkbox]')).filter(e => e.parent.children[0].name === 'label').find(e => e.parent.children[0].nativeElement.innerHTML.includes('smokers'));
      expect(smokersField).toBeTruthy();
    });
    it ('Should display region field', () => {
      const regionField = debugElement.queryAll(By.css('select')).filter(e => e.parent.children[0].name === 'label').find(e => e.parent.children[0].nativeElement.innerHTML.includes('region'));
      expect(regionField).toBeTruthy();
    });
    it ('Should display time field', () => {
      const timeField = debugElement.queryAll(By.css('select')).filter(e => e.parent.children[0].name === 'label').find(e => e.parent.children[0].nativeElement.innerHTML.includes('time'));
      expect(timeField).toBeTruthy();
    });
    it (`Should display the birthday person's name field`, () => {
      fixture.componentInstance.form.get('birthday').setValue(true);
      fixture.detectChanges();
      const birthdayNameField = debugElement.queryAll(By.css('input')).find(e => e.nativeElement['placeholder'] === 'Bday name');
      expect(birthdayNameField).toBeTruthy();
    });
  });

  describe('form must validate fields', () => {
    let form: FormGroup;
    

    beforeEach(() => {
      fixture.detectChanges();
      form = fixture.componentInstance.form;
    });

    it('Form should not be valid', () => {
      expect(form.valid).toBe(false);
    });

    it('Form should be valid', () => {
      form.setValue(VALID_FORM_VALUE);
      fixture.detectChanges();
      expect(form.valid).toBe(true);
    });

    it('should validate max date', () => {
      form.setValue({
        ...VALID_FORM_VALUE,
        date: new Date(2023, 7, 1),
      });
      fixture.detectChanges();
      expect(form.valid).toBe(false);
      expect(form.controls['date'].errors).toStrictEqual({maxDate: true});
    });

    it('should validate min date', () => {
      form.setValue({
        ...VALID_FORM_VALUE,
        date: new Date(2023, 6, 23),
      });
      fixture.detectChanges();
      expect(form.valid).toBe(false);
      expect(form.controls['date'].errors).toStrictEqual({minDate: true});
    });

    it('should validate date required and value', () => {
      form.setValue({
        ...VALID_FORM_VALUE,
        date: null,
      });
      fixture.detectChanges();
      expect(form.valid).toBe(false);
      expect(form.controls['date'].errors).toStrictEqual({date: true, required: true});
    });
    
    it('should validate time required', () => {
      form.setValue({
        ...VALID_FORM_VALUE,
        time: null,
      });
      fixture.detectChanges();
      expect(form.valid).toBe(false);
      expect(form.controls['time'].errors).toStrictEqual({required: true});
    });
    
    it('should validate time required', () => {
      form.setValue({
        ...VALID_FORM_VALUE,
        time: null,
      });
      fixture.detectChanges();
      expect(form.valid).toBe(false);
      expect(form.controls['time'].errors).toStrictEqual({required: true});
    });
    
    it('should validate username required', () => {
      form.setValue({
        ...VALID_FORM_VALUE,
        userName: null,
      });
      fixture.detectChanges();
      expect(form.valid).toBe(false);
      expect(form.controls['userName'].errors).toStrictEqual({required: true});
    });
    
    it('should validate email required', () => {
      form.setValue({
        ...VALID_FORM_VALUE,
        email: null,
      });
      fixture.detectChanges();
      expect(form.valid).toBe(false);
      expect(form.controls['email'].errors).toStrictEqual({required: true});
    });
    
    it('should validate email format', () => {
      form.setValue({
        ...VALID_FORM_VALUE,
        email: 'this_is_some_invalid_email',
      });
      fixture.detectChanges();
      expect(form.valid).toBe(false);
      expect(form.controls['email'].errors).toStrictEqual({email: true});
    });
    
    it('should validate phone required', () => {
      form.setValue({
        ...VALID_FORM_VALUE,
        phone: null,
      });
      fixture.detectChanges();
      expect(form.valid).toBe(false);
      expect(form.controls['phone'].errors).toStrictEqual({required: true});
    });
    
    it('should validate phone format', () => {
      const formats = {
        valid: VALID_FORM_VALUE.phone,
        invalid: 'a',
        invalid2: 'aaabbbaaa',
        invalid3: '1',
        invalid4: '1234567890',
      }
      form.setValue({
        ...VALID_FORM_VALUE,
        phone: formats.invalid,
      });
      fixture.detectChanges();
      expect(form.valid).toBe(false);
      expect(form.controls['phone'].errors).toStrictEqual({phone: true});
      form.setValue({
        ...VALID_FORM_VALUE,
        phone: formats.valid,
      });
      fixture.detectChanges();
      expect(form.valid).toBe(true);
      expect(form.controls['phone'].errors).toStrictEqual(null);
      // Invalid 2
      form.setValue({
        ...VALID_FORM_VALUE,
        phone: formats.invalid2,
      });
      fixture.detectChanges();
      expect(form.valid).toBe(false);
      expect(form.controls['phone'].errors).toStrictEqual({phone: true});
      form.setValue({
        ...VALID_FORM_VALUE,
        phone: formats.valid,
      });
      fixture.detectChanges();
      expect(form.valid).toBe(true);
      expect(form.controls['phone'].errors).toStrictEqual(null);
      // Invalid 3
      form.setValue({
        ...VALID_FORM_VALUE,
        phone: formats.invalid3,
      });
      fixture.detectChanges();
      expect(form.valid).toBe(false);
      expect(form.controls['phone'].errors).toStrictEqual({phone: true});
      form.setValue({
        ...VALID_FORM_VALUE,
        phone: formats.valid,
      });
      fixture.detectChanges();
      expect(form.valid).toBe(true);
      expect(form.controls['phone'].errors).toStrictEqual(null);
      // Invalid 4
      form.setValue({
        ...VALID_FORM_VALUE,
        phone: formats.invalid4,
      });
      fixture.detectChanges();
      expect(form.valid).toBe(false);
      expect(form.controls['phone'].errors).toStrictEqual({phone: true});
      form.setValue({
        ...VALID_FORM_VALUE,
        phone: formats.valid,
      });
      fixture.detectChanges();
      expect(form.valid).toBe(true);
      expect(form.controls['phone'].errors).toStrictEqual(null);
    });
    
    it('should validate size required', () => {
      form.setValue({
        ...VALID_FORM_VALUE,
        people: null,
      });
      fixture.detectChanges();
      expect(form.valid).toBe(false);
      expect(form.controls['people'].errors).toStrictEqual({required: true});
    });
    
    it('should validate size minValue 0', () => {
      form.setValue({
        ...VALID_FORM_VALUE,
        people: -1,
      });
      fixture.detectChanges();
      expect(form.valid).toBe(false);
      expect(form.controls['people'].errors).toStrictEqual({positiveNumber: true});
      form.setValue({
        ...VALID_FORM_VALUE,
        people: 1,
      });
      fixture.detectChanges();
      expect(form.valid).toBe(true);
      expect(form.controls['people'].errors).toStrictEqual(null);
      form.setValue({
        ...VALID_FORM_VALUE,
        people: 0,
      });
      fixture.detectChanges();
      expect(form.valid).toBe(false);
      expect(form.controls['people'].errors).toStrictEqual({positiveNumber: true});
    });
    
    it('should validate children  required', () => {
      form.setValue({
        ...VALID_FORM_VALUE,
        children: null,
      });
      fixture.detectChanges();
      expect(form.valid).toBe(false);
      expect(form.controls['children'].errors).toStrictEqual({required: true})
    });
    
    it('should validate children minValue 0', () => {
      form.setValue({
        ...VALID_FORM_VALUE,
        children: -1,
      });
      fixture.detectChanges();
      expect(form.valid).toBe(false);
      expect(form.controls['children'].errors).toStrictEqual({zeroOrLarger: true});
      form.setValue({
        ...VALID_FORM_VALUE,
        children: 0,
      });
      fixture.detectChanges();
      expect(form.valid).toBe(true);
      expect(form.controls['people'].errors).toStrictEqual(null);
    });
    
    it('should validate smokers required', () => {
      form.setValue({
        ...VALID_FORM_VALUE,
        smokers: null,
      });
      fixture.detectChanges();
      expect(form.valid).toBe(false);
      expect(form.controls['smokers'].errors).toStrictEqual({required: true});
    });
    
    it('should validate birthday required', () => {
      form.setValue({
        ...VALID_FORM_VALUE,
        birthday: null,
      });
      fixture.detectChanges();
      expect(form.valid).toBe(false);
      expect(form.controls['birthday'].errors).toStrictEqual({required: true});
    });
    
    it('should validate region required', () => {
      form.setValue({
        ...VALID_FORM_VALUE,
        region: null,
      });
      fixture.detectChanges();
      expect(form.valid).toBe(false);
      expect(form.controls['region'].errors).toStrictEqual({required: true});
    });
    
    it(`should accept null values for birthday person's name region required`, () => {
      form.setValue({
        ...VALID_FORM_VALUE,
        birthdayName: null,
      });
      fixture.detectChanges();
      expect(form.valid).toBe(true);
    });
  });

  describe('according to a mock restaurant', () => {
    const dinnerSchedule: IKResServingHoursParams = {
      end: 22,
      start: 18,
    };
    const lunchSchedule: IKResServingHoursParams = {
      start: 12,
      end: 15,
    };
    const weekendSchedule: IKResDayScheduleParams = {
      dinner: dinnerSchedule,
      lunch: lunchSchedule,
    };
    const dayWeekSchedule: IKResDayScheduleParams = {
      dinner: dinnerSchedule,
      lunch: {start: null, end: null},
    };
    const roomOne: IKResRegionParams = {
      id: 1,
      onlyAdults: true,
      maxPeoplePerTable: 2,
      smokingAllowed: true,
      maxReservationsSimultaneously: 1,
      name: 'Room One',
    };
    const roomTwo: IKResRegionParams = {
      id: 2,
      onlyAdults: false,
      maxPeoplePerTable: 3,
      smokingAllowed: true,
      maxReservationsSimultaneously: 2,
      name: 'Room Two',
    };
    const roomThree: IKResRegionParams = {
      id: 3,
      onlyAdults: false,
      maxPeoplePerTable: 4,
      smokingAllowed: false,
      maxReservationsSimultaneously: 2,
      name: 'Room Three',
    };
    const roomFour: IKResRegionParams = {
      id: 4,
      onlyAdults: true,
      maxPeoplePerTable: 5,
      smokingAllowed: false,
      maxReservationsSimultaneously: 2,
      name: 'Room Four',
    };
    const mockRestaurant: KResRestaurant = new KResRestaurant({
      schedule: {
        friday: weekendSchedule,
        saturday: weekendSchedule,
        sunday: weekendSchedule,
        monday: dayWeekSchedule,
        tuesday: dayWeekSchedule,
        wednesday: dayWeekSchedule,
        thursday: dayWeekSchedule,
      },
      regions: [
        roomOne,
        roomTwo,
        roomThree,
        roomFour,
      ],
    });

    let component: KResReservationComponent;

    beforeEach(() => {
      fixture.detectChanges();
      component = fixture.componentInstance
      component['restaurant'] = mockRestaurant;
    });

    describe('form logic between several fields', () => {
  
      it('Should be properly Configured', () => {
        expect(component['restaurant'].regions[0]).toEqual(roomOne);
      });
  
      describe('Region depends on people, smokers and children', () => {
        it ('should not change if selected region is ok with combination selected later', () => {
          // Working with Room 1
          component.form.get('region').setValue(roomOne.id);
          fixture.detectChanges();
          expect(component.form.get('region').value).toBe(roomOne.id);
          component.form.get('people').setValue(1);
          component.form.get('children').setValue(false);
          component.form.get('smokers').setValue(true);
          fixture.detectChanges();
          expect(component.form.get('region').value).toBe(roomOne.id);
          component.form.get('smokers').setValue(false);
          fixture.detectChanges();
          expect(component.form.get('region').value).toBe(roomOne.id);
        });
  
        it('should reset if people is larger than maximum allowed', () => {
          // Working with Room 1
          component.form.get('region').setValue(roomOne.id);
          fixture.detectChanges();
          expect(component.form.get('region').value).toBe(roomOne.id);
          component.form.get('people').setValue(roomOne.maxPeoplePerTable + 1);
          fixture.detectChanges();
          expect(component.form.get('region').value).toBe(null);
        });
        
        it('should reset if there are smokers and no smoking is allowed', () => {
          // Working with Room 3
          component.form.get('region').setValue(roomThree.id);
          fixture.detectChanges();
          expect(component.form.get('region').value).toBe(roomThree.id);
          component.form.get('smokers').setValue(true);
          fixture.detectChanges();
          expect(component.form.get('region').value).toBe(null);
        });
        
        it('should reset if there are children and the room is adults only', () => {
          // Working with Room 4
          component.form.get('region').setValue(roomFour.id);
          fixture.detectChanges();
          expect(component.form.get('region').value).toBe(roomFour.id);
          component.form.get('children').setValue(true);
          fixture.detectChanges();
          expect(component.form.get('region').value).toBe(null);
        });
  
        it('should disable region options depending on the people', () => {
          expect(component.availableRegions.filter(r => !r.disabled).map(r => r.id)).toEqual([roomOne.id, roomTwo.id, roomThree.id, roomFour.id]);
          // 2 people
          component.form.get('people').setValue(2);
          fixture.detectChanges();
          expect(component.availableRegions.filter(r => !r.disabled).map(r => r.id)).toEqual([roomOne.id, roomTwo.id, roomThree.id, roomFour.id]);
          // 3 people
          component.form.get('people').setValue(3);
          fixture.detectChanges();
          expect(component.availableRegions.filter(r => !r.disabled).map(r => r.id)).toEqual([roomTwo.id, roomThree.id, roomFour.id]);
          // 4 people
          component.form.get('people').setValue(4);
          fixture.detectChanges();
          expect(component.availableRegions.filter(r => !r.disabled).map(r => r.id)).toEqual([roomThree.id, roomFour.id]);
          // 5 people
          component.form.get('people').setValue(5);
          fixture.detectChanges();
          expect(component.availableRegions.filter(r => !r.disabled).map(r => r.id)).toEqual([roomFour.id]);
          // 6 people
          component.form.get('people').setValue(6);
          fixture.detectChanges();
          expect(component.availableRegions.filter(r => !r.disabled).map(r => r.id)).toEqual([]);
        });
        
        it('should disable region options depending on smoking', () => {
          expect(component.availableRegions.filter(r => !r.disabled).map(r => r.id)).toEqual([roomOne.id, roomTwo.id, roomThree.id, roomFour.id]);
          // No smokers
          component.form.get('smokers').setValue(false);
          fixture.detectChanges();
          expect(component.availableRegions.filter(r => !r.disabled).map(r => r.id)).toEqual([roomOne.id, roomTwo.id, roomThree.id, roomFour.id]);
          // Smokers
          component.form.get('smokers').setValue(true);
          fixture.detectChanges();
          expect(component.availableRegions.filter(r => !r.disabled).map(r => r.id)).toEqual([roomOne.id, roomTwo.id]);
        });
        
        it('should disable region options depending on children', () => {
          expect(component.availableRegions.filter(r => !r.disabled).map(r => r.id)).toEqual([roomOne.id, roomTwo.id, roomThree.id, roomFour.id]);
          // No children
          component.form.get('children').setValue(false);
          fixture.detectChanges();
          expect(component.availableRegions.filter(r => !r.disabled).map(r => r.id)).toEqual([roomOne.id, roomTwo.id, roomThree.id, roomFour.id]);
          // children
          component.form.get('children').setValue(true);
          fixture.detectChanges();
          expect(component.availableRegions.filter(r => !r.disabled).map(r => r.id)).toEqual([roomTwo.id, roomThree.id]);
        });
        
        it('should disable region options depending on children, smokers and size', () => {
          expect(component.availableRegions.filter(r => !r.disabled).map(r => r.id)).toEqual([roomOne.id, roomTwo.id, roomThree.id, roomFour.id]);
          // children
          component.form.get('children').setValue(true);
          fixture.detectChanges();
          expect(component.availableRegions.filter(r => !r.disabled).map(r => r.id)).toEqual([roomTwo.id, roomThree.id]);
          // children and smokers
          component.form.get('smokers').setValue(true);
          fixture.detectChanges();
          expect(component.availableRegions.filter(r => !r.disabled).map(r => r.id)).toEqual([roomTwo.id]);
          // children, smokers and size
          component.form.get('people').setValue(6);
          fixture.detectChanges();
          expect(component.availableRegions.filter(r => !r.disabled).map(r => r.id)).toEqual([]);
        });
      });

      describe('Time field depends on date field', () => {
        it('should be possible to set time after date is set', () => {
          component.form.get('date').setValue(new Date(2023, 6, 25));
          fixture.detectChanges();
          component.form.get('time').setValue('18:00');
          fixture.detectChanges();
          expect(component.form.get('time').value).toBe('18:00');
        });
        it('should be reset when date is set', () => {
          component.form.get('time').setValue('18:00');
          fixture.detectChanges();
          expect(component.form.get('time').value).toBe('18:00');
          component.form.get('date').setValue(new Date(2023, 6, 25));
          fixture.detectChanges();
          expect(component.form.get('time').value).toBe(null);
        });
      });
      describe('Birthday name field depends on birthday field', () => {
        it('should be possible to set birthday name after birthday is set', () => {
          component.form.get('birthday').setValue(true);
          fixture.detectChanges();
          component.form.get('birthdayName').setValue('John');
          fixture.detectChanges();
          expect(component.form.get('birthdayName').value).toBe('John');
        });
        it('should be reset when birthday is removed', () => {
          component.form.get('birthdayName').setValue('John');
          fixture.detectChanges();
          expect(component.form.get('birthdayName').value).toBe('John');
          component.form.get('birthday').setValue(false);
          fixture.detectChanges();
          expect(component.form.get('birthdayName').value).toBe(null);
        });
      });
    });
  
    describe('time options according to date selected', () => {
      
      const calculateNumberOfTimeSlotsPerShift = (shift: IKResServingHoursParams) => {
        return shift.end && shift.start ? (shift.end - shift.start) * 2 + 1 : 0;
      }

      const calculateNumberOfTimeSlotsPerDay = (day: IKResDayScheduleParams) => {
        return calculateNumberOfTimeSlotsPerShift(day.dinner) + calculateNumberOfTimeSlotsPerShift(day.lunch);
      }

      it('should serve lunch and dinner for weekends', () => {
        component.form.get('date').setValue(new Date(2023, 6, 28));
        fixture.detectChanges();
        expect(component.availableTimeSlots.length).toBe(calculateNumberOfTimeSlotsPerDay(mockRestaurant.schedule.friday));
      });

      it('should not serve lunch on weekdays', () => {
        component.form.get('date').setValue(new Date(2023, 6 ,25));
        fixture.detectChanges();
        expect(component.availableTimeSlots.length).toBe(calculateNumberOfTimeSlotsPerDay(mockRestaurant.schedule.tuesday))
      });
    });

    describe('on submit', () => {
      let component: KResReservationComponent;
      let service: KResReservationService;
      beforeEach(() => {
        fixture.detectChanges();
        component = fixture.componentInstance;
        service = component['reservationsService'];
      });

      it('should update state on reservations service', () => {
        const routerSpy = jest.spyOn(component['router'], 'navigateByUrl');
        expect(service.reservationData).toBeFalsy();
        component.form.setValue(VALID_FORM_VALUE);
        component.submitForm();
        fixture.detectChanges();
        expect(service.reservationData).not.toBeFalsy();
        expect(routerSpy).toHaveBeenCalledWith('/confirmation');
      });
    });

    describe('suggest solutions when slot selected is fully booked', () => {
      const getDisclaimerInfoElements = () => {
        fixture.detectChanges();
        return fixture.debugElement.queryAll(By.css('.kreservations-reservations-disclaimer--info'));
      }
      const getDisclaimerErrorElements = () => {
        fixture.detectChanges();
        return fixture.debugElement.queryAll(By.css('.kreservations-reservations-disclaimer--error'));
      }
      it(`should suggest me the nearest slot to the booked time ('previous')`, () => {
        expect(component.suggestedDate).toBeFalsy();
        component.form.setValue({
          ...VALID_FORM_VALUE,
          time: '18:30',
        });
        expect(getDisclaimerInfoElements().length).toBe(1);
        (component['reservationsService'] as any).mockResponseFromBe();
        expect(component.suggestedDate).toBeTruthy();
        expect(component.suggestedDate).toStrictEqual(new Date(2023, 6, 25, 18, 0));
        expect(getDisclaimerInfoElements().length).toBe(2);
      });

      it('should suggest me the nearest slot to the booked time', () => {
        expect(component.suggestedDate).toBeFalsy();
        component.form.setValue({
          ...VALID_FORM_VALUE,
          date: new Date(2023, 6, 24),
          time: '18:30',
        });
        expect(getDisclaimerInfoElements().length).toBe(1);
        (component['reservationsService'] as any).mockResponseFromBe();
        expect(component.suggestedDate).toBeTruthy();
        expect(component.suggestedDate).toStrictEqual(new Date(2023, 6, 24, 19, 30));
        expect(getDisclaimerInfoElements().length).toBe(2);
      });

      it(`should show the change button`, () => {
        expect(component.suggestedDate).toBeFalsy();
        component.form.setValue({
          ...VALID_FORM_VALUE,
          time: '18:30',
        });
        (component['reservationsService'] as any).mockResponseFromBe();
        expect(component.suggestedDate).toStrictEqual(new Date(2023, 6, 25, 18, 0));
        expect(getDisclaimerInfoElements().length).toBe(2);
        expect(getDisclaimerInfoElements().at(-1).children.find(e => e.name === 'button')).toBeTruthy();
      });

      it('should update the form value when clicking the change button', () => {
        expect(component.suggestedDate).toBeFalsy();
        component.form.setValue({
          ...VALID_FORM_VALUE,
          time: '18:30',
        });
        (component['reservationsService'] as any).mockResponseFromBe();
        const suggestedDate = new Date(2023, 6, 25, 18, 0);
        expect(component.suggestedDate).toStrictEqual(suggestedDate);
        expect(getDisclaimerInfoElements().length).toBe(2);
        const modifyDateSpy = jest.spyOn(component, 'modifyDate')
        getDisclaimerInfoElements().at(-1).children.find(e => e.name === 'button').nativeElement.click();
        fixture.detectChanges();
        expect(modifyDateSpy).toHaveBeenCalled();
        expect(component.form.get('date').value).toEqual(suggestedDate);
        expect(component.form.get('time').value).toEqual(`18:00`);
      });

      it('should warn me when the shift is complete in that region', () => {
        expect(component.noAvailableSuggestionsForInvalidDate).toBeFalsy();
        expect(getDisclaimerErrorElements().length).toBe(1);
        component.form.setValue({
          ...VALID_FORM_VALUE,
          date: new Date(2023, 6, 26),
          time: '18:30',
        });
        (component['reservationsService'] as any).mockResponseFromBe();
        expect(component.noAvailableSuggestionsForInvalidDate).toBeTruthy();
        expect(getDisclaimerErrorElements().length).toBe(2);
      });
    });
  });

});
