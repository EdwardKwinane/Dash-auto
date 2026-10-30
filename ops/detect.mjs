#!/usr/bin/env node
// Deterministic control-band detector. Usage: node ops/detect.mjs <metric.json> [--baseline N]
// metric.json: JSON array of numbers, oldest → newest. The last point(s) are judged against the baseline before them.
// Output (JSON): { tier: 0-3, z, rule, mean, std }. Tier: 0 ok, 1 >1σ (log), 2 >2σ-ish (diagnose), 3 >3σ-ish (propose).
import { readFileSync } from "node:fs"

const file = process.argv[2]
if (!file) { console.error("usage: node ops/detect.mjs <metric.json> [--baseline N]"); process.exit(2) }
const bi = process.argv.indexOf("--baseline")
const data = JSON.parse(readFileSync(file, "utf8"))
if (!Array.isArray(data) || data.some((n) => typeof n !== "number")) { console.error("metric.json must be an array of numbers"); process.exit(2) }

const baselineN = bi > -1 ? Number(process.argv[bi + 1]) : 30
const recent = data.slice(-8)
const base = data.slice(Math.max(0, data.length - 8 - baselineN), data.length - 8)
if (base.length < 5) { console.error("not enough baseline data (need >= 5 points before the last 8)"); process.exit(2) }

const mean = base.reduce((a, b) => a + b, 0) / base.length
const std = Math.sqrt(base.reduce((a, b) => a + (b - mean) ** 2, 0) / base.length) || 1e-9
const z = recent.map((v) => (v - mean) / std)
const last = z.at(-1)

let tier = 0, rule = "within bands"
const sameSide = (arr, f) => arr.every((x) => f(x))
if (Math.abs(last) > 3) { tier = 3; rule = "WE1: point beyond 3σ" }
else if (sameSide(z.slice(-8), (x) => x > 0) || sameSide(z.slice(-8), (x) => x < 0)) { tier = 2; rule = "WE4: 8 consecutive points on one side of the mean (drift)" }
else if (z.slice(-3).filter((x) => x > 2).length >= 2 || z.slice(-3).filter((x) => x < -2).length >= 2) { tier = 2; rule = "WE2: 2 of last 3 points beyond 2σ" }
else if (Math.abs(last) > 2) { tier = 2; rule = "point beyond 2σ" }
else if (Math.abs(last) > 1) { tier = 1; rule = "point beyond 1σ" }

console.log(JSON.stringify({ tier, z: Number(last.toFixed(2)), rule, mean: Number(mean.toFixed(4)), std: Number(std.toFixed(4)) }))
process.exit(0)
