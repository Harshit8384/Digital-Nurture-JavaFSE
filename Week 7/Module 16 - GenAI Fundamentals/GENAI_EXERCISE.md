# Module 16 - GenAI Fundamentals Exercise

No hands-on file exists for this module in the repo — just a quiz and
SkillSpring courses. This gives you a practical prompt-engineering and
GitHub Copilot task list.

## Part A - Prompt Engineering practice
Using any LLM you have access to (GitHub Copilot Chat, Claude, ChatGPT,
etc.), write and record three prompts for the same coding task —
"Write a Java method that validates an email address using a regex" —
using each of these techniques. Record the prompt text and a summary of
the output in `PROMPT_EXERCISE_NOTES.md`:

1. **Zero-shot** — ask directly, no examples.
2. **Few-shot** — give 1-2 example input/output pairs before asking.
3. **Chain-of-thought** — ask the model to reason step-by-step before
   producing the final method.

Compare the three outputs: which was most correct? Which explained its
reasoning best? Which would you actually use in production code and why?

## Part B - Prompting best practices checklist
For one more prompt of your choosing (something from your own Week 1-6
exercises you'd like help refactoring), apply this checklist and note
which ones you used:
- [ ] Clear, specific instruction (not vague)
- [ ] Relevant context provided (existing code, constraints, tech stack)
- [ ] Desired output format specified (e.g. "just the method, no
      explanation" or "return valid JSON")
- [ ] Iterated on the prompt at least once based on the first result

## Part C - GitHub Copilot hands-on
1. Install the GitHub Copilot extension in VS Code and sign in.
2. Open any Java file from your Week 1-4 exercises.
3. Write a comment describing a new small method (e.g.
   `// method that reverses a string without using StringBuilder`) and
   let Copilot suggest the implementation. Accept and run it.
4. Ask Copilot Chat to generate a JUnit test for that method.
5. Ask Copilot Chat to review one of your existing files for potential
   bugs or improvements, and record what it flagged.

## Part D - Responsible AI reflection (`GENAI_NOTES.md`)
Answer briefly:
1. What's one risk of blindly accepting AI-generated code without
   review (think: security, licensing, or correctness)?
2. Why should you avoid pasting proprietary/confidential code into a
   public AI tool without checking your company's policy first?
3. Give one example from Part C where Copilot's suggestion was wrong or
   needed a fix — what did you change?

## Self-Evaluation
- [ ] Completed all 3 prompting styles for the email-validation task
- [ ] Applied the prompting checklist to a real refactor prompt
- [ ] Used Copilot inline suggestions to write a method
- [ ] Used Copilot Chat to generate a test and review code
- [ ] Completed `GENAI_NOTES.md`
