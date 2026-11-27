---
name: ContinuationPromt
version: 1.1.0
description: Package the whole conversation thread into one copy-pasteable handoff block so a fresh thread can continue it with no prior context. Use when the user types /ContinuationPromt, or says "context transfer", "hand this to a new chat", or "summarise so I can continue elsewhere".
trigger: /ContinuationPromt
retention_class: review
---

# Purpose

Produce a single text block that carries all key information from the current
conversation thread, so Pepe can paste it into a new thread and continue the
work without losing anything.

The block is a *context package*, not a summary. Summaries compress for a
reader who already has context. This block must stand alone: the receiving
thread has nothing but this text.

# When to Use

- Thread is long, slow, or near its context limit.
- Pepe says "context transfer", "hand this to a new chat", "summarise so I can
  continue elsewhere".
- Work must continue in a different model, tool, or machine.

# Modes

| Mode | Invocation | Output |
|------|-----------|--------|
| **full** (default) | `/ContinuationPromt` | The complete ten-section block below. Use when the work has real state: files touched, decisions taken, commands run. |
| **brief** | `/ContinuationPromt brief` | A short two-part block — `Context Summary` of 3–5 sentences plus `Continuation Prompt` of 1–2 sentences. Use to restart a light thread, or when the receiving thread will have the same files and tools to hand and only needs orientation. |

When Pepe does not name a mode, use **full**. Brief is lossy by design: it
drops verbatim identifiers, reasoning, and dead ends. Never choose brief for a
thread whose state took work to establish.

# Related Skills

- `handoff` — agent-to-agent coordination; writes a governed vault artifact
  with urgency and receiver fields. Use when another *agent* picks up the work.
- `ContinuationPromt` — thread-to-thread continuation for Pepe himself; output is
  chat text, written to the vault only if Pepe asks.

# Binding Output Rules

Both modes:

1. **One block.** The entire response is a single fenced code block. Nothing
   before it, nothing after it. No preamble, no commentary, no closing remark.
2. **Self-contained.** Assume the receiving thread knows nothing — not the
   project, not the vault, not the file paths, not the people, not the acronyms.
   Expand every abbreviation on first use.
3. **Verbatim where verbatim matters.** Exact file paths, commands, IDs,
   serials, error strings, numbers, units, URLs, versions. Never paraphrase an
   identifier and never reconstruct one from memory — copy it.
4. **Truth over tidiness.** No invented detail. Mark each uncertain item as
   `UNVERIFIED` or `INFERENCE`. Omission is better than fabrication.
5. **Granularity over brevity** (full mode). Length is not a cost here. If a
   detail would cost the new thread a round trip to rediscover, include it.
   In brief mode, brevity wins — but rule 4 still binds, and an uncertain claim
   is dropped rather than smoothed.
6. **No secrets.** Never copy passwords, tokens, API keys, or private keys into
   the block. Write `[secret withheld — ask Pepe]` and name where it lives.
7. **Caveman mode does not apply.** The block is persisted context for another
   model. Write it in plain, complete English.
8. **Plain language.** Short sentences. One idea per sentence. The block is
   read under pressure, often on a phone. Readability is a requirement, not a
   courtesy.

# Workflow

1. **Re-read the thread** from the first message. Do not work from your own
   earlier summaries — they already dropped detail. If the thread is too long
   to re-read, say so inside the block and mark the thin sections
   `UNVERIFIED`; do not silently emit a partial package as if it were whole.
2. **Harvest** into the sections below. Prefer over-collecting; prune at the
   end only if an item is genuinely irrelevant.
3. **Verify identifiers**: for every path, command, or figure, confirm it
   against the thread or the filesystem. Flag what you could not confirm.
4. **Check the secret rule** before emitting.
5. **Emit** the single block.

# Full Block Structure

```
=== CONTEXT TRANSFER ===
Source thread: <date, machine, project>
Generated: <YYYY-MM-DD HH:MM>
Mode: full

## 1. SITUATION
Who the user is, what system or project this is, and what is being built or
fixed. Enough that a cold model can orient in one read.

## 2. ORIGIN
Where this started: the original problem, goal, or idea, in the form it was
first raised. Include the trigger — what went wrong, or what was wanted — and
anything the starting framing got wrong that was later corrected. Without
origin, the new thread optimises for the current symptom and loses the aim.

## 3. OBJECTIVE
The ultimate aim, in one or two sentences. What "finished" looks like. This is
the destination, not the current task list — keep it separate from section 4 so
the new thread can tell progress from purpose.

## 4. TASKS AND STATUS
- Task list with status: DONE / IN PROGRESS / NOT STARTED / ABANDONED.
- For ABANDONED, say why, so it is not revived by accident.

## 5. DECISIONS AND REASONING
For each decision: what was chosen, what was rejected, and WHY. Include
constraints and rules that were imposed during the thread. Reasoning matters
most — without it the new thread re-opens settled questions.

## 6. PROGRESS, BLOCKERS, OPEN QUESTIONS
- What is verified working, and how it was verified (command run, output seen).
- What failed, with the exact error text.
- Blockers, with what would unblock them.
- Questions still awaiting Pepe's answer.

## 7. ARTEFACTS AND REFERENCES
Every important concrete thing, grouped:
- Files and paths (absolute), with one line on each file's role and state.
- Commands and scripts, verbatim, with where they are run.
- Tools, services, MCP servers, skills, hosts, IPs, ports.
- Figures, numbers, IDs, serials, versions, dates.
- External references: URLs, repositories, tickets, documents, prior threads.

## 8. WHERE WE LEFT OFF
The last action taken and its result. The exact point of interruption.

## 9. NEXT STEPS
Ordered, specific, each actionable without clarification. Name the file or
command for each. Mark any step that needs Pepe's approval first.

## 10. OTHER KEY DETAILS
Conventions, preferences, naming rules, tone instructions, governance gates,
gotchas, dead ends already tried (so they are not retried).

## OPENING INSTRUCTION
One or two sentences addressed to the receiving model, telling it what to do
first. Imperative. Names the first concrete action from section 9 and any gate
on it. Example shape: "Start by running <command> to confirm <state>, then
<action>. Do not <X> without Pepe's approval."

=== END CONTEXT TRANSFER ===
```

Drop a section only if it is genuinely empty. Say `None.` rather than deleting
the heading, so the receiving thread knows it was considered.

# Brief Block Structure

```
=== CONTEXT TRANSFER (BRIEF) ===
Source thread: <date, machine, project>
Generated: <YYYY-MM-DD HH:MM>
Mode: brief

Context Summary: <3–5 sentences, plain language. Cover the objective, where
this started, what has been done, and what is open. Name real files and
commands verbatim where one word does the work of a paragraph.>

Continuation Prompt: <1–2 sentences, imperative, addressed to the receiving
model. The first concrete action and any approval gate on it.>

=== END CONTEXT TRANSFER ===
```

# Quality Gate

Before emitting, confirm all of:

- [ ] A model with zero prior context could resume from this block alone.
- [ ] Every path, command, and figure is verbatim, not paraphrased.
- [ ] Objective and origin are both present, and distinct from the task list.
- [ ] Every decision carries its reasoning.
- [ ] Dead ends and failed approaches are recorded.
- [ ] Uncertainty is marked, not smoothed over.
- [ ] The block ends with an instruction, not just a list of facts.
- [ ] No secrets in the block.
- [ ] Plain language; sentences short enough to read on a phone.
- [ ] Response is one block, nothing outside it.

# Output

One fenced code block. No surrounding text.
