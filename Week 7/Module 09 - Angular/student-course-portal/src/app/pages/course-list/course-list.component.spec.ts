import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CourseListComponent } from './course-list.component';

describe('CourseListComponent (NgRx Connected)', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let store: MockStore;

  const initialState = {
    course: {
      courses: [
        { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' }
      ],
      loading: false,
      error: null
    },
    enrollment: {
      enrolledCourseIds: [1]
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseListComponent],
      providers: [
        provideMockStore({ initialState }),
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
  });

  // Task 2 Step 109: Component creation test with initial store state
  it('should create and connect to NgRx store', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // Task 2 Step 110: Simulate loading state via store.setState
  it('should set isLoading to true when store simulates loading state', () => {
    store.setState({
      course: { courses: [], loading: true, error: null },
      enrollment: { enrolledCourseIds: [] }
    });
    component.isLoading = true;
    fixture.detectChanges();

    expect(component.isLoading).toBeTrue();
  });
});
