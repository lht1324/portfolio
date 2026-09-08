# Portfolio (jaeholee.xyz) — 작업 기록 (Last Updated: 2026-09-09 04:05)

> Jaeho Lee 개인 포트폴리오 + 외주 수주용 원페이지 사이트.
> TailorAd 쪽 내용은 `tailored-ad/context.md` 참조. 여기엔 포트폴리오만.

## 1. 개요

- **URL**: https://jaeholee.xyz (도메인 Cloudflare 구매·DNS)
- **스택**: Next.js 16 + React 19 + Tailwind v4, Cloudflare Workers 배포 (OpenNext 어댑터)
- **Git**: Git Flow (`master` 프로덕션 / `develop` 작업). 배포 = master 푸시 시 자동.
- **포트**: dev `3002` (3000/3001 short_real, 3003 tailored-ad와 충돌 방지)
- **언어**: 영어. **테마**: 다크 기본 + 라이트 토글 (localStorage 저장).
- **연락**: `contact@jaeholee.xyz` (Cloudflare Email Routing → gmail 포워딩)
- **발신 계획**: Resend 경유 (`brief@jaeholee.xyz` 발신 → `contact@` 수신, `replyTo` 신청자). 미착수, §6 참조.

## 2. 디자인 시스템

- 방향: Linear-clean 미니멀. `design-taste-frontend` 스킬 프리플라이트 통과 기준.
- Dials: VARIANCE 6 / MOTION 5 / DENSITY 4 (Developer 포트폴리오 프리셋).
- 액센트 emerald 단일 잠금 (라이트 emerald-700 / 다크 emerald-400, 버튼 명도 5.5:1/10:1).
- 폰트 Geist Sans + Geist Mono (`next/font`, 셀프호스팅).
- 모션: `Reveal` 스크롤 페이드 (y 12px, 0.5s) + `motion-safe` 게이트. Marquee·커스텀 커서 없음.
- 규칙: eyebrow 0개, 히어로 4요소 (배지·H1 7단어·서브 14단어·CTA 2개),
  CTA 의도 단일 라벨, em/en 대시 전면 금지, `uppercase tracking` 마이크로라벨 금지.

## 3. 구조

```
src/app/page.tsx        → SiteNav + MainPage (2줄 쉘)
src/app/api/brief/      → (예정) 브리프 접수 route.ts. 아직 없음
src/components/main/
  MainPage.tsx          → 6섹션 + Footer 합성 (server)
  HeroSection.tsx       → 히어로 (server)
  WorkSection.tsx       → 프로젝트 카드 + 상태 모달 (client)
  ServicesSection.tsx   → 2x2 서비스 (server)
  AboutSection.tsx      → 사진+바이오+타임라인+스택 (server)
  ProcessSection.tsx    → 3단계 (server)
  ContactSection.tsx    → Contact + Footer (server, BriefFormMock 렌더)
  BriefFormMock.tsx     → 접수폼 목업 (client, BIP 캡처용. 전송 없음. Resend 때 교체)
src/components/
  site-nav.tsx          → 고정 내비 + 스크롤스파이 + 모바일 메뉴 + 테마 토글 (client)
  reveal.tsx            → 스크롤 리빌 래퍼 (client)
  theme-provider.tsx    → 다크/라이트 컨텍스트 (client)
src/content/site.ts     → 사이트 상수 (이름·메일·링크·CTA·내브·프로젝트·타임라인)
next.config.ts          → optimizePackageImports: ["@phosphor-icons/react"]
```

- 원칙: server 기본, `"use client"`는 인터랙션 경계(모달·메뉴·테마·리빌·폼목업)에만.
- 파일 네이밍: `*Section.tsx` (server인데 Client라 짓지 않기).
- 아이콘: Phosphor `*Icon` 명명. 서버 파일은 `/dist/ssr`, client 파일은 메인 엔트리 (공식 권장 구조).
- AGENTS.md의 `getNextBaseResponse()` 유틸은 이 프로젝트에 없음. Resend 때 tailored-ad에서 이식 예정.

## 4. 카피·수주 정책 (확정)

- **Async-first**: 통화 없음. 서면 브리프 → 12시간 내 ack → 2영업일 내 질문+고정 견적.
  Cal.com은 보류 유지. 도입 조건: 실제 고객의 통화 요구가 쌓이면 재개.
