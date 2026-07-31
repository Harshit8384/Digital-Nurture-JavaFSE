import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';
import { Highlight } from '../../directives/highlight';

/**
 * CourseListComponent — Parent component that renders CourseCardComponents.
 */

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseCard, Highlight],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {

  // Step 25: Loading state
  isLoading = true;

  // Step 22: Array of 5 course objects
  // Step 27: Add gradeStatus to each course
  courses = [
    { id: 101, name: 'Introduction to Angular', code: 'ANG-101', credits: 3, gradeStatus: 'passed' },
    { id: 102, name: 'Advanced TypeScript', code: 'TS-201', credits: 4, gradeStatus: 'pending' },
    { id: 103, name: 'Data Structures & Algorithms', code: 'DSA-301', credits: 4, gradeStatus: 'failed' },
    { id: 104, name: 'Web Development Fundamentals', code: 'WEB-101', credits: 3, gradeStatus: 'passed' },
    { id: 105, name: 'Cloud Computing Essentials', code: 'CLD-201', credits: 3, gradeStatus: 'pending' },
  ];

  selectedCourseId: number | null = null;

  // Step 25: Hide loading message after 1.5s
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  // Step 26: trackBy improves performance by only re-rendering DOM elements whose underlying data has changed
  trackByCourseId(index: number, course: any): number {
    return course.id;
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }
}
