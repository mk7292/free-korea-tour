"use client";

import { useState } from "react";
import Image from "next/image";
import ResultCard from "@/components/ResultCard";

// ── 카테고리 ──────────────────────────────────────────────
const CATEGORIES = [
  { id: "all", label: "전체 보기", emoji: "✨" },
  { id: "museum", label: "전시·박물관", emoji: "🏛️" },
  { id: "performance", label: "공연·콘서트", emoji: "🎭" },
  { id: "nature", label: "공원·자연", emoji: "🌳" },
  { id: "kpop", label: "K-POP 성지", emoji: "🎵" },
  { id: "kdrama", label: "K-드라마", emoji: "🎬" },
  { id: "festival", label: "지역 축제", emoji: "🎪" },
];

// ── Section 04 큐레이션 데이터 ────────────────────────────
const CURATED = [
  {
    id: 1,
    category: "museum",
    categoryLabel: "전시·박물관",
    name: "국립중앙박물관 '사유의 방'",
    location: "서울 용산구",
    desc: "한국의 미학을 집대성한 반가사유상 상설 전시관. 미디어 아트와 결합된 어둡고 고요한 복도를 지나면 만나는 사유의 공간으로, 완벽한 힐링 장소입니다.",
    badge: "무료 입장",
    bg: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1e293b 100%)",
    emoji: "🗿",
    tags: ["힐링", "문화", "역사"],
    featured: true,
    mapUrl: "https://maps.google.com/?q=국립중앙박물관+서울",
    siteUrl: "https://www.museum.go.kr",
  },
  {
    id: 2,
    category: "museum",
    categoryLabel: "현대미술 갤러리",
    name: "청담 '송은(SONGEUN)' 갤러리",
    location: "서울 청담동",
    desc: "세계적인 건축가 헤르조그 앤 드 뫼롱이 설계한 압도적인 건축물. 청담 명품 거리에서 최고 수준의 현대 미술 기획전을 무료로 관람.",
    badge: "무료 입장",
    bg: "linear-gradient(135deg, #27272a 0%, #52525b 50%, #18181b 100%)",
    emoji: "🎨",
    tags: ["현대미술", "건축", "갤러리"],
    featured: false,
    mapUrl: "https://maps.google.com/?q=송은갤러리+청담동+서울",
    siteUrl: "https://www.songeun.or.kr",
  },
  {
    id: 3,
    category: "museum",
    categoryLabel: "복합문화공간",
    name: "코엑스 '별마당 도서관'",
    location: "서울 삼성동",
    desc: "13m 높이의 거대한 서가 자체가 예술 작품인 복합문화공간. 명사 강연과 아티스트들의 무료 공연이 매일 펼쳐집니다.",
    badge: "무료 입장",
    bg: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1d4ed8 100%)",
    emoji: "📚",
    tags: ["도서관", "공연", "문화"],
    featured: false,
    mapUrl: "https://maps.google.com/?q=별마당도서관+코엑스+서울",
    siteUrl: null,
  },
  {
    id: 4,
    category: "nature",
    categoryLabel: "생태·역사 투어",
    name: "DMZ 평화의 길 & 박물관",
    location: "경기도 파주·철원",
    desc: "세계 유일의 비무장지대가 간직한 청정 자연 생태계. 고요함을 몸소 걸으며 체험하는 세계에서 가장 특별한 도보 투어.",
    badge: "무료 입장",
    bg: "linear-gradient(135deg, #064e3b 0%, #059669 50%, #065f46 100%)",
    emoji: "🕊️",
    tags: ["자연", "역사", "평화"],
    featured: true,
    mapUrl: "https://maps.google.com/?q=DMZ+평화의길+파주",
    siteUrl: null,
  },
  {
    id: 5,
    category: "festival",
    categoryLabel: "K-푸드 지역 축제",
    name: "구미 라면축제",
    location: "경북 구미시",
    desc: "K-푸드의 대명사 '라면'을 주제로 도심에서 열리는 이색 축제. 세상에서 가장 긴 라면 레스토랑 등 트렌디한 로컬 페스티벌.",
    badge: "참가비 0원",
    bg: "linear-gradient(135deg, #7f1d1d 0%, #dc2626 50%, #991b1b 100%)",
    emoji: "🍜",
    tags: ["축제", "K-푸드", "이색체험"],
    featured: false,
    mapUrl: "https://maps.google.com/?q=구미+라면축제",
    siteUrl: "https://www.gumiramyun.com",
  },
  {
    id: 6,
    category: "kdrama",
    categoryLabel: "K-드라마 성지순례",
    name: "'눈물의 여왕' & '오징어 게임' 성지",
    location: "서울 여의도·동대문",
    desc: "'눈물의 여왕' 속 더현대 서울 실내 정원, 다수 K-드라마에 등장하는 DDP 야외 건축물. AI 도슨트가 에피소드 해설을 제공합니다.",
    badge: "무료 관람",
    bg: "linear-gradient(135deg, #0c0a1e 0%, #312e81 50%, #1e1b4b 100%)",
    emoji: "🎬",
    tags: ["K-드라마", "넷플릭스", "성지순례"],
    featured: false,
    mapUrl: "https://maps.google.com/?q=동대문디자인플라자+서울",
    siteUrl: null,
  },
  {
    id: 7,
    category: "kpop",
    categoryLabel: "K-POP 엔터 성지",
    name: "SM 아티움 & HYBE 인사이트",
    location: "서울 청담동·용산구",
    desc: "SM엔터테인먼트 사옥 아티움과 HYBE 사옥에서 아티스트 굿즈와 미디어 아트를 무료로 감상. 전 세계 팬들의 성지.",
    badge: "무료 입장",
    bg: "linear-gradient(135deg, #4c0519 0%, #be185d 50%, #831843 100%)",
    emoji: "🎤",
    tags: ["K-POP", "아이돌", "엔터테인먼트"],
    featured: false,
    mapUrl: "https://maps.google.com/?q=SM엔터테인먼트+서울+청담동",
    siteUrl: null,
  },
  {
    id: 8,
    category: "kpop",
    categoryLabel: "K-POP 버스킹 & 댄스",
    name: "한강공원 K-팝 셔플댄스 & 버스킹",
    location: "서울 여의도·반포 한강",
    desc: "여의도·반포 한강공원에서 펼쳐지는 K-팝 댄스 커버와 버스킹을 무료로 직관. 누구나 참여 가능한 오픈 댄스 존.",
    badge: "무료 참가",
    bg: "linear-gradient(135deg, #1e1b4b 0%, #4f46e5 50%, #312e81 100%)",
    emoji: "💃",
    tags: ["K-POP", "댄스", "버스킹"],
    featured: false,
    mapUrl: "https://maps.google.com/?q=여의도+한강공원+서울",
    siteUrl: null,
  },
];