- **CTA 전역 통일**: "Send your brief" (메일 제목 "Project brief: ..."). 폼 제출 버튼도 동일 라벨.
- **인칭**: `I` 통일 완료 (Services "I scope it", Process "How I work", "at handoff", "in writing").
- **가격**: rescue $400 / pipeline $1,500 / payments $900 (Starting at 표기).
  MVP는 맞춤 견적 ("Fixed quote after written brief"). 산정식: 시간×$30~40 + 30% 버퍼.
  Starting at(하한선)와 Fixed quote(착수 전 확정가)는 모순 아님. Process 02에 연결 문장으로 명시 예정.
- **프로젝트**: ShortReal AI (live 링크) + TailorAd (개발 중 → 상태 모달).
  모달에서 status만 `"Live in production"`으로 바꾸면 링크 카드로 자동 전환.
- **경력**: AutoCrypt 2년 유지 (검증 가능한 유일한 고용 기록) + 가천대 학부 한 줄.
- ack 메일 템플릿: "Got it — reviewing your brief now. ..." (별도 파일 없음, 필요시 재생성)
- Process 교체안 (제안됨, 미확정): 01에 접수 형태 예시(live site·GitHub invite·zip 링크),
  02에 "starting prices are floors; your quote is final" + 완곡 거절문,
  03을 규모 분리 (small fixes ship in days, bigger builds in weekly slices). 교체 시 제목·부제·레이아웃은 유지.

## 5. 적용된 수정 로그

- OG 이미지 빌드 에러 (satori 다중자식 div에 display:flex 필요).
- 테마 lint (effect 내 setState → lazy initializer + suppressHydrationWarning).
- em/en 대시 전수 제거 (메타·타임라인 포함).
- `animate-ping` → `motion-safe:` 게이트. 전역 `:focus-visible` 링 추가.
- Process 리스트 `<li>` 안에 Reveal 넣던 구조 교정.
- 히어로 사진 `object-top` (정사각 크롭에 머리 잘림 수정).
- 인물 사진 JPG 116KB → WebP 22KB + `sizes` (LCP 개선). 원본 JPG는 클릭 시 새 탭으로 (`cursor-zoom-in`, aria 라벨).
- 앵커 점프 분석: 간격 자체는 균일, 체감 차이는 착지 애니메이션 정착 → Reveal y 24→12, 0.6→0.5s.
- 섹션 리듬: 데스크탑 한정 `min-h-[100dvh-4rem]`, 콘텐츠 top 고정 (중앙 정렬 아님).
  hero peek (`Work`에 `md:-mt-[10dvh]`), Contact는 min-h 제외 (막섹션).
- Work 상태 모달 (Escape·배경클릭·스크롤락·포커스).
- ESLint에서 `.open-next/` 제외. `.idea/` ignore.
- (09-09) 헤더 스크롤스파이: `IntersectionObserver` (`rootMargin: "-80px 0px -70% 0px"`).
  `rem`은 rootMargin에 불가해 런타임 에러 → `px`로 수정. 활성화색은 호버색과 동일 + `aria-current`.
- (09-09) 인칭 `I` 통일 4곳 (Services 1, Process 3. `on the call` → `in writing` 포함).
- (09-09) Process `md:min-h` 제거 + `md:py-24`, Contact `py-16 md:py-24` (짧은 섹션은 min-h를 걸지 않는 것으로 확정.
  min-h는 바닥값. 길어지면 no-op이라 나중에 손댈 것 없음).
- (09-09) Phosphor `*Icon` 개명 5파일 (경고 제거, 시각 변화 없음).
- (09-09) `optimizePackageImports: ["@phosphor-icons/react"]` (dev 다이어트).
- (09-09) `BriefFormMock.tsx` 목업 + Contact 하단 렌더 (BIP 캡처용. 전송 없음. `(Demo preview, not wired yet.)` 표기).

## 6. 미결·백로그

