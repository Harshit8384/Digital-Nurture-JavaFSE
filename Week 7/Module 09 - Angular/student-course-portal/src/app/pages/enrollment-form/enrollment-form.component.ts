import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.css']
})
export class EnrollmentFormComponent {
  public studentName = '';
  public studentEmail = '';
  public courseId: number | null = null;
  public preferredSemester = 'Odd';
  public agreeToTerms = false;

  public isSubmitted = false;

  onSubmit(form: NgForm): void {
    console.log('Template-Driven Form Values:', form.value);
    console.log('Template-Driven Form Validity:', form.valid);
    if (form.valid) {
      this.isSubmitted = true;
    }
  }

  onReset(form: NgForm): void {
    form.resetForm();
    this.isSubmitted = false;
  }
}
