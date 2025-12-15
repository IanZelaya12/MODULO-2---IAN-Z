import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
    selector: '[minLengthCustom]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MinLengthValidator, multi: true }]
})
export class MinLengthValidator implements Validator {
    // Definimos el valor mínimo que esperamos
    @Input('minLengthCustom') minLength: number = 5;

    // 7. Validador personalizado (Directiva de Angular)
    validate(control: AbstractControl): ValidationErrors | null {
        if (control.value && control.value.length < this.minLength) {
            return { 
                minLengthCustom: {
                    requiredLength: this.minLength,
                    actualLength: control.value.length
                }
            };
        }
        return null; // La validación es exitosa
    }
}