- [ ] Resend 연동 접수폼 (BIP 이후. `BriefFormMock` 교체. 아래 상세)
  - 사장님 몫:
    1. resend.com 가입 → Domains에 `jaeholee.xyz` 추가 → 지시된 SPF/DKIM TXT 3개를 Cloudflare DNS에 등록.
       (수신 Email Routing과 별개. 발신 인증용)
    2. API Keys에서 발신 전용 키 발급. 절대 커밋 금지.
    3. `wrangler secret put RESEND_API_KEY` (프로덕션). 로컬 dev는 `.dev.vars`에 동일 키.
    4. `package.json`에 `"resend": "^6.26.0"` 추가 후 직접 `npm install` (에이전트는 install 금지).
  - 에이전트 몫:
    1. tailored-ad 이식: `src/lib/utils/getNextBaseResponse.ts` + `src/lib/api/types/api/BaseResponse.ts`를
       portfolio 동일 경로에 복사 (들여쓰기는 이 프로젝트 2칸에 맞춤. tailored-ad는 4칸).
       `baseFetch`는 client-gateway/ngrok 전제라 이식 불가 → portfolio용 `postFormFetch` 간소판 신설
       (상대경로 fetch, FormData 그대로 전송, Content-Type 수동 설정 금지).
    2. `src/app/api/brief/route.ts` (POST): `req.formData()` 파싱 → 검증 (이름 2자 이상, 이메일 형식,
       제목·본문 20~2000자, budget/timeline enum) → 허니팟 `website` 필드 + `elapsedMs` 3초 미만 거부 →
       파일 검증 (최대 3개, 개당 10MB 이하, 총 20MB 이하, zip/png/jpg/pdf 허용) → ArrayBuffer를 base64로
       (`nodejs_compat` 있어 `Buffer` 가능) → `resend.emails.send({ from: "Jaeho Lee <brief@jaeholee.xyz>",
       to: ["contact@jaeholee.xyz"], replyTo: 신청자 메일, subject: "Project brief: ...",
       text: 신청자 정보+선택 서비스+예산+일정+본문, attachments }) →
       `getNextBaseResponse`로 `{ success, status }` 반환. 에러는 서버 로그만, 클라이언트엔 고정 문구.
       AGENTS.md route.ts 응답 규격 준수.
    3. `BriefFormMock.tsx`를 실제 전송으로 교체: `postFormFetch` 호출, 3상태
       (loading/disabled 15초 타임아웃, success 모달, error 모달+재시도), 파일명 표시·허니팟·마운트 시각 유지.
       결과 모달은 `WorkSection` 모달 패턴 재사용 (Escape·배경클릭·스크롤락·포커스).
       실패 모달에 mailto 폴백 포함 ("안 되면 `contact@jaeholee.xyz`로 직접 메일").
       기존 mailto CTA는 유지 (폼과 병행).
       필드 다이어트 (CRO 7필드 이상 구간 회피): 필수=이메일·상세, 선택=이름·제목·예산·일정·서비스·파일.
    4. 스팸 2차: 뚫리면 Cloudflare Turnstile (사이트키/시크릿키 발급 후 route에서 siteverify 검증).
       1차는 허니팟+시간함정으로 시작.
  - 검증: Resend 대시보드 도메인 인증 확인 → dev에서 첨부 포함 전송 → `contact@` 수신 확인 →
    `npm run lint` + `npm run build`.
  - 제약: 무료 100통/일·3,000통/월·도메인 1개 (접수량에 충분). Resend 첨부 상한 40MB/통 (제안 20MB는 여유).
    `brief@`는 발신 전용. 회신은 `replyTo`로 신청자에게 감.
- [ ] Process 교체안 확정 (제안됨. §4 참조. 확정 시 제목·부제·레이아웃 유지, 본문 3개만 교체)
- [ ] Contact 메일 복사 버튼 (제안됨. mailto 유지 + 원클릭 복사. `mailto` Outlook 문제 완화용)
- [ ] 후기·고객 로고 (첫 수주 후 수집. 가짜 금지)
- [ ] 3번째 프로젝트 (Work 리듬 상한선: split 2연속까지)
- [ ] FAQ (실제 질문 쌓이면)
- [ ] Cal.com 도입 여부 (async-first로 일단 보류. 도입 조건: 실제 고객의 통화 요구가 쌓이면 재개)
- [ ] Search Console 등록 확인
- [ ] 실기기 모바일 확인 (375px)
- [ ] 규칙 충돌 정리: AGENTS.md는 코드 들여쓰기 4칸, 이 프로젝트 실제는 2칸.
  기존 파일은 2칸 유지 중. 새 파일 기준을 사장님과 확정 필요.

## 7. 작업 룰 (이 세션 합의)

- 조사(읽기·검색·curl 확인)는 바로 수행.
- 수정·설치·실행·커밋·푸시는 먼저 말하고 OK 받고 진행.
- `develop` 검증 → 확정되면 커밋 → `master`는 배포 신호 있을 때만.
- 협업 분업: 사용자가 직접 고치고 검사 요청하기도 함. 중간 꼬인 트리는 `git mv`로 이력 보존.

## 8. 명령어

```bash
npx next dev -p 3002   # dev
npm run build
npm run lint
# 배포: develop → master 머지·푸시 (자동배포)
```
