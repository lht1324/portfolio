# Portfolio (jaeholee.xyz) — 작업 기록 (Last Updated: 2026-09-08)

> Jaeho Lee 개인 포트폴리오 + 외주 수주용 원페이지 사이트.
> TailorAd 쪽 내용은 `tailored-ad/context.md` 참조. 여기엔 포트폴리오만.

## 1. 개요

- **URL**: https://jaeholee.xyz (도메인 Cloudflare 구매·DNS)
- **스택**: Next.js 16 + React 19 + Tailwind v4, Cloudflare Workers 배포 (OpenNext 어댑터)
- **Git**: Git Flow (`master` 프로덕션 / `develop` 작업). 배포 = master 푸시 시 자동.
- **포트**: dev `3002` (3000/3001 short_real, 3003 tailored-ad와 충돌 방지)
- **언어**: 영어. **테마**: 다크 기본 + 라이트 토글 (localStorage 저장).
- **연락**: `contact@jaeholee.xyz` (Cloudflare Email Routing → gmail 포워딩)

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
src/components/main/
  MainPage.tsx          → 6섹션 + Footer 합성 (server)
  HeroSection.tsx       → 히어로 (server)
  WorkSection.tsx       → 프로젝트 카드 + 상태 모달 (client, 유일한 예외)
  ServicesSection.tsx   → 2x2 서비스 (server)
  AboutSection.tsx      → 사진+바이오+타임라인+스택 (server)
  ProcessSection.tsx    → 3단계 (server)
  ContactSection.tsx    → Contact + Footer (server)
src/components/
  site-nav.tsx          → 고정 내비 + 모바일 메뉴 + 테마 토글 (client)
  reveal.tsx            → 스크롤 리빌 래퍼 (client)
  theme-provider.tsx    → 다크/라이트 컨텍스트 (client)
src/content/site.ts     → 사이트 상수 (이름·메일·링크·CTA·내브·프로젝트·타임라인)
```

- 원칙: server 기본, `"use client"`는 인터랙션 경계(모달·메뉴·테마·리빌)에만.
- 파일 네이밍: `*Section.tsx` (server인데 Client라 짓지 않기).

## 4. 카피·수주 정책 (확정)

- **Async-first**: 통화 없음. 서면 브리프 → 12시간 내 ack → 2영업일 내 질문+고정 견적.
- **CTA 전역 통일**: "Send your brief" (메일 제목 "Project brief: ...").
- **가격**: rescue $400 / pipeline $1,500 / payments $900 (Starting at 표기).
  MVP는 맞춤 견적 ("Fixed quote after written brief"). 산정식: 시간×$30~40 + 30% 버퍼.
- **프로젝트**: ShortReal AI (live 링크) + TailorAd (개발 중 → 상태 모달).
  모달에서 status만 `"Live in production"`으로 바꾸면 링크 카드로 자동 전환.
- **경력**: AutoCrypt 2년 유지 (검증 가능한 유일한 고용 기록) + 가천대 학부 한 줄.
- ack 메일 템플릿: "Got it — reviewing your brief now. ..." (별도 파일 없음, 필요시 재생성)

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

## 6. 미결·백로그

- [ ] Phosphor 아이콘 `*Icon` 개명 (deprecated 경고 제거, 시각 변화 없음) — 승인 대기
- [ ] 후기·고객 로고 (첫 수주 후 수집. 가짜 금지)
- [ ] 3번째 프로젝트 (Work 리듬 상한선: split 2연속까지)
- [ ] FAQ (실제 질문 쌓이면)
- [ ] Cal.com 도입 여부 (async-first로 일단 보류. 필요시 재개)
- [ ] Search Console 등록 확인
- [ ] 실기기 모바일 확인 (375px)

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
