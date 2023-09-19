import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class KResCustomValidators {

    static positiveNumberValidator(control: AbstractControl): ValidationErrors | null {
        return control?.value === null || control.value === undefined || +control?.value > 0 ? null : { positiveNumber: true };
    }

    static zeroOrLargerNumberValidator(control: AbstractControl): ValidationErrors | null {
        return !control?.value || +control?.value >+ 0 ? null : { zeroOrLarger: true };
    }

    static phoneValidator(control: AbstractControl): ValidationErrors | null {
        const phoneRegExp = /^\d\d\d\d\d\d\d\d\d$/;
        return !control?.value || phoneRegExp.test(control?.value) ? null : {phone: true};
    }

    static dateValidator(control: AbstractControl): ValidationErrors | null {
        const timestamp = Date.parse(control?.value);
        return !control?.value || !isNaN(timestamp) ? null : {date: true};
    }

    static minDateValidator(minDate: Date): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const timestamp = Date.parse(control?.value);
            if (!isNaN(timestamp)) {
                const minDateTimestamp = minDate.getTime();
                return timestamp >= minDateTimestamp ? null : {minDate: true}
            }
            return {date: true}
        }
    }

    static maxDateValidator(maxDate: Date): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const timestamp = Date.parse(control?.value);
            if (!isNaN(timestamp)) {
                const maxDateTimestamp = maxDate.getTime();
                return timestamp <= maxDateTimestamp ? null : {maxDate: true}
            }
            return {date: true}
        }
    }
}