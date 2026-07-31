# Git Hands-On Lab 4 - Branching, Merging & Conflict Resolution

## Prerequisites
```bash
git init
git checkout -b master
echo "initial" > initial.txt
git add .
git commit -m "Initial commit"
```

---

## Step 1: Verify if master is in clean state
```bash
git status
```
**Output:**
```
On branch master
nothing to commit, working tree clean
```

---

## Step 2: Create a branch "GitWork". Add a file "hello.xml"
```bash
git checkout -b GitWork
echo '<?xml version="1.0" encoding="UTF-8"?><greeting><message>Hello from GitWork branch!</message></greeting>' > hello.xml
git add hello.xml
```
**Output:**
```
Switched to a new branch 'GitWork'
```

---

## Step 3: Update the content of "hello.xml" and observe the status
```bash
echo '<?xml version="1.0" encoding="UTF-8"?><greeting><message>Hello World - Updated content from GitWork branch!</message><author>Developer</author></greeting>' > hello.xml
git status
```
**Output:**
```
On branch GitWork
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   hello.xml

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   hello.xml
```

---

## Step 4: Commit the changes to reflect in the branch
```bash
git add hello.xml
git commit -m "Add and update hello.xml on GitWork branch"
```
**Output:**
```
[GitWork 8b69ad0] Add and update hello.xml on GitWork branch
 1 file changed, 1 insertion(+)
 create mode 100644 hello.xml
```

---

## Step 5: Switch to master
```bash
git checkout master
```
**Output:**
```
Switched to branch 'master'
```

---

## Step 6: Add a file "hello.xml" to master with different content
```bash
echo '<?xml version="1.0" encoding="UTF-8"?><greeting><message>Hello World - Content from Master branch!</message><version>1.0</version></greeting>' > hello.xml
git add hello.xml
```

---

## Step 7: Commit the changes to the master
```bash
git commit -m "Add hello.xml on master branch"
```
**Output:**
```
[master 458477e] Add hello.xml on master branch
 1 file changed, 1 insertion(+)
 create mode 100644 hello.xml
```

---

## Step 8: Observe the log
```bash
git log --oneline --graph --decorate --all
```
**Output:**
```
* 458477e (HEAD -> master) Add hello.xml on master branch
| * 8b69ad0 (GitWork) Add and update hello.xml on GitWork branch
|/
* b4d8967 Initial commit
```

---

## Step 9: Check the differences with Git diff tool
```bash
git diff GitWork
```
**Output:**
```diff
diff --git a/hello.xml b/hello.xml
index 6d1d31c..b68acca 100644
--- a/hello.xml
+++ b/hello.xml
@@ -1 +1 @@
-<?xml version="1.0" encoding="UTF-8"?><greeting><message>Hello World - Updated content from GitWork branch!</message><author>Developer</author></greeting>
+<?xml version="1.0" encoding="UTF-8"?><greeting><message>Hello World - Content from Master branch!</message><version>1.0</version></greeting>
```

---

## Step 10: Use P4Merge tool for better visualization
```bash
git difftool GitWork
```
> **Note:** This command opens P4Merge (if configured as the difftool) to provide a visual side-by-side comparison of all differences between master and GitWork branch.

**P4Merge Configuration (if not already set):**
```bash
git config diff.tool p4merge
git config difftool.p4merge.path "C:/Program Files/Perforce/p4merge.exe"
git config difftool.prompt false
```

---

## Step 11: Merge the branch to master
```bash
git merge GitWork
```
**Output:**
```
Auto-merging hello.xml
CONFLICT (add/add): Merge conflict in hello.xml
Automatic merge failed; fix conflicts and then commit the result.
```

---

## Step 12: Observe the git markup (conflict markers)
```bash
cat hello.xml
```
**Output:**
```
<<<<<<< HEAD
<?xml version="1.0" encoding="UTF-8"?><greeting><message>Hello World - Content from Master branch!</message><version>1.0</version></greeting>
=======
<?xml version="1.0" encoding="UTF-8"?><greeting><message>Hello World - Updated content from GitWork branch!</message><author>Developer</author></greeting>
>>>>>>> GitWork
```

---

## Step 13: Use 3-way merge tool to resolve the conflict
```bash
git mergetool
```
> **Note:** This opens P4Merge (if configured as the mergetool) with a 3-way view: LOCAL (master), REMOTE (GitWork), and BASE (common ancestor). Resolve by combining both changes.

**Resolved hello.xml content:**
```xml
<?xml version="1.0" encoding="UTF-8"?><greeting><message>Hello World - Merged content from Master and GitWork!</message><author>Developer</author><version>1.0</version></greeting>
```

**P4Merge Mergetool Configuration (if not already set):**
```bash
git config merge.tool p4merge
git config mergetool.p4merge.path "C:/Program Files/Perforce/p4merge.exe"
git config mergetool.prompt false
```

---

## Step 14: Commit the changes to master after resolving conflict
```bash
git add hello.xml
git commit -m "Merge GitWork into master - resolved conflict in hello.xml"
```
**Output:**
```
[master 80bc222] Merge GitWork into master - resolved conflict in hello.xml
```

---

## Step 15: Observe git status and add backup file to .gitignore
```bash
git status
```
**Output:**
```
On branch master
nothing to commit, working tree clean
```

```bash
echo "*.bak" >> .gitignore
echo "*.orig" >> .gitignore
echo "*.backup" >> .gitignore
echo "*~" >> .gitignore
```

---

## Step 16: Commit the .gitignore changes
```bash
git add .gitignore
git commit -m "Add .gitignore to exclude backup files"
```
**Output:**
```
[master 5d3e864] Add .gitignore to exclude backup files
 1 file changed, 4 insertions(+)
 create mode 100644 .gitignore
```

---

## Step 17: List out all available branches
```bash
git branch -a
```
**Output:**
```
  GitWork
* master
```

---

## Step 18: Delete the branch which was merged to master
```bash
git branch -d GitWork
```
**Output:**
```
Deleted branch GitWork (was 8b69ad0).
```

---

## Step 19: Observe the log
```bash
git log --oneline --graph --decorate
```
**Output:**
```
* 5d3e864 (HEAD -> master) Add .gitignore to exclude backup files
*   80bc222 Merge GitWork into master - resolved conflict in hello.xml
|\
| * 8b69ad0 Add and update hello.xml on GitWork branch
* | 458477e Add hello.xml on master branch
|/
* b4d8967 Initial commit
```
