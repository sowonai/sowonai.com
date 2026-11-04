#!/usr/bin/env node
// site/ 점검 스크립트 — Node 내장 모듈만 사용. CI(.github/workflows/deploy.yml)와 로컬에서 같은 명령으로 돈다.
//   node scripts/check-site.mjs
// 걸리는 것이 하나라도 있으면 exit 1.
//   1. src/href 의 로컬 경로가 site/ 안에 실제로 있는가 ('/' 시작은 site/ 기준, #·http(s):·mailto: 등은 제외)
//   2. index.html 의 data-ko / data-ko-html 값이 비어 있지 않은가
//   3. 목업 흔적(class="review", class="flag", "mockup")이 남지 않았는가
//   4. 평문 http:// 링크, 외부 <script src>, 외부 <link rel=stylesheet> 가 없는가

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = join(ROOT, 'site');
const errors = [];
const fail = (file, msg) => errors.push(`${relative(ROOT, file)}: ${msg}`);

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

if (!existsSync(SITE)) {
  console.error('site/ 폴더가 없습니다.');
  process.exit(1);
}

const htmlFiles = walk(SITE).filter((f) => f.endsWith('.html'));
if (htmlFiles.length === 0) {
  console.error('site/ 안에 .html 파일이 없습니다.');
  process.exit(1);
}

const TAG_RE = /<([a-zA-Z][\w:-]*)((?:\s+[^\s"'<>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?)*)\s*\/?>/g;
const ATTR_RE = /([^\s"'<>\/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

function parseTags(html) {
  // 주석과 <script> 본문은 태그 검사에서 뺀다(스크립트 코드 안의 문자열을 속성으로 오인하지 않도록).
  const stripped = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/(<script\b[^>]*>)[\s\S]*?(<\/script>)/gi, '$1$2');
  const tags = [];
  for (const m of stripped.matchAll(TAG_RE)) {
    const attrs = {};
    for (const a of m[2].matchAll(ATTR_RE)) {
      attrs[a[1].toLowerCase()] = a[2] ?? a[3] ?? a[4] ?? '';
    }
    tags.push({ name: m[1].toLowerCase(), attrs });
  }
  return tags;
}

const isExternal = (u) => /^(https?:)?\/\//i.test(u);
const isSkipped = (u) => u === '' || u.startsWith('#') || /^[a-z][a-z0-9+.-]*:/i.test(u) || u.startsWith('//');

function resolveLocal(file, url) {
  const clean = decodeURIComponent(url.split('#')[0].split('?')[0]);
  const base = clean.startsWith('/') ? join(SITE, clean) : join(dirname(file), clean);
  const target = resolve(base);
  if (target !== SITE && !target.startsWith(SITE + sep)) return { target, outside: true };
  return { target, outside: false };
}

// 폴더를 가리키면(예: "/") 그 안의 index.html 이 있어야 한다 — 정적 서버가 보여 주는 것과 같은 기준.
function localExists(target) {
  if (!existsSync(target)) return false;
  return statSync(target).isDirectory() ? existsSync(join(target, 'index.html')) : true;
}

let linkCount = 0;
for (const file of htmlFiles) {
  const raw = readFileSync(file, 'utf8');

  // 3. 목업 흔적 (원문 전체 — 주석 포함)
  if (/mockup/i.test(raw)) fail(file, '"mockup" 문구가 남아 있음');
  const tags = parseTags(raw);
  for (const t of tags) {
    const classes = (t.attrs.class ?? '').split(/\s+/);
    if (classes.includes('review')) fail(file, `class="review" 가 남아 있음 (<${t.name}>)`);
    if (classes.includes('flag')) fail(file, `class="flag" 가 남아 있음 (<${t.name}>)`);
  }

  for (const t of tags) {
    for (const attr of ['src', 'href']) {
      const url = t.attrs[attr];
      if (url === undefined) continue;
      linkCount++;

      // 4. 평문 http:// · 외부 script · 외부 stylesheet
      if (/^http:\/\//i.test(url)) fail(file, `평문 http:// 링크: ${url}`);
      if (t.name === 'script' && attr === 'src' && isExternal(url)) fail(file, `외부 <script src>: ${url}`);
      if (t.name === 'link' && attr === 'href' && /\bstylesheet\b/i.test(t.attrs.rel ?? '') && isExternal(url)) {
        fail(file, `외부 <link rel=stylesheet>: ${url}`);
      }

      // 1. 로컬 경로 존재
      if (isSkipped(url)) continue;
      const { target, outside } = resolveLocal(file, url);
      if (outside) fail(file, `site/ 밖을 가리키는 경로: ${url}`);
      else if (!localExists(target)) fail(file, `없는 파일을 가리킴 (${attr}="${url}") → ${relative(ROOT, target)}`);
    }
  }
}

// 2. index.html 의 data-ko / data-ko-html 가 비어 있지 않은가
const indexFile = join(SITE, 'index.html');
let koCount = 0;
if (!existsSync(indexFile)) {
  fail(indexFile, '파일이 없음');
} else {
  for (const t of parseTags(readFileSync(indexFile, 'utf8'))) {
    for (const attr of ['data-ko', 'data-ko-html']) {
      if (t.attrs[attr] === undefined) continue;
      koCount++;
      if (t.attrs[attr].trim() === '') fail(indexFile, `<${t.name}> 의 ${attr} 값이 비어 있음`);
    }
  }
  if (koCount === 0) fail(indexFile, 'data-ko / data-ko-html 가 하나도 없음');
}

if (errors.length > 0) {
  console.error(`check-site: FAIL (${errors.length})`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`check-site: OK — html ${htmlFiles.length}개, src/href ${linkCount}개, data-ko ${koCount}개 확인`);