// ── AI Q&A 데이터 ─────────────────────────────────────────
const MOODS    = [{ label: "힐링", emoji: "🌿" }, { label: "영감", emoji: "✨" }, { label: "신남", emoji: "🎉" }, { label: "여유", emoji: "☕" }];
const COMPANIONS = [{ label: "혼자", emoji: "🧍" }, { label: "연인", emoji: "💑" }, { label: "가족", emoji: "👨‍👩‍👧" }, { label: "친구", emoji: "👫" }];
const INTERESTS  = [{ label: "전시", emoji: "🖼️" }, { label: "공연", emoji: "🎭" }, { label: "K-POP", emoji: "🎤" }, { label: "K-드라마", emoji: "📺" }];

interface Spot {
  name: string;
  description: string;
  isFree: boolean;
  googleMapUrl: string;
  officialUrl: string | null;
}

// ── 메인 컴포넌트 ─────────────────────────────────────────
export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [mood, setMood]           = useState<string | null>(null);
  const [companion, setCompanion] = useState<string | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading]     = useState(false);
  const [spots, setSpots]         = useState<Spot[] | null>(null);
  const [error, setError]         = useState<string | null>(null);

  const toggleInterest = (label: string) =>
    setInterests((prev) => prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]);

  const canSubmit = mood && companion && interests.length > 0;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true); setSpots(null); setError(null);
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood, companion, interests }),
      });
      if (!res.ok) throw new Error("추천 결과를 불러오지 못했습니다.");
      const data = await res.json();
      setSpots(data.spots);
    } catch (e) {
      setError(e instanceof Error ? e.message : "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMood(null); setCompanion(null); setInterests([]);
    setSpots(null); setError(null);
  };

  const filtered = activeCategory === "all" ? CURATED : CURATED.filter((s) => s.category === activeCategory);

  // ── 선택 버튼 공통 컴포넌트 (다크 배경용) ────────────────
  const DarkPickBtn = ({ item, active, onClick }: { item: { label: string; emoji: string }; active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 py-4 px-2 rounded-2xl border-2 text-sm font-bold transition-all duration-200 active:scale-95
        ${active ? "border-[#C8102E] bg-[#C8102E] text-white" : "border-white/20 text-white/70 hover:border-white/50 hover:bg-white/5"}`}
    >
      <span className="text-2xl">{item.emoji}</span>
      <span>{item.label}</span>
    </button>
  );

  return (
    <main className="min-h-screen bg-white text-[#0D0D0D]">

      {/* ══ NAV ══════════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/Free_KOREA_tour.png"
              alt="Free KOREA Tour"
              height={48}
              width={200}
              style={{ height: "48px", width: "auto" }}
              priority
            />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            <a href="#curated" className="hover:text-[#C8102E] transition-colors">큐레이션</a>
            <a href="#ai-recommend" className="hover:text-[#C8102E] transition-colors">AI 추천</a>
          </div>
          <a href="#ai-recommend" className="text-xs font-bold bg-[#C8102E] text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors">
            AI 코스 받기
          </a>
        </div>
      </nav>

      {/* ══ HERO ═════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center items-center bg-[#0D0D0D] overflow-hidden pt-16">
        {/* 배경 블러 광원 */}
        <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #C8102E, transparent)" }} />
        <div className="absolute bottom-1/3 -right-32 w-96 h-96 rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, #1B3FAB, transparent)" }} />
        {/* 격자 패턴 */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* 태그라인 뱃지 */}
          <div className="inline-flex items-center gap-2 border border-white/15 text-white/60 text-xs font-medium px-5 py-2 rounded-full mb-12 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] animate-pulse" />
            Zero Budget · AI 초개인화 K-Culture Platform
          </div>

          {/* 메인 가격 타이틀 */}
          <div className="animate-fade-up-delay">
            <div className="flex flex-wrap items-baseline justify-center gap-4 md:gap-8 mb-6">
              {["0달러", "0유로", "0원"].map((price, i) => (
                <span key={i}
                  className="font-black leading-none tracking-tighter"
                  style={{ fontSize: "clamp(3rem, 12vw, 8rem)", color: i === 2 ? "#C8102E" : "#ffffff" }}>
                  {price}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 justify-center mb-8">
              <div className="h-px flex-1 max-w-[80px] bg-white/15" />
              <span className="text-white/30 text-xs tracking-widest uppercase">Free Korea Tour</span>
              <div className="h-px flex-1 max-w-[80px] bg-white/15" />
            </div>
          </div>

          {/* 서브 카피 */}
          <div className="animate-fade-up-delay-2">
            <p className="text-white/70 text-xl md:text-2xl font-light leading-relaxed mb-3 max-w-2xl mx-auto">
              한국의 세계적인 박물관이, 공연이, 전시회가
            </p>
            <h1 className="text-white font-black text-3xl md:text-5xl leading-tight mb-14">
              입장료·관람료·참가비 <span className="text-[#C8102E]">무료!</span>
            </h1>

            {/* CTA 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#ai-recommend"
                className="px-8 py-4 bg-[#C8102E] hover:bg-red-700 text-white font-bold rounded-2xl text-base transition-all hover:shadow-2xl hover:shadow-red-900/40 active:scale-95">
                AI 맞춤 코스 추천받기 →
              </a>
              <a href="#curated"
                className="px-8 py-4 border border-white/25 hover:border-white/50 text-white/80 font-medium rounded-2xl text-base transition-all hover:bg-white/5">
                무료 명소 둘러보기
              </a>
            </div>
          </div>
        </div>

        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-8 flex flex-col items-center gap-2 text-white/25 animate-bounce">
          <span className="text-xs tracking-widest">SCROLL</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ══ STATS BAR ════════════════════════════════════════ */}
      <section className="bg-white border-y border-gray-100 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "100+",  sub: "무료 관광지", red: false },
              { num: "0원",   sub: "입장료·관람료", red: true },
              { num: "10개국", sub: "다국어 지원", red: false },
              { num: "AI",    sub: "맞춤 코스 생성", red: false },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="font-black text-4xl md:text-5xl" style={{ color: s.red ? "#C8102E" : "#1B3FAB" }}>{s.num}</span>
                <span className="text-gray-400 text-sm font-light">{s.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 마퀴 배너 ════════════════════════════════════════ */}
      <div className="bg-[#1B3FAB] py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array(3).fill("🏛️ 국립중앙박물관 무료 · 🖼️ 송은갤러리 무료 · 📚 별마당도서관 무료 · 🕊️ DMZ 평화의 길 무료 · 🍜 구미 라면축제 무료 · 🎬 K-드라마 성지 무료 · 🎤 SM아티움 무료 · 💃 한강 버스킹 무료 · ").map((t, i) => (
            <span key={i} className="text-white/80 text-sm font-medium px-8">{t}</span>
          ))}
        </div>
      </div>

      {/* ══ CATEGORY FILTER ══════════════════════════════════ */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all duration-200
                  ${activeCategory === cat.id
                    ? "bg-[#0D0D0D] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══ CURATED SECTION ══════════════════════════════════ */}
      <section id="curated" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* 섹션 헤더 */}
          <div className="mb-16">
            <p className="text-[#C8102E] text-xs font-black tracking-[0.25em] uppercase mb-4">Premium Curation — Section 04</p>
            <h2 className="text-4xl md:text-6xl font-black text-[#0D0D0D] leading-tight mb-6">
              수준 높은 안목으로 엄선한<br />
              <span className="text-[#1B3FAB]">서울 무료 명소</span>
            </h2>
            <p className="text-gray-400 font-light text-lg max-w-xl leading-relaxed">
              &ldquo;무료&rdquo;는 퀄리티가 낮을 것이라는 편견을 깨뜨리는, 세계 어디서도 경험할 수 없는 K-컬처 공간들
            </p>
          </div>

          {/* 카드 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((spot) => (
              <article key={spot.id}
                className={`group rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col
                  ${spot.featured ? "md:col-span-2" : ""}`}>
                {/* 이미지 영역 (그라디언트) */}
                <div
                  className="relative flex items-center justify-center overflow-hidden"
                  style={{ background: spot.bg, height: spot.featured ? "300px" : "220px" }}>
                  {/* 도트 패턴 */}
                  <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.6) 1px, transparent 0)", backgroundSize: "28px 28px" }} />
                  {/* 이모지 */}
                  <span className="text-8xl md:text-9xl filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 select-none">
                    {spot.emoji}
                  </span>
                  {/* 카테고리 뱃지 */}
                  <div className="absolute top-5 left-5">
                    <span className="bg-black/30 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                      {spot.categoryLabel}
                    </span>
                  </div>
                  {/* 무료 뱃지 */}
                  <div className="absolute top-5 right-5">
                    <span className="bg-[#C8102E] text-white text-xs font-black px-3 py-1.5 rounded-full tracking-wide">
                      {spot.badge}
                    </span>
                  </div>
                  {/* 위치 */}
                  <div className="absolute bottom-5 left-5 flex items-center gap-1 text-white/60 text-xs">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {spot.location}
                  </div>
                </div>

                {/* 카드 바디 */}
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-[#0D0D0D] mb-3 leading-tight">{spot.name}</h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed flex-1 mb-5">{spot.desc}</p>

                  {/* 태그 */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {spot.tags.map((tag) => (
                      <span key={tag} className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* 링크 버튼 */}
                  <div className="flex gap-3 pt-5 border-t border-gray-100">
                    <a href={spot.mapUrl} target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl border-2 border-[#1B3FAB] text-[#1B3FAB] text-sm font-bold hover:bg-[#1B3FAB] hover:text-white transition-all duration-200 active:scale-95">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      구글 맵
                    </a>
                    {spot.siteUrl ? (
                      <a href={spot.siteUrl} target="_blank" rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl border-2 border-[#C8102E] text-[#C8102E] text-sm font-bold hover:bg-[#C8102E] hover:text-white transition-all duration-200 active:scale-95">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        공식 사이트
                      </a>
                    ) : (
                      <div className="flex-1 flex items-center justify-center py-3 rounded-xl bg-gray-50 text-gray-300 text-sm">
                        사이트 준비중
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}

            {filtered.length === 0 && (
              <div className="col-span-full text-center py-24 text-gray-300">
                <span className="text-6xl block mb-4">🔍</span>
                <p className="font-light">해당 카테고리 장소를 준비 중입니다.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══ AI RECOMMEND ═════════════════════════════════════ */}
      <section id="ai-recommend" className="py-24" style={{ background: "linear-gradient(160deg, #06102e 0%, #0d1b4b 50%, #0a0f2e 100%)" }}>
        <div className="max-w-2xl mx-auto px-6">
          {/* 헤더 */}
          <div className="text-center mb-14">
            <p className="text-[#C8102E] text-xs font-black tracking-[0.25em] uppercase mb-4">AI Powered Curation</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
              나만의 무료 코스,<br />
              <span className="text-[#C8102E]">AI가 설계</span>해드립니다
            </h2>
            <p className="text-blue-300/70 font-light text-lg leading-relaxed">
              기분·동행자·관심사를 알려주시면<br />
              최적화된 서울 무료 관광 코스를 실시간으로 생성합니다
            </p>
          </div>

          {!spots ? (
            <div className="rounded-3xl p-8 md:p-10" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {/* 1. 기분 */}
              <div className="mb-9">
                <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#C8102E] text-white text-xs flex items-center justify-center font-black">1</span>
                  지금 기분은 어떠세요?
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {MOODS.map((m) => <DarkPickBtn key={m.label} item={m} active={mood === m.label} onClick={() => setMood(m.label)} />)}
                </div>
              </div>

              {/* 2. 동행자 */}
              <div className="mb-9">
                <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#C8102E] text-white text-xs flex items-center justify-center font-black">2</span>
                  누구와 함께 가시나요?
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {COMPANIONS.map((c) => <DarkPickBtn key={c.label} item={c} active={companion === c.label} onClick={() => setCompanion(c.label)} />)}
                </div>
              </div>

              {/* 3. 관심사 */}
              <div className="mb-10">
                <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#C8102E] text-white text-xs flex items-center justify-center font-black">3</span>
                  관심사 <span className="text-white/40 font-light text-sm ml-1">(복수 선택 가능)</span>
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {INTERESTS.map((i) => <DarkPickBtn key={i.label} item={i} active={interests.includes(i.label)} onClick={() => toggleInterest(i.label)} />)}
                </div>
              </div>

              {/* CTA */}
              <button onClick={handleSubmit} disabled={!canSubmit || loading}
                className={`w-full py-5 rounded-2xl font-black text-lg transition-all duration-200 tracking-wide
                  ${canSubmit && !loading
                    ? "bg-[#C8102E] text-white hover:bg-red-700 shadow-xl shadow-red-900/40 active:scale-95"
                    : "bg-white/10 text-white/25 cursor-not-allowed"}`}>
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    AI가 코스를 설계하는 중...
                  </span>
                ) : "AI 맞춤 코스 생성 🗺️"}
              </button>

              {error && <p className="mt-4 text-center text-red-400 text-sm">{error}</p>}
            </div>
          ) : (
            <div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-black text-white mb-2">맞춤 추천 코스</h3>
                <p className="text-blue-300/70 text-sm">{mood} · {companion} · {interests.join(", ")}</p>
              </div>
              <div className="flex flex-col gap-4 mb-6">
                {spots.map((spot, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden">
                    <ResultCard spot={spot} index={i} />
                  </div>
                ))}
              </div>
              <button onClick={handleReset}
                className="w-full py-4 rounded-2xl border-2 border-white/20 text-white font-bold hover:bg-white/10 transition-colors">
                다시 선택하기
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════ */}
      <footer className="bg-[#0D0D0D] text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
            {/* 브랜드 */}
            <div className="max-w-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🇰🇷</span>
                <span className="font-black text-xl tracking-tighter">FREE KOREA TOUR</span>
              </div>
              <p className="text-gray-500 text-sm font-light leading-relaxed mb-6">
                한국의 문화예술을 무료로 즐길 수 있는, 누구에게나 행복한 경험을 선사하는 K-컬처 플랫폼
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600 font-medium">10개국 언어 지원:</span>
                <span className="text-sm">🇰🇷🇺🇸🇨🇳🇹🇼🇯🇵🇻🇳🇲🇳🇹🇭🇮🇩🇸🇦</span>
              </div>
            </div>
            {/* 링크 */}
            <div className="flex gap-16 text-sm">
              <div>
                <p className="text-white font-bold mb-4">카테고리</p>
                <ul className="space-y-3 text-gray-500 font-light">
                  <li>🏛️ 전시·박물관</li>
                  <li>🎭 공연·콘서트</li>
                  <li>🎵 K-POP 성지</li>
                  <li>🎬 K-드라마</li>
                  <li>🎪 지역 축제</li>
                </ul>
              </div>
              <div>
                <p className="text-white font-bold mb-4">서비스</p>
                <ul className="space-y-3 text-gray-500 font-light">
                  <li>AI 코스 추천</li>
                  <li>무료 명소 큐레이션</li>
                  <li>AI 도슨트 (준비중)</li>
                  <li>다국어 지원</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-700 text-xs">© 2026 Free KOREA Tour. Powered by Claude AI (claude-sonnet-4-6)</p>
            <p className="text-gray-700 text-xs">Zero Budget · Zero Barrier · K-Culture for Everyone</p>
          </div>
        </div>
      </footer>

    </main>
  );
}
