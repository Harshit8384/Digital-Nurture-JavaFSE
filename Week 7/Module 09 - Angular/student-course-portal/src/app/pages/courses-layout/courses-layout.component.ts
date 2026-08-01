import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-courses-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="courses-layout-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .courses-layout-container {
      max-width: 1100px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
  `]
})
export class CoursesLayoutComponent {}
