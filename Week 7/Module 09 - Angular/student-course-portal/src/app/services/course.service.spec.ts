import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Web Dev', code: 'CS201', credits: 3, gradeStatus: 'passed' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch courses list via HTTP GET request', () => {
    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should handle HTTP 500 error gracefully', () => {
    service.getCourses().subscribe({
      next: (courses) => {
        expect(courses).toBeDefined();
      }
    });

    // Handle initial request and retries caused by retry(2)
    const req1 = httpMock.expectOne('http://localhost:3000/courses');
    req1.flush('Server Error', { status: 500, statusText: 'Server Error' });

    const req2 = httpMock.expectOne('http://localhost:3000/courses');
    req2.flush('Server Error', { status: 500, statusText: 'Server Error' });

    const req3 = httpMock.expectOne('http://localhost:3000/courses');
    req3.flush('Server Error', { status: 500, statusText: 'Server Error' });
  });
});
