import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, CreditLabelPipe],
  template: `
    <div class="detail-container" *ngIf="course; else notFound">
      <a routerLink="/courses" class="back-link">&larr; Back to Courses List</a>
      <div class="detail-card">
        <h2>{{ course.name }} ({{ course.code }})</h2>
        <div class="detail-row">
          <strong>Course ID:</strong> <span>{{ course.id }}</span>
        </div>
        <div class="detail-row">
          <strong>Credits:</strong> <span>{{ course.credits | creditLabel }}</span>
        </div>
        <div class="detail-row">
          <strong>Grade Status:</strong>
          <span class="status-badge" [ngClass]="course.gradeStatus">{{ course.gradeStatus | titlecase }}</span>
        </div>
        <p class="syllabus">
          Detailed Course Overview: This course provides in-depth theoretical foundations and hands-on laboratory exercises designed for computer science and engineering students.
        </p>
      </div>
    </div>

    <ng-template #notFound>
      <div class="not-found-banner">
        <h3>Course Not Found</h3>
        <p>No course details found matching ID: {{ courseId }}</p>
        <a routerLink="/courses" class="btn-primary">Return to Courses</a>
      </div>
    </ng-template>
  `,
  styles: [`
    .detail-container { max-width: 700px; margin: 2rem auto; }
    .back-link { display: inline-block; margin-bottom: 1rem; color: #2563eb; text-decoration: none; font-weight: 500; }
    .detail-card { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
    .detail-row { margin-bottom: 0.75rem; font-size: 1rem; color: #334155; }
    .status-badge { padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 600; text-transform: uppercase; font-size: 0.8rem; margin-left: 0.5rem; }
    .status-badge.passed { background-color: #dcfce7; color: #166534; }
    .status-badge.failed { background-color: #fee2e2; color: #991b1b; }
    .status-badge.pending { background-color: #f3f4f6; color: #4b5563; }
    .syllabus { margin-top: 1.5rem; color: #475569; line-height: 1.6; }
    .not-found-banner { text-align: center; padding: 3rem; background: #fff1f2; border-radius: 8px; }
  `]
})
export class CourseDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);

  public courseId: string | null = null;
  public course: Course | undefined;

  ngOnInit(): void {
    // Hands-On 7 Task 1 Step 69: Read route parameter snapshot
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.courseService.getCourseById(Number(this.courseId)).subscribe(data => {
        this.course = data;
      });
    }
  }
}
