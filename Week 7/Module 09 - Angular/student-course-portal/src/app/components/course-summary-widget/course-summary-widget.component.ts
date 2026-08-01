import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="summary-widget">
      <h4>Course Summary Widget (Shared Singleton Service)</h4>
      <p>Total Courses Count: <strong>{{ courseCount }}</strong></p>
    </div>
  `,
  styles: [`
    .summary-widget {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 0.75rem 1rem;
      margin-bottom: 1rem;
    }
    h4 { margin: 0 0 0.5rem 0; color: #334155; }
    p { margin: 0; font-size: 0.9rem; color: #475569; }
  `]
})
export class CourseSummaryWidgetComponent implements OnInit {
  public courseService = inject(CourseService);
  public courseCount = 0;

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.courseCount = courses.length;
    });
  }
}
