import { AbstractControl, ValidationErrors } from "@angular/forms";

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
}