import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

// Hands-On 5 Task 2 Step 53: Custom Synchronous Validator function
export function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const val = String(control.value || '').trim();
  if (val.startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}

// Hands-On 5 Task 2 Step 55: Custom Asynchronous Validator function
export function simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const email = String(control.value || '').toLowerCase();
      if (email.includes('test@')) {
        resolve({ emailTaken: true });
      } else {
        resolve(null);
      }
    }, 800);
  });
}

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.component.html',
  styleUrls: ['./reactive-enrollment-form.component.css']
})
export class ReactiveEnrollmentFormComponent implements OnInit {
  public enrollForm!: FormGroup;
  public isSubmitted = false;

  constructor(private fb: FormBuilder) {}

  // Hands-On 5 Task 1 Step 49: Build reactive form with FormBuilder
  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: ['', [Validators.required, Validators.email], [simulateEmailCheck]],
      courseId: [null, [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([])
    });
  }

  // Hands-On 5 Task 2 Step 57: Typed getter for FormArray
  // Explanatory comment: Creating a typed getter in TypeScript avoids cumbersome inline type casting in HTML templates,
  // making the component template clean and type-safe.
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  addCourse(): void {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  onSubmit(): void {
    // Hands-On 5 Task 1 Step 51 & 52: Log form value vs getRawValue()
    // Explanatory comment:
    // enrollForm.value returns only enabled controls (omitting disabled controls).
    // enrollForm.getRawValue() returns values for ALL controls including disabled ones.
    console.log('Reactive Form Value (value):', this.enrollForm.value);
    console.log('Reactive Form Raw Value (getRawValue):', this.enrollForm.getRawValue());

    if (this.enrollForm.valid) {
      this.isSubmitted = true;
    }
  }
}
