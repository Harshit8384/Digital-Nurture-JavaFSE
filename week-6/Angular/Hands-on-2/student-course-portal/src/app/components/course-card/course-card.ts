import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

/**
 * CourseCardComponent — Displays a single course card.
 *
 * Step 18: Implements ngOnChanges to log previous and current values
 *          of the @Input() course property whenever it changes.
 *
 * Step 20: @Input() receives course data from the parent (CourseListComponent).
 * Step 21: @Output() emits an enrollRequested event with the course ID to the parent.
 *
 * @Input and @Output create a one-way data flow:
 *   - Data flows DOWN via @Input (parent → child)
 *   - Events bubble UP via @Output (child → parent)
 * This is Angular's recommended pattern for parent-child communication.
 */

@Component({
  selector: 'app-course-card',
  imports: [],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges {

  // Step 20: @Input — receives course object from parent component
  @Input() course: { id: number; name: string; code: string; credits: number } = {
    id: 0,
    name: '',
    code: '',
    credits: 0,
  };

  // Step 21: @Output — emits course ID when user clicks Enroll
  // EventEmitter<number> makes the event strongly typed
  @Output() enrollRequested = new EventEmitter<number>();

  // Step 18: ngOnChanges — fires whenever an @Input property changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log(
        `CourseCard ngOnChanges — previous: ${JSON.stringify(changes['course'].previousValue)}, ` +
        `current: ${JSON.stringify(changes['course'].currentValue)}`
      );
    }
  }
}
