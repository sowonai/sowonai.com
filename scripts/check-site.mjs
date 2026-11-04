#!/usr/bin/env node
// site/ 점검 스크립트 — Node 내장 모듈만 사용. CI(.github/workflows/deploy.yml)와 로컬에서 같은 명령으로 돈다.
//   node scripts/check-site.mjs
// 걸리는 것이 하나라도 있으면 exit 1.
//   1. src/href 의 로컬 경로가 site/ 안에 실제로 있는가 ('/' 시작은 site/ 기준, #·http(s):·mailto: 등은 제외)
//      - 경로가 '/' 로 끝나면 그 폴더의 index.html 이 있어야 하고, '/' 로 안 끝나면 일반 파일이어야 한다(폴더면 실패).
//   2. index.html 의 data-ko / data-ko-html 값이 비어 있지 않은가 (공백뿐인 값도 비어 있는 것으로 본다)
//   3. 목업 흔적(class="review", class="flag", "mockup")이 남지 않았는가
//   4. 평문 http:// 링크, 외부 <script src>, 외부 <link rel=stylesheet> 가 없는가
//   5. 한 태그에 같은 속성이 두 번 나오지 않는가 (브라우저는 첫 값만 쓰는데 검사가 다른 값을 보는 일을 막는다)
// 속성 값은 브라우저처럼 HTML 엔티티(&#47; &#x2f; &amp; &quot; 등)를 한 번 풀고 나서 검사한다.

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

// 속성 값의 HTML 엔티티를 브라우저처럼 한 번만 푼다(그래서 "&amp;#47;" 은 "&#47;" 글자 그대로 남는다).
//   숫자: &#NN; &#xNN; (세미콜론 생략도 브라우저는 풀어 준다)
//   이름: &amp; &lt; &gt; &quot; &nbsp; (세미콜론 생략은 뒤에 영숫자·'='가 없을 때만), &apos; (세미콜론 필수)
const NAMED_ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', nbsp: ' ', apos: "'" };
const ENTITY_RE = /&(?:#[xX]([0-9a-fA-F]+);?|#([0-9]+);?|(amp|AMP|lt|LT|gt|GT|quot|QUOT|nbsp)(?:;|(?![=A-Za-z0-9]))|(apos);)/g;
const toChar = (n) => (Number.isInteger(n) && n > 0 && n <= 0x10ffff && !(n >= 0xd800 && n <= 0xdfff) ? String.fromCodePoint(n) : '�');

function decodeEntities(s) {
  return s.replace(ENTITY_RE, (_, hex, dec, named, apos) => {
    if (hex !== undefined) return toChar(parseInt(hex, 16));
    if (dec !== undefined) return toChar(parseInt(dec, 10));
    return NAMED_ENTITIES[(named ?? apos).toLowerCase()];
  });
}

function parseTags(html) {
  // 주석과 <script> 본문은 태그 검사에서 뺀다(스크립트 코드 안의 문자열을 속성으로 오인하지 않도록).
  const stripped = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/(<script\b[^>]*>)[\s\S]*?(<\/script>)/gi, '$1$2');
  const tags = [];
  for (const m of stripped.matchAll(TAG_RE)) {
    const attrs = Object.create(null);
    const dups = [];
    for (const a of m[2].matchAll(ATTR_RE)) {
      const key = a[1].toLowerCase();
      if (key in attrs) { dups.push(key); continue; } // 브라우저처럼 첫 값을 쓰되, 중복 자체를 오류로 보고한다
      attrs[key] = decodeEntities(a[2] ?? a[3] ?? a[4] ?? '');
    }
    tags.push({ name: m[1].toLowerCase(), attrs, dups });
  }
  return tags;
}

// 브라우저가 URL 을 쓰기 전에 하는 정리: 앞뒤 공백·제어문자 제거, 탭·줄바꿈 제거.
// (&#32;https://… 나 htt&#9;ps://… 처럼 엔티티로 우회해도 같은 URL 로 본다.)
const normalizeUrl = (u) => u.replace(/^[\u0000- ]+|[\u0000- ]+$/g, '').replace(/[\t\n\r]/g, '');

const isExternal = (u) => /^(https?:)?\/\//i.test(u);
const isSkipped = (u) => u === '' || u.startsWith('#') || /^[a-z][a-z0-9+.-]*:/i.test(u) || u.startsWith('//');

