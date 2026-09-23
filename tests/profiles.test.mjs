import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import ts from "typescript";
import { createRequire } from "node:module";
const load = createRequire(import.meta.url);
load.extensions[".ts"] = (module, filename) =>
  module._compile(
    ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
      },
    }).outputText,
    filename,
  );
const { filterProfiles, PAGE_SIZE } = load("../lib/public-profiles.ts");
const { scaleProfiles } = load("./profiles.fixture.ts");
test("24 profiles paginate without duplicates or omissions", () => {
  const results = filterProfiles(scaleProfiles, "Todos", "");
  assert.equal(results.length, 24);
  assert.equal(results.slice(0, PAGE_SIZE).length, 8);
  assert.equal(results.slice(0, PAGE_SIZE * 2).length, 16);
  assert.equal(
    new Set(results.slice(0, PAGE_SIZE * 3).map((p) => p.id)).size,
    24,
  );
});
test("experience and accent-insensitive search intersect", () => {
  assert.equal(filterProfiles(scaleProfiles, "En casa", "sofia").length, 8);
  assert.equal(filterProfiles(scaleProfiles, "Salida", "sofia").length, 0);
  assert.equal(filterProfiles(scaleProfiles, "Cena", "  INGLES ").length, 16);
});
test("all non-public states are excluded", () => {
  for (const status of ["draft", "review", "suspended", "archived"]) {
    assert.equal(
      filterProfiles([{ ...scaleProfiles[0], status }], "Todos", "").length,
      0,
    );
  }
});
test("unmatched search returns an empty result", () => {
  assert.deepEqual(filterProfiles(scaleProfiles, "Todos", "no-existe"), []);
});
