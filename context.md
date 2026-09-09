# Portfolio (jaeholee.xyz) — 작업 기록 (Last Updated: 2026-09-09)

> Jaeho Lee 개인 포트폴리오 + 외주 수주용 원페이지 사이트.
> TailorAd 쪽 내용은 `tailored-ad/context.md` 참조. 여기엔 포트폴리오만.

## 1. 개요

- **URL**: https://jaeholee.xyz (도메인 Cloudflare 구매·DNS)
- **스택**: Next.js 16 + React 19 + Tailwind v4, Cloudflare Workers 배포 (OpenNext 어댑터)
- **Git**: Git Flow (`master` 프로덕션 / `develop` 작업). 배포 = master 푸시 시 자동.
- **포트**: dev `3002` (3000/3001 short_real, 3003 tailored-ad와 충돌 방지)
- **언어**: 영어. **테마**: 다크 기본 + 라이트 토글 (localStorage 저장).
- **연락**: `contact@jaeholee.xyz` (Cloudflare Email Routing → gmail 포워딩)
- **발신**: Resend 가동 중. 도메인 인증済 (Tokyo 리전, DNS 4종: DKIM + send MX/SPF + DMARC).
  `brief@jaeholee.xyz` 발신 → `contact@` 수신, `replyTo` 신청자. 제목에 서비스+신청인+KST시각 (스레드 분리).
- **인프라**: www → 루트 301 리다이렉트, Bot Fight Mode ON, Speed optimizations OFF.

## 2. 디자인 시스템

- 방향: Linear-clean 미니멀. `design-taste-frontend` 스킬 프리플라이트 통과 기준.
- Dials: VARIANCE 6 / MOTION 5 / DENSITY 4 (Developer 포트폴리오 프리셋).
- 액센트 emerald 단일 잠금 (라이트 emerald-700 / 다크 emerald-400, 버튼 명도 5.5:1/10:1).
- 폰트 Geist Sans + Geist Mono (`next/font`, 셀프호스팅).
- 모션: `Reveal` 스크롤 페이드 (y 12px, 0.5s) + `motion-safe` 게이트. Marquee·커스텀 커서 없음.
  앵커 스무스 스크롤 (`motion-safe:scroll-smooth` on html).
- 규칙: eyebrow 0개, 히어로 4요소 (배지·H1 7단어·서브 14단어·CTA 2개),
  CTA 의도 단일 라벨, em/en 대시 전면 금지, `uppercase tracking` 마이크로라벨 금지.
- 모서리 규칙: 버튼·칩 pill, 입력칸 16px.

## 3. 구조

```
src/app/page.tsx        → SiteNav + MainPage (2줄 쉘)
src/app/api/brief/route.ts → 브리프 접수 POST (FormData → 검증 → Resend 발송 + 첨부)
src/components/main/
  MainPage.tsx          → 6섹션 + Footer 합성 (server)
  HeroSection.tsx       → 히어로 (server)
  WorkSection.tsx       → 프로젝트 카드 + 상태 모달 (client, CTA는 #contact + ↓ 아이콘)
  ServicesSection.tsx   → 2x2 카드 (server)
  AboutSection.tsx      → 사진+바이오+타임라인+스택 (server)
  ProcessSection.tsx    → 3행 헤어라인 + 행 안 불릿 (server)
  ContactSection.tsx    → 스플릿 (좌 명세표 / 우 폼) + Footer (server)
  BriefForm.tsx         → 실전송 폼 (client: 칩·이메일·상세·파일누적/삭제·인라인에러·허니팟)
  CopyEmailButton.tsx   → 이메일 복사 버튼 (client, clipboard + 폴백)
src/components/
  site-nav.tsx          → 고정 내비 + 스크롤스파이 + 모바일 메뉴 + 테마 토글 (client)
  reveal.tsx            → 스크롤 리빌 래퍼 (client)
  theme-provider.tsx    → 다크/라이트 컨텍스트 (client)
src/lib/
  utils/getNextBaseResponse.ts + api/types/api/BaseResponse.ts (tailored-ad에서 이식)
src/content/site.ts     → 사이트 상수 (이름·메일·링크·CTA·내브·프로젝트·타임라인)
```

