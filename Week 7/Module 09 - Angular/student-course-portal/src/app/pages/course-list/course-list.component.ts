import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { CourseSummaryWidgetComponent } from '../../components/course-summary-widget/course-summary-widget.component';
import * as CourseActions from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCardComponent, CourseSummaryWidgetComponent],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  public isLoading = true;
  public errorMessage: string | null = null;
  public courses: Course[] = [];
  public selectedCourseId: number | null = null;
  public searchTerm = '';

  private store = inject(Store);
  private courseService = inject(CourseService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public courses$: Observable<Course[]> = this.store.select(selectAllCourses);
  public storeLoading$: Observable<boolean> = this.store.select(selectCoursesLoading);
  public storeError$: Observable<string | null> = this.store.select(selectCoursesError);

  ngOnInit(): void {
    // Read query parameter from route snapshot
    const querySearch = this.route.snapshot.queryParamMap.get('search');
    if (querySearch) {
      this.searchTerm = querySearch;
    }

    // Dispatch NgRx Action for state management
    this.store.dispatch(CourseActions.loadCourses());

    // Service fetch fallback & 1.5s simulated loading timer (Hands-On 3 Task 1)
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        if (this.searchTerm) {
          this.filterCourses();
        }
      },
      error: (err) => {
        this.errorMessage = err.message || 'Failed to load courses. Please try again.';
      },
      complete: () => {
        setTimeout(() => {
          this.isLoading = false;
        }, 1500);
      }
    });
  }

  // Hands-On 3 Task 1 Step 26: trackBy method for *ngFor performance optimization
  // Explanatory comment: trackBy enables Angular to identify which items in an array have changed, added, or removed,
  // preventing costly DOM re-rendering of the entire list when array items update.
  trackByCourseId(index: number, course: Course): number {
    return course ? course.id : index;
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }

  onSearchChange(): void {
    // Hands-On 7 Task 1 Step 71: Update URL query parameters on search input
    this.router.navigate(['/courses'], {
      queryParams: { search: this.searchTerm || null },
      queryParamsHandling: 'merge'
    });
    this.filterCourses();
  }

  private filterCourses(): void {
    if (!this.searchTerm.trim()) {
      this.courses = this.courseService.getInitialCoursesSync();
      return;
    }
    const term = this.searchTerm.toLowerCase();
    this.courses = this.courseService.getInitialCoursesSync().filter(c =>
      c.name.toLowerCase().includes(term) || c.code.toLowerCase().includes(term)
    );
  }

  onCardClick(courseId: number): void {
    // Hands-On 7 Task 1 Step 70: Navigate to detail view
    this.router.navigate(['/courses', courseId]);
  }
}
