import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
   

export const ConfirmedValidator = (controlName: string, matchingControlName: string): ValidatorFn => {
  return (control: import('@angular/forms').AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const controlField = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
      // already has another error
      return null;
    }

    if (controlField.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
    return null;
  };
};