- 원칙: server 기본, `"use client"`는 인터랙션 경계(모달·메뉴·테마·리빌·폼·복사)에만.
- 파일 네이밍: `*Section.tsx` (server인데 Client라 짓지 않기).
- 아이콘: Phosphor. 서버 파일은 `/dist/ssr`, client 파일은 메인 엔트리.
- **중요**: Workers 런타임 시크릿은 `getCloudflareContext().env`로 읽어야 함.
  `process.env` 폴백 병행 (dev는 .env.local). 대시보드 "Variables and secrets"는
  **빌드용/런타임용이 별개** — RESEND_API_KEY는 Runtime 쪽에 있어야 함 (Build 쪽만 있으면 500).
  빌드용 잔재는 삭제済.

## 4. 카피·수주 정책 (확정)

- **Async-first**: 통화 없음. 서면 브리프 → 12시간 내 ack → 2영업일 내 질문+고정 견적.
  Cal.com은 보류 유지. 도입 조건: 실제 고객의 통화 요구가 쌓이면 재개.
- **CTA 전역 통일**: "Send your brief" → 전부 `#contact` 착지 (mailto 전멸).
  내비 Contact 링크(#contact)와 CTA(#contact) 병행 유지 (길안내 vs 행동 유도).
- **인칭**: `I` 통일. 축약 통일 (`you're`).
- **가격**: rescue $500 / pipeline $1,500 / payments $1,000 (Starting at 표기).
  MVP는 맞춤 견적 ("Fixed quote after written brief"). 산정식: 시간×$30~40 + 30% 버퍼.
  Starting at(하한선)와 Fixed quote(착수 전 확정가)는 모순 아님. 9-ending·인하안 모두 기각 (신뢰 저하).
- **결제**: 착수금 50% + 잔금 50%, 둘 다 Wise. 견적서·계약서에서 안내 (페이지에 Wise 링크 없음).
- **수정·보수**: 수정 2회 (한 번에 모아서 서면, 범위 변경은 별도 견적).
  인계 후 30일간 인도 범위 내 결함 무상 수정 (구조 작업은 고친 부분만).
- **데모**: 긴 프로젝트만 ("Demos on longer builds"). 추가 요금 없음.
- **프로젝트**: ShortReal AI (live 링크) + TailorAd (개발 중 → 상태 모달).
  모달에서 status만 `"Live in production"`으로 바꾸면 링크 카드로 자동 전환.
- **경력**: AutoCrypt 2년 유지 (검증 가능한 유일한 고용 기록) + 가천대 학부 한 줄.
- **폼 필드**: 서비스칩(필수 1개 이상)·이메일·상세(20~5000자)·파일(선택, 누적 최대 3개·개당 10MB·실행파일 제외).
  이름·제목·예산·일정은 삭제 (마찰 감소, 견적 단계에서 조율).
- **메일**: 제목 `Project brief: {서비스} - {신청인} ({KST시각})`.
  본문 HTML (제목行+서비스/발신자+구분선+본문). 실패 시 신청인 화면에 직접 메일 주소 안내.
- SNS: X만 (@jaeholeeeee, 로고+밑줄+↗). GitHub·LinkedIn 버튼 삭제 (JSON-LD sameAs는 유지).
  LinkedIn 프로필 방치 상태라 링크 제거. 정비 후 재추가 검토.

## 5. 적용된 수정 로그

- OG 이미지 빌드 에러 (satori 다중자식 div에 display:flex 필요).
- 테마 lint (effect 내 setState → lazy initializer + suppressHydrationWarning).
- em/en 대시 전수 제거 (메타·타임라인 포함).
- `animate-ping` → `motion-safe:` 게이트. 전역 `:focus-visible` 링 추가.
- Process 리스트 `<li>` 안에 Reveal 넣던 구조 교정.
- 히어로 사진 `object-top` (정사각 크롭에 머리 잘림 수정).
- 인물 사진 JPG 116KB → WebP 22KB + `sizes` (LCP 개선). 원본 JPG는 클릭 시 새 탭으로.
- 앵커 점프 분석 → Reveal y 24→12, 0.6→0.5s.
- 섹션 리듬: 데스크탑 한정 `min-h-[100dvh-4rem]`, 콘텐츠 top 고정. hero peek (`Work`에 `md:-mt-[10dvh]`).
  짧은 섹션(Process·Contact)은 min-h 제외가 원칙이었으나, Contact는 폼이 길어져 min-h + 좌칼럼 justify... → 최종 좌 명세표로 정리.
- Work 상태 모달 (Escape·배경클릭·스크롤락·포커스).
- ESLint에서 `.open-next/` 제외. `.idea/` ignore.
- 헤더 스크롤스파이 (`IntersectionObserver`, rootMargin px 단위).
- `optimizePackageImports` 제거 (Next 16 미지원 옵션이라 빌드 깨짐).
- (09-09) 브리프 폼 실전송: `BriefForm` 신규 + `BriefFormMock` 삭제.
  칩→이메일→상세→파일 순서, 파일 누적/개별삭제/중복제외, 드롭존 DnD+하이라이트+영역밖 오드롭 가드.
  서버 검증 이중화 (클라+route), 허니팟 `company`, 400/500/502 규격 응답.
  첨부 파이프 검증済 (zip 전송·exe 거부·10MB 초과 거부).
- (09-09) Contact 스플릿: 중앙 → 좌(헤드라인+명세표 EMAIL/X/Based in/Response)+우(폼).
  mailto 큰 버튼 삭제, 이메일 복사 버튼, 컨테이너 max-w-7xl 통일.
- (09-09) CTA 라우팅 `#contact` 통일 (모달·히어로·내비). 모달 ↓ 아이콘. 스무스 스크롤.
  `#brief-form` 정밀 착지안은 Contact와 착지점 달라서 폐기.
- (09-09) Process 행+불릿 (2x2 벤토는 읽기 순서 깨져서 폐기). 중복 제거 (no-calls·no-hourly·questions 각 1회).
  01 "one page"→ Quartet 정리, 02 결제·수정 2회, 03 longer builds·보수 30일·소유권 이전.
- (09-09) 가격 $400/$900 → $500/$1,000.
- (09-09) AI audit: 대시 0, 금지어 0, "sits between"·"you're"·칩=서비스명 교정.
- (09-09) 프로덕션 500 사태: 원인은 빌드용/런타임용 시크릿 혼동. §3 경고 참조.
  디버그 과정에서 깨진 커밋 2개를 master에 푸시한 적 있음 (Cloudflare 빌드 실패로 배포는 안 됨. 이후 정상 커밋으로 덮음).

## 6. 미결·백로그

- [ ] 후기·고객 로고 (첫 수주 후 수집. 가짜 금지)
- [ ] 3번째 프로젝트 (Work 리듬 상한선: split 2연속까지)
- [ ] FAQ (실제 질문 쌓이면)
- [ ] Cal.com 도입 여부 (보류. 조건: 실제 고객의 통화 요구)
- [ ] Search Console 등록 확인
- [ ] 실기기 모바일 확인 (375px)
- [ ] 견적서 1페이지 템플릿 (수주 시: 범위 in/out·일정·가격·지불조건·전제·유효기간 14일·Wise 안내)
- [ ] 스팸 뚫리면 Cloudflare Turnstile (route에서 siteverify 검증)
- [ ] 규칙 충돌 정리: AGENTS.md는 코드 들여쓰기 4칸, 기존 파일은 2칸 혼재. 새 파일 기준 확정 필요.
- [ ] LinkedIn 프로필 정비 후 링크 재추가 검토

## 7. 작업 룰 (이 세션 합의)

- 조사(읽기·검색·curl 확인)는 바로 수행.
- 수정·설치·실행·커밋·푸시는 먼저 말하고 OK 받고 진행. (2회 위반 → 사과済. 설명-먼저 엄수.)
- `develop` 검증 → 확정되면 커밋 → `master`는 배포 신호 있을 때만.
- 빌드 통과 확인 없이 푸시 금지 (grep exit 코드 함정 주의).
- 협업 분업: 사용자가 직접 고치고 검사 요청하기도 함. 중간 꼬인 트리는 `git mv`로 이력 보존.

## 8. 명령어

```bash
npx next dev -p 3002   # dev
npm run build
npm run lint
# 배포: develop → master 머지·푸시 (자동배포)
```
