# Module 12 - DevOps and CI/CD Exercise

The handbook only links to reading material for this module — there's no
hands-on file in the repo. This exercise gives you something real to
build and run.

## Learning objectives covered
- Explain CI vs CD and why they matter
- Configure a CI pipeline with a popular tool (GitHub Actions)
- Run automated build/test/lint stages triggered by a git push

## Part A - Set up the pipeline
1. Push your own fork/copy of the `student-course-portal` project to
   GitHub (you should already have a personal repo from the Week 1-6
   exercise submission instructions in the main handbook).
2. Copy the `.github/workflows/ci.yml` file from this folder into the
   root of that repo (adjust the `working-directory` paths if your
   folder layout differs).
3. Commit and push. Go to the **Actions** tab on GitHub and watch the
   pipeline run.
4. Intentionally break a test (e.g. change an `expect(...)` assertion in
   `course-list.component.spec.ts` to something false) and push again.
   Confirm the pipeline goes red and blocks — this demonstrates CI
   catching regressions before merge.
5. Fix the test, push again, confirm it goes green.

## Part B - Add a second stage
Extend `ci.yml` (or write a new job) that only runs **after** the build
job succeeds, and simulates a "deploy" step — for example, echoing a
message like `Deploying build to staging...`. This demonstrates the CD
half of CI/CD (even without a real hosting target).

Hint: use `needs: build-and-test` on the new job so it only runs after
the first one passes.

## Part C - Written reflection (`CICD_NOTES.md`)
Answer briefly, in your own words:
1. What's the difference between Continuous Integration, Continuous
   Delivery, and Continuous Deployment?
2. What did the pipeline catch that you might have missed by testing
   manually?
3. Name two other CI/CD tools besides GitHub Actions and one situation
   where you might prefer them.

## Self-Evaluation
- [ ] Pipeline runs automatically on push
- [ ] Pipeline fails when a test is broken
- [ ] Pipeline passes after the fix
- [ ] Added a second "deploy" stage gated on the first job succeeding
- [ ] Completed `CICD_NOTES.md`
