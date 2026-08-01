import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';
import { EnrollmentService } from '../../services/enrollment.service';
import * as EnrollmentActions from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, CreditLabelPipe, HighlightDirective],
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnChanges {
  @Input() course!: Course;
  @Input() appHighlight = 'yellow';
  @Output() enrollRequested = new EventEmitter<number>();

  public isExpanded = false;

  private store = inject(Store);
  public enrollmentService = inject(EnrollmentService);
  public enrolledIds$ = this.store.select(selectEnrolledIds);

  // Hands-On 2 Task 2: ngOnChanges logging previous and current values of course input
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log('CourseCardComponent ngOnChanges - Previous:', changes['course'].previousValue, 'Current:', changes['course'].currentValue);
    }
  }

  toggleDetails(): void {
    this.isExpanded = !this.isExpanded;
  }

  // Hands-On 3 Task 2: Refactored ngClass object binding using a getter in component class.
  // Explanatory comment: Getters keep templates clean, maintainable, and readable by moving logic into TypeScript.
  get cardClasses() {
    const enrolled = this.isEnrolled;
    return {
      'card--enrolled': enrolled,
      'card--full': this.course ? this.course.credits >= 4 : false,
      'expanded': this.isExpanded
    };
  }

  get isEnrolled(): boolean {
    if (!this.course) return false;
    return this.enrollmentService.isEnrolled(this.course.id);
  }

  onEnrollClick(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    if (this.course) {
      this.enrollRequested.emit(this.course.id);

      if (this.isEnrolled) {
        this.enrollmentService.unenroll(this.course.id);
        this.store.dispatch(EnrollmentActions.unenrollFromCourse({ courseId: this.course.id }));
      } else {
        this.enrollmentService.enroll(this.course.id);
        this.store.dispatch(EnrollmentActions.enrollInCourse({ courseId: this.course.id }));
      }
    }
  }

  // Hands-On 3 Task 2: Dynamic border color via ngStyle
  get borderStyle() {
    const status = this.course?.gradeStatus;
    let color = '#9ca3af'; // grey for pending
    if (status === 'passed') color = '#22c55e'; // green
    if (status === 'failed') color = '#ef4444'; // red
    return { 'border-left': `6px solid ${color}` };
  }
}
