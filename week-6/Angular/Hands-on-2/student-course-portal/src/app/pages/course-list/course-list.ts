import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';

/**
 * CourseListComponent — Parent component that renders CourseCardComponents.
 *
 * Step 22: Defines a courses array with 5 course objects and renders
 *          a CourseCardComponent for each using *ngFor.
 *
 * Step 23: Implements onEnroll(courseId) to handle the @Output event
 *          from the child CourseCardComponent.
 *
 * Step 24: Displays the selectedCourseId below the list using *ngIf.
 */

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList {

  // Step 22: Array of 5 course objects
  courses = [
    { id: 101, name: 'Introduction to Angular', code: 'ANG-101', credits: 3 },
    { id: 102, name: 'Advanced TypeScript', code: 'TS-201', credits: 4 },
    { id: 103, name: 'Data Structures & Algorithms', code: 'DSA-301', credits: 4 },
    { id: 104, name: 'Web Development Fundamentals', code: 'WEB-101', credits: 3 },
    { id: 105, name: 'Cloud Computing Essentials', code: 'CLD-201', credits: 3 },
  ];

  // Step 23-24: Property to track the selected course ID
  selectedCourseId: number | null = null;

  // Step 23: Handle the enrollRequested event from CourseCardComponent
  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }
}
