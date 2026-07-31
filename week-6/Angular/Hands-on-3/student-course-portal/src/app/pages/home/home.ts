import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * STEP 15 — Binding Types Explained:
 *
 * [property] binding (e.g., [disabled]="!isPortalActive"):
 *   - ONE-WAY binding: Component → DOM.
 *   - Data flows FROM the component class TO the template/DOM.
 *   - The DOM property is updated whenever the component property changes,
 *     but changes in the DOM do NOT flow back to the component.
 *
 * [(ngModel)] two-way binding (e.g., [(ngModel)]="searchTerm"):
 *   - TWO-WAY binding: DOM ↔ Component.
 *   - Data flows in BOTH directions: from component to DOM AND from DOM back to component.
 *   - It is shorthand for: [ngModel]="searchTerm" (ngModelChange)="searchTerm = $event"
 *   - When the user types in an input, the component property is updated immediately,
 *     and when the component property changes programmatically, the input value updates too.
 *   - Requires FormsModule to be imported.
 */

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {

  // Step 11: String interpolation property
  portalName = 'Student Course Portal';

  // Step 12: Property binding — controls button disabled state
  isPortalActive = true;

  // Step 13: Event binding — message displayed on button click
  message = '';

  // Step 14: Two-way binding with ngModel
  searchTerm = '';

  // Step 16: Simulated course count loaded during ngOnInit
  availableCourses = 0;

  // Step 16: ngOnInit — lifecycle hook that fires once after inputs are set
  ngOnInit(): void {
    // Simulate fetching course count (in a real app, this would be an HTTP call)
    this.availableCourses = 12;
    console.log('HomeComponent initialised — courses loaded');
  }

  // Step 17: ngOnDestroy — lifecycle hook that fires when the component is destroyed
  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
    // In a real app, you would unsubscribe from Observables and clear timers here
    // to prevent memory leaks in long-running SPAs
  }

  // Step 13: Method triggered by event binding (click)
  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }
}
