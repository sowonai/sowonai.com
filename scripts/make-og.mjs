#!/usr/bin/env node
// site/assets/og.png (1200×630) 를 만든다. 링크 미리보기(Open Graph)용 그림이고, 결과 PNG 만 커밋한다.
//
// Playwright 는 이 저장소의 의존성이 아니다(빌드 없는 사이트 — package.json 없음).
// Playwright 가 설치된 폴더를 PLAYWRIGHT_DIR 로 알려 주고 돌린다:
//   PLAYWRIGHT_DIR=/tmp/sowonai-shot node scripts/make-og.mjs
//
// 색은 index.html 의 --ink(#0f172a) 와 파랑(#2f6fe8) 그대로.

import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dir = process.env.PLAYWRIGHT_DIR;
if (!dir) {
  console.error('PLAYWRIGHT_DIR 가 필요합니다. 예: PLAYWRIGHT_DIR=/tmp/sowonai-shot node scripts/make-og.mjs');
  process.exit(1);
}
const { chromium } = createRequire(join(dir, 'package.json'))('playwright');

const logo = readFileSync(join(ROOT, 'site/assets/sowonai-logo.png')).toString('base64');
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; background: #fff; color: #0f172a; overflow: hidden;
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", Roboto, sans-serif;
    -webkit-font-smoothing: antialiased; padding: 72px 84px; display: flex; flex-direction: column; }
  .brand { display: flex; align-items: center; gap: 18px; font-size: 44px; font-weight: 800; letter-spacing: -0.02em; }
  .brand img { height: 64px; width: auto; }
  h1 { margin-top: auto; font-size: 104px; line-height: 1.04; font-weight: 850; letter-spacing: -0.03em; }
  h1 em { font-style: normal; color: #2f6fe8; }
  .rule { width: 72px; height: 6px; border-radius: 3px; background: #2f6fe8; margin: 44px 0 22px; }
  .sub { font-size: 30px; font-weight: 600; color: #64748b; letter-spacing: -0.01em; }
</style></head><body>
  <div class="brand"><img src="data:image/png;base64,${logo}" alt="">SowonAI</div>
  <h1>AI superpowers,<br><em>for everyone.</em></h1>
  <div class="rule"></div>
  <div class="sub">CrewX · CrewX Marketplace · Community</div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html);
await page.screenshot({ path: join(ROOT, 'site/assets/og.png') });
await browser.close();
console.log('wrote site/assets/og.png');
