# sowonai.com

[www.sowonai.com](https://www.sowonai.com) — **SowonAI 제품군 소개 한 장.** 투자자·파트너가 "이런 제품군을 가진 회사"라는 걸 한눈에 보도록 CrewX · CrewX 마켓플레이스 · 커뮤니티를 짧게 소개하고 링크로 잇는다. 다운로드·가입·가격·사용법은 넣지 않는다(그건 [crewx.dev](https://www.crewx.dev)가 맡는다).

빌드 없는 정적 사이트다. `site/` 폴더가 그대로 GitHub Pages에 올라간다.

```
site/
  index.html            본문 한 장 (HTML + CSS + JS 한 파일, 외부 요청 0)
  404.html
  assets/               로고 2개, og.png, 탭·터치 아이콘(CrewX) 2개
  favicon.ico  CNAME  robots.txt  sitemap.xml
scripts/
  check-site.mjs        점검 (CI와 같은 명령)
  make-og.mjs           og.png 다시 만들 때만 (Playwright 필요, 아래 참고)
```

## 고치는 법

`site/index.html`을 직접 고친다. 영어가 본문이고, 한국어는 같은 요소의 `data-ko`(글자) / `data-ko-html`(줄바꿈·강조가 있는 것) 속성에 둔다. 영어 문구를 바꾸면 한국어 속성도 같이 바꾼다.

- 언어: 기본은 영어. 우측 상단 EN/KO로 바꾸고, 고른 언어는 브라우저(`localStorage`)에 기억한다. `?lang=ko`로 열면 한국어. 브라우저 언어는 자동 감지하지 않는다.
- 외부 폰트·CDN·분석·추적 스크립트는 넣지 않는다(쿠키 0, 동의 배너 불필요). 그림은 전부 `site/assets/`.

## 로컬 미리보기

```bash
python3 -m http.server -d site 8080
# http://localhost:8080  (한국어: http://localhost:8080/?lang=ko)
```

로컬 `http.server`는 `404.html`을 쓰지 않는다. 404 화면은 `site/404.html`을 직접 열어 본다.

## 점검

```bash
node scripts/check-site.mjs
```

의존성 없이 Node만 있으면 된다. `site/` 안 모든 `.html`에서 ① `src`/`href`의 로컬 경로가 실제 파일인지, ② `data-ko`/`data-ko-html`가 비어 있지 않은지, ③ 목업 흔적이 남지 않았는지, ④ `http://` 평문 링크·외부 script·외부 stylesheet가 없는지 본다. 하나라도 걸리면 exit 1. PR에서도 같은 점검이 돈다.

og.png(링크 미리보기 그림)를 다시 만들 때만 Playwright가 필요하다. 이 저장소에는 설치하지 않고 다른 곳의 것을 가리킨다: `PLAYWRIGHT_DIR=/path/to/playwright-installed-dir node scripts/make-og.mjs`

## 배포

`main`에 머지하면 곧바로 GitHub Pages로 배포된다(`.github/workflows/deploy.yml`: 점검 → `site/` 업로드 → 배포. PR에서는 점검까지만). **머지 = 공개 사이트 즉시 교체.** 사용자 지정 도메인(`www.sowonai.com`)과 HTTPS 강제는 저장소 Pages 설정에 있고, `site/CNAME`은 그 기록용이다.

## 옛 사이트

이 저장소는 예전에 Refine 문서 사이트(Docusaurus) 포크였다. 그 상태는 태그 `legacy-refine-fork`에 그대로 남아 있다.
