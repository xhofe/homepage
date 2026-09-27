import assert from "node:assert/strict"
import { pickRandom, resolveStyle } from "./resolve.ts"

const ids = ["aurora", "terminal", "swiss"]

const pinned = resolveStyle(ids, "terminal")
assert.equal(pinned.pinned, true)
assert.equal(pinned.id, "terminal")

const blank = resolveStyle(ids, null)
assert.equal(blank.pinned, false)
assert.ok(ids.includes(blank.id))

const invalid = resolveStyle(ids, "nope")
assert.equal(invalid.pinned, false)
assert.ok(ids.includes(invalid.id))

const empty = resolveStyle([], null)
assert.equal(empty.pinned, false)
assert.equal(empty.id, "")

for (let i = 0; i < 40; i++) {
  assert.notEqual(pickRandom(ids, "aurora"), "aurora")
}

assert.equal(pickRandom(["only"], "only"), "only")

console.log("resolve.check ok")