function resolveLocal(file, url) {
  let clean;
  try {
    clean = decodeURIComponent(url.split('#')[0].split('?')[0]);
  } catch {
    return { bad: true };
  }
  // "?x=1" 처럼 경로가 비면 자기 자신을 가리킨다.
  if (clean === '') return { target: file, outside: false, wantsDir: false };
  const base = clean.startsWith('/') ? join(SITE, clean) : join(dirname(file), clean);
  const target = resolve(base); // resolve 가 끝의 '/' 를 지우므로 폴더 여부는 미리 본다
  // '/' 로 끝나거나 마지막이 '.' · '..' 이면 폴더를 가리키는 주소다.
  const wantsDir = clean.endsWith('/') || /(^|\/)\.\.?$/.test(clean);
  if (target !== SITE && !target.startsWith(SITE + sep)) return { target, outside: true, wantsDir };
  return { target, outside: false, wantsDir };
}

// 정적 서버가 실제로 내주는 것과 같은 기준: '/' 로 끝나면 폴더+index.html, 아니면 일반 파일.
// 문제가 있으면 이유 문장을, 없으면 null 을 돌려준다.
function localProblem(target, wantsDir) {
  const st = statSync(target, { throwIfNoEntry: false });
  if (!st) return '없는 파일을 가리킴';
  if (wantsDir) {
    if (!st.isDirectory()) return "파일인데 주소 끝에 '/' 가 붙어 있음";
    if (!existsSync(join(target, 'index.html'))) return '폴더에 index.html 이 없음';
    return null;
  }
  return st.isFile() ? null : "폴더인데 주소 끝에 '/' 가 없음";
}

const parsedByFile = new Map();
let linkCount = 0;
for (const file of htmlFiles) {
  const raw = readFileSync(file, 'utf8');

  // 3. 목업 흔적 (원문 전체 — 주석 포함)
  if (/mockup/i.test(raw)) fail(file, '"mockup" 문구가 남아 있음');
  const tags = parseTags(raw);
  parsedByFile.set(file, tags);

  // 5. 같은 속성이 한 태그에 두 번
  for (const t of tags) {
    if (t.dups.length > 0) fail(file, `<${t.name}> 에 같은 속성이 두 번 나옴 (${[...new Set(t.dups)].join(', ')})`);
  }

  for (const t of tags) {
    const classes = (t.attrs.class ?? '').split(/\s+/);
    if (classes.includes('review')) fail(file, `class="review" 가 남아 있음 (<${t.name}>)`);
    if (classes.includes('flag')) fail(file, `class="flag" 가 남아 있음 (<${t.name}>)`);
  }

  for (const t of tags) {
    for (const attr of ['src', 'href']) {
      if (t.attrs[attr] === undefined) continue;
      const url = normalizeUrl(t.attrs[attr]);
      linkCount++;

      // 4. 평문 http:// · 외부 script · 외부 stylesheet
      if (/^http:\/\//i.test(url)) fail(file, `평문 http:// 링크: ${url}`);
      if (t.name === 'script' && attr === 'src' && isExternal(url)) fail(file, `외부 <script src>: ${url}`);
      if (t.name === 'link' && attr === 'href' && /\bstylesheet\b/i.test(t.attrs.rel ?? '') && isExternal(url)) {
        fail(file, `외부 <link rel=stylesheet>: ${url}`);
      }

      // 1. 로컬 경로 존재
      if (isSkipped(url)) continue;
      const { target, outside, wantsDir, bad } = resolveLocal(file, url);
      if (bad) { fail(file, `퍼센트 인코딩이 잘못된 경로 (${attr}="${url}")`); continue; }
      if (outside) { fail(file, `site/ 밖을 가리키는 경로: ${url}`); continue; }
      const problem = localProblem(target, wantsDir);
      if (problem) fail(file, `${problem} (${attr}="${url}") → ${relative(ROOT, target)}`);
    }
  }
}

// 2. index.html 의 data-ko / data-ko-html 가 비어 있지 않은가
const indexFile = join(SITE, 'index.html');
let koCount = 0;
if (!existsSync(indexFile)) {
  fail(indexFile, '파일이 없음');
} else {
  for (const t of parsedByFile.get(indexFile)) {
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
