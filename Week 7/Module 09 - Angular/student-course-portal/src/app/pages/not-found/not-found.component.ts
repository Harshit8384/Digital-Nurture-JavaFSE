import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The requested route does not exist in Student Course Portal.</p>
      <a routerLink="/" class="btn-home">Return to Home</a>
    </div>
  `,
  styles: [`
    .not-found-container { text-align: center; padding: 4rem 1rem; }
    h1 { font-size: 5rem; color: #ef4444; margin: 0; }
    h2 { color: #1e293b; margin-top: 0.5rem; }
    p { color: #64748b; margin-bottom: 2rem; }
    .btn-home { background-color: #2563eb; color: white; padding: 0.6rem 1.2rem; border-radius: 6px; text-decoration: none; font-weight: 600; }
  `]
})
export class NotFoundComponent {}
