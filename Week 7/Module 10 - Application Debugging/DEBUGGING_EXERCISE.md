# Module 10 - Application Debugging Exercise

**Target app:** `Module 09 - Angular/student-course-portal`
**Tools:** Chrome DevTools, VS Code debugger

## Learning objectives covered
- Debug Angular front-end using Chrome DevTools (DOM, Sources, breakpoints)
- Use VS Code's built-in Angular debugger (launch.json is already in the
  project under `.vscode/`)
- Inspect component state, services, and the NgRx store while the app runs

## Setup
```bash
cd "Module 09 - Angular/student-course-portal"
npm install
ng serve
```
Open `http://localhost:4200` in Chrome.

## Part A - Chrome DevTools
1. Open DevTools (F12) → **Elements** tab. Inspect the `<app-header>` and
   `<app-course-card>` DOM nodes. Note how Angular renders component
   selectors as custom elements.
2. Go to **Sources** → find `course.service.ts` (it will appear under
   `webpack://` in dev mode). Set a breakpoint inside the method that
   fetches courses. Reload the page and confirm the breakpoint hits.
3. While paused, use the **Scope** panel to inspect the `this` context of
   the service, and use the **Console** to evaluate `this.http` or any
   local variable.
4. Open the **Network** tab, filter by `Fetch/XHR`, and identify every
   HTTP call the app makes on load. Note the request/response for the
   course list call.

## Part B - VS Code Debugger
1. Open the project folder in VS Code.
2. Go to the Run & Debug panel, select the existing launch configuration
   (from `.vscode/launch.json`), and start it against `ng serve`.
3. Set a breakpoint directly in `course-list.component.ts` on the line
   that subscribes to the course observable.
4. Trigger navigation to the course list route and confirm VS Code stops
   on your breakpoint. Inspect variables in the **Variables** panel and
   add `courses$` to **Watch**.

## Part C - Bug hunt (do this without looking at the source first)
While exploring the running app, find and write down (in
`BUGS_FOUND.md`, template below) the root cause of each of these
observable symptoms:

1. The enrollment form's submit button doesn't disable while a request is
   in flight, even though a `loading.interceptor.ts` exists in the
   project — trace why the loading state isn't reaching the UI.
2. Navigating directly to a course detail URL that doesn't exist doesn't
   redirect to the "not found" page — inspect `app.routes.ts` and the
   route resolver/guard logic.
3. A custom pipe (`credit-label.pipe.ts`) is applied somewhere in a
   template — find where, and use the debugger to verify what input it
   receives vs. what it outputs.
4. The `auth.guard.ts` is supposed to block navigation when not
   authenticated — step through it with a breakpoint and confirm the
   condition it actually checks.
5. Pick one NgRx action (in `store/course/course.actions.ts`) and trace
   its full lifecycle: action dispatched → reducer → effect → selector →
   component, using breakpoints in each file.

## Deliverable: `BUGS_FOUND.md`
For each of the 5 items above, record:
```
### Item N
- File(s) involved:
- What I expected vs what I observed:
- Root cause (in your own words):
- How I'd fix it (1-2 sentences, no need to actually change the code):
```

## Self-Evaluation
- [ ] I can set a breakpoint in a `.ts` file from both Chrome DevTools and VS Code
- [ ] I can inspect a component's and a service's internal state while paused
- [ ] I can trace an HTTP request from the Network tab back to the calling service method
- [ ] I can follow one NgRx action through actions → reducer → effect → selector → component
- [ ] I completed `BUGS_FOUND.md` for all 5 items
