import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../services/enrollment.service';
import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, CreditLabelPipe],
  template: `
    <div class="profile-container">
      <h2>Student Profile</h2>
      <div class="profile-card">
        <div class="avatar-circle">AJ</div>
        <div class="info-group">
          <h3>Alex Johnson</h3>
          <p>Email: alex.johnson&#64;university.edu</p>
          <p>Program: .NET Full Stack Engineering Track</p>
          <p>Student ID: STU-2026-9042</p>
        </div>
      </div>

      <h3 class="section-title">My Enrolled Courses</h3>
      <!-- Hands-On 6 Task 2 Step 66: Display list of enrolled courses from EnrollmentService -->
      <div *ngIf="enrolledCourses.length > 0; else noEnrolled" class="enrolled-grid">
        <div *ngFor="let course of enrolledCourses" class="enrolled-item-card">
          <h4>{{ course.name }}</h4>
          <p>Code: {{ course.code }} | Credits: {{ course.credits | creditLabel }}</p>
          <span class="badge" [ngClass]="course.gradeStatus">{{ course.gradeStatus | uppercase }}</span>
        </div>
      </div>

      <ng-template #noEnrolled>
        <div class="empty-enrolled">
          <p>You have not enrolled in any courses yet.</p>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .profile-container { max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
    .profile-card { display: flex; gap: 1.5rem; background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.08); align-items: center; margin-bottom: 2rem; }
    .avatar-circle { width: 70px; height: 70px; border-radius: 50%; background: #2563eb; color: white; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: bold; }
    .info-group h3 { margin: 0 0 0.25rem 0; color: #1e293b; }
    .info-group p { margin: 0.2rem 0; color: #64748b; font-size: 0.9rem; }
    .section-title { color: #1e293b; margin-bottom: 1rem; }
    .enrolled-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1rem; }
    .enrolled-item-card { background: white; padding: 1rem; border-radius: 6px; border-left: 4px solid #3b82f6; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .enrolled-item-card h4 { margin: 0 0 0.5rem 0; color: #1e293b; font-size: 1rem; }
    .enrolled-item-card p { margin: 0 0 0.5rem 0; font-size: 0.85rem; color: #64748b; }
    .badge { padding: 0.15rem 0.4rem; font-size: 0.7rem; border-radius: 3px; font-weight: bold; }
    .badge.passed { background: #dcfce7; color: #166534; }
    .badge.failed { background: #fee2e2; color: #991b1b; }
    .badge.pending { background: #f3f4f6; color: #4b5563; }
    .empty-enrolled { background: #f8fafc; padding: 2rem; text-align: center; color: #64748b; border-radius: 6px; }
  `]
})
export class StudentProfileComponent implements OnInit {
  private enrollmentService = inject(EnrollmentService);
  public enrolledCourses: Course[] = [];

  ngOnInit(): void {
    this.enrolledCourses = this.enrollmentService.getEnrolledCourses();
  }
}
