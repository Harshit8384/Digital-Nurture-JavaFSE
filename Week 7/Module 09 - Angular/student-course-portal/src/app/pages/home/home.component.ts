import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { NotificationComponent } from '../../components/notification/notification.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  // Hands-On 2 Task 1: Interpolation
  public portalName = 'Student Course Portal';
  public isPortalActive = true;
  public message = '';
  public searchTerm = '';
  public availableCoursesCount = 12;

  private courseService = inject(CourseService);

  // Hands-On 2 Task 1 Step 15: Code Comment Explaining Binding Types:
  // [property] (One-Way Binding, Component -> DOM): Data flows exclusively from component class property to the target DOM element property.
  // [(ngModel)] (Two-Way Binding, DOM <-> Component): Data is synchronized bidirectionally between component class property and DOM input state.

  // Hands-On 2 Task 2 Step 16: Lifecycle hook ngOnInit
  ngOnInit(): void {
    console.log('HomeComponent initialised — courses loaded');
    this.courseService.getCourses().subscribe(courses => {
      this.availableCoursesCount = courses.length;
    });
  }

  // Hands-On 2 Task 2 Step 17: Lifecycle hook ngOnDestroy
  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }
}
