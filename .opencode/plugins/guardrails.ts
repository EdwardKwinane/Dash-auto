import type { Plugin } from "@opencode-ai/plugin"
import { existsSync, readFileSync } from "node:fs"
import { join, relative, resolve } from "node:path"

/**
 * Deterministic guardrails (hooks). Skills/AGENTS.md are advisory; this is enforced.
 * NOTE: a speed bump against mistakes, not a security sandbox. For isolation, run in a container
 * without production credentials.
 */

const globToRegex = (glob: string): RegExp => {
  const esc = glob
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replace(/\*\*\//g, "\u0001")
    .replace(/\*\*/g, "\u0000")
    .replace(/\*/g, "[^/]*")
    .replace(/\u0001/g, "(?:.*/)?")
    .replace(/\u0000/g, ".*")
  return new RegExp(`(^|/)${esc}$`)
}

const TEST_FILE =
  /(^|\/)(tests?|__tests__|e2e)\/|\.(test|spec)\.[cm]?[jt]sx?$|(^|\/)test_[^/]+\.py$|_test\.(py|go)$/

export const Guardrails: Plugin = async ({ directory }) => {
  const protectedFile = join(directory, "spec/protected-paths.txt")
  const fixFlag = join(directory, ".opencode/state/fix-mode")

  const loadRules = () => {
    if (!existsSync(protectedFile)) return { deny: [] as RegExp[], allow: [] as RegExp[] }
    const lines = readFileSync(protectedFile, "utf8")
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"))
    return {
      deny: lines.filter((l) => !l.startsWith("!")).map(globToRegex),
      allow: lines.filter((l) => l.startsWith("!")).map((l) => globToRegex(l.slice(1))),
    }
  }

  return {
    "tool.execute.before": async (input: any, output: any) => {
      const args = output?.args ?? {}
      const raw: string | undefined = args.filePath ?? args.path
      const rel = raw ? relative(directory, resolve(directory, raw)).replace(/\\/g, "/") : undefined

      // 1. Never read secrets (but .env.example is fine)
      if (input.tool === "read" && rel && /(^|\/)\.env(\.|$)/.test(rel) && !rel.endsWith(".env.example")) {
        throw new Error("Guardrail: reading .env files is blocked. Use .env.example for variable names.")
      }

      // 2. Protected paths and fix-mode test lock apply to writes
      if (["edit", "write", "patch", "multiedit"].includes(input.tool) && rel) {
        const { deny, allow } = loadRules()
        if (deny.some((r) => r.test(rel)) && !allow.some((r) => r.test(rel))) {
          throw new Error(`Guardrail: "${rel}" is protected (spec/protected-paths.txt). Ask the human to change it.`)
        }
        if (existsSync(fixFlag) && TEST_FILE.test(rel)) {
          throw new Error(
            `Guardrail: fix-mode is ON, test files are locked ("${rel}"). Fix the code, not the test. ` +
              `If the test is wrong, stop and ask the human to run scripts/fix-mode.sh off.`,
          )
        }
      }

      // 3. Shell commands
      if (input.tool === "bash") {
        const cmd: string = String(args.command ?? "")
        if (/\bcat\b[^|;&]*\.env(\s|$|\.(?!example))|\b(printenv|env)\b\s*($|[|;&])/.test(cmd)) {
          throw new Error("Guardrail: dumping secrets/environment is blocked.")
        }
        if (/git\s+push\b.*(--force|-f\b)/.test(cmd) || /git\s+reset\s+--hard/.test(cmd)) {
          throw new Error("Guardrail: force-push / hard reset requires explicit human action.")
        }
        if (/\bscripts\/fix-mode\.sh\s+off\b/.test(cmd) || /rm\s+[^;&|]*\.opencode\/state\/fix-mode/.test(cmd)) {
          throw new Error("Guardrail: only the human may turn fix-mode off.")
        }
        const looksLikeProdDeploy = /\b(deploy|release|publish|apply|migrate)\b/.test(cmd) && /\b(prod|production|live)\b/.test(cmd)
        if (looksLikeProdDeploy && !process.env.RELEASE_APPROVAL) {
          throw new Error(
            "Guardrail: production deploys need a human release authorization. " +
              "The human must export RELEASE_APPROVAL=<ticket/approver> before starting OpenCode.",
          )
        }
      }
    },
  }
}
