# Git Hands-On Lab 5 - Clean Up and Push Back to Remote Git

## Objectives
- Explain how to clean up and push back to remote Git

## Learning Outcomes
- Execute steps involving clean up and push back to remote Git

## Prerequisites
- Hands-on ID: "Git-T03-HOL_002" (completed in previous lab)
- GitHub account (free account, do not use cognizant credentials)

## Estimated Time
10 minutes

---

## Step 1: Verify if master is in clean state
```bash
git status
```
**Output:**
```
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

---

## Step 2: List out all the available branches
```bash
git branch -a
```
**Output:**
```
* main
  remotes/origin/main
```
> **Note:** Only the `main` branch exists. The `GitWork` branch was deleted in the previous HOL after merging.

---

## Step 3: Pull the remote git repository to the master
```bash
git pull origin main
```
**Output:**
```
From https://github.com/AshankNarayan/JAVA-FSE-NURTURE-5.0
 * branch            main       -> FETCH_HEAD
Already up to date.
```
> **Note:** This ensures the local repository is in sync with the remote before pushing any pending changes.

---

## Step 4: Push the changes pending from "Git-T03-HOL_002" to the remote repository
```bash
git push origin main
```
**Output:**
```
Everything up-to-date
```
> **Note:** All changes from the previous hands-on (Git-T03-HOL_002 — branching, merging, and conflict resolution) have been pushed to the remote repository.

---

## Step 5: Observe if the changes are reflected in the remote repository
```bash
git log --oneline -5
```
**Output:**
```
88d4e2a Add week-6/4. Git-HOL - Branching, Merging and Conflict Resolution hands-on
54b36d0 Add sample file for lab 3
a95e148 Add gitignore lab
810f095 feat: Add Week 6 GitDemo welcome.txt
2f05219 feat: Add Week 5 ReactJS-HOL-15 ticketraisingapp with forms and alert handling
```

**Verify remote URL:**
```bash
git remote -v
```
**Output:**
```
origin  https://github.com/AshankNarayan/JAVA-FSE-NURTURE-5.0.git (fetch)
origin  https://github.com/AshankNarayan/JAVA-FSE-NURTURE-5.0.git (push)
```

> **Verification:** You can also visit [https://github.com/AshankNarayan/JAVA-FSE-NURTURE-5.0](https://github.com/AshankNarayan/JAVA-FSE-NURTURE-5.0) in a browser to confirm all changes from the previous HOL are reflected in the remote repository.

---

## Summary
| Step | Command | Purpose |
|------|---------|---------|
| 1 | `git status` | Verify clean working tree |
| 2 | `git branch -a` | List all local and remote branches |
| 3 | `git pull origin main` | Sync local with remote |
| 4 | `git push origin main` | Push pending changes to remote |
| 5 | `git log --oneline` / Browser | Confirm changes on remote |
