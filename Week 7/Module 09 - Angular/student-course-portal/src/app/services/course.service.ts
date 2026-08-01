import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, tap, retry, catchError, switchMap } from 'rxjs/operators';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  private initialCourses: Course[] = [
    { id: 1, name: 'Data Structures & Algorithms', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Web Development with Angular', code: 'CS201', credits: 3, gradeStatus: 'passed' },
    { id: 3, name: 'Database Management Systems', code: 'CS301', credits: 4, gradeStatus: 'pending' },
    { id: 4, name: 'Software Engineering Principles', code: 'CS401', credits: 3, gradeStatus: 'failed' },
    { id: 5, name: 'Cloud Computing & DevOps', code: 'CS501', credits: 3, gradeStatus: 'pending' }
  ];

  constructor(private http: HttpClient) {}

  // Hands-On 8 Task 1 & Task 2: HttpClient GET with RxJS operators (map, tap, retry, catchError)
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      // RxJS map operator: transforms/filters course list before reaching component
      map(courses => courses.filter(c => c.credits > 0)),
      // RxJS tap operator: used for side-effects (logging).
      // Note: tap is preferred over side-effects inside map because tap does not alter the emitted data values.
      tap(courses => console.log('Courses loaded via HttpClient:', courses.length)),
      // RxJS retry strategy: retries failed HTTP requests up to 2 times before propagating error
      retry(2),
      catchError(err => {
        console.error('HTTP Error in CourseService.getCourses:', err);
        // Fallback to local array if JSON Server is not running
        return of(this.initialCourses);
      })
    );
  }

  getCourseById(id: number): Observable<Course | undefined> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      retry(2),
      catchError(() => {
        const found = this.initialCourses.find(c => c.id === Number(id));
        return of(found);
      })
    );
  }

  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      catchError(() => {
        const newCourse: Course = { ...course, id: Date.now() };
        this.initialCourses.push(newCourse);
        return of(newCourse);
      })
    );
  }

  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course).pipe(
      catchError(() => of(course))
    );
  }

  deleteCourse(id: number): Observable<Course | null> {
    return this.http.delete<Course>(`${this.apiUrl}/${id}`).pipe(
      catchError(() => {
        this.initialCourses = this.initialCourses.filter(c => c.id !== id);
        return of(null);
      })
    );
  }

  // Synchronous getter helper for components/services requiring synchronous array view
  getInitialCoursesSync(): Course[] {
    return [...this.initialCourses];
  }

  addCourse(course: Course): void {
    this.initialCourses.push(course);
  }
}
