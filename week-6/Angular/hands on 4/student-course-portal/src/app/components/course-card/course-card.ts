import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';

@Component({
  selector: 'app-course-card',
  imports: [CommonModule, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges {

  @Input() course: { id: number; name: string; code: string; credits: number; gradeStatus?: string } = {
    id: 0,
    name: '',
    code: '',
    credits: 0,
    gradeStatus: 'pending',
  };

  @Input() isEnrolled: boolean = false;

  @Output() enrollRequested = new EventEmitter<number>();

  // Step 31: isExpanded property to toggle height
  isExpanded: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log(
        `CourseCard ngOnChanges — previous: ${JSON.stringify(changes['course'].previousValue)}, ` +
        `current: ${JSON.stringify(changes['course'].currentValue)}`
      );
    }
  }

  // Step 32: Getter for ngClass. Keeping complex logic in getters keeps templates clean and readable.
  get cardClasses() {
    return {
      'card--enrolled': this.isEnrolled,
      'card--full': this.course.credits >= 4,
      'expanded': this.isExpanded
    };
  }

  // Helper for ngStyle
  get borderStyle() {
    let color = 'grey';
    if (this.course.gradeStatus === 'passed') color = 'green';
    else if (this.course.gradeStatus === 'failed') color = 'red';
    return { 'border-left': `5px solid ${color}` };
  }
}
