import { CanDeactivateFn } from '@angular/router';
import { ReactiveEnrollmentFormComponent } from '../pages/reactive-enrollment-form/reactive-enrollment-form.component';

export const unsavedChangesGuard: CanDeactivateFn<ReactiveEnrollmentFormComponent> = (component) => {
  if (component && component.enrollForm && component.enrollForm.dirty && !component.isSubmitted) {
    return window.confirm('You have unsaved changes. Leave?');
  }
  return true;
};
