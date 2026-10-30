---
name: write-intent
description: Capture an idea, ticket, user feedback, or incident as an intent.md proto-spec in the originator's own terms. Use when starting a new feature, converting a ticket or incident into work, or when asked to "capture", "brainstorm", or "write up" an idea.
---
# Write intent.md

Intent is captured once, in the originator's words, so the next stage can act on it. It says what is wanted, why, and under which constraints. It does **not** choose technology.

1. Ask what they can't do today, who is affected, what better looks like, what is out of scope. Max 5 questions at a time, each with your recommended default.
2. Synthesize pain points from whatever sources are given (tickets, feedback, logs). Quote facts; don't invent numbers.
3. Write `spec/features/NNN-slug/intent.md` from the template: Problem, Proposed outcome, Affected users and systems, Constraints, Success signal, Open questions, Source (origin + ticket ID).
4. Show it; the originator corrects anything misunderstood. Only then is it "accepted".

Rules: plain language, under one page, one problem per intent (split otherwise), unknowns go to Open questions.
