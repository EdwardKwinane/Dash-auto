# Agent evals

Regression tests for the **agent configuration** (AGENTS.md, skills, agents, plugin, commands). When a model or any of those files changes, the evals say whether the agent still does the work to the same standard.

- A case = a prompt + a shell `check` that defines acceptable (tests pass, file exists, grep finds/doesn't find something).
- Each case runs in a **throwaway git worktree**, so your working tree is never touched.
- Start with 10–20 real tasks from recent work. **Every production incident adds a case.**
- Cases that every model passes stop discriminating; retire them and add harder ones from monitoring.

## Run
```bash
evals/run.sh              # all cases
evals/run.sh fix-bug      # cases whose filename contains "fix-bug"
```
Needs: `jq`, `git`, and the `opencode` CLI authenticated for a model. Non-interactive mode is used (`opencode run`); check `opencode run --help` for your version's flags.

## Case format (`evals/cases/*.json`)
```json
{ "name": "...", "prompt": "...", "check": "bash command; exit 0 = pass", "timeout_s": 600 }
```
