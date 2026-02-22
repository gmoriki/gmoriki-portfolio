import { useState, useMemo, useRef, useEffect } from "react";
import {
  Mic, FileText, Heart, Package, Building2,
  ExternalLink, ArrowUpRight,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { works, computeStats, type WorkItem } from "@/data/works-data";
import { JapanMap } from "@/components/JapanMap";
import { AppSidebar } from "@/components/AppSidebar";
import Navigation from "@/components/Navigation";

// ─────────────────────────────────────────
// コンテンツデータ
// ─────────────────────────────────────────
const SLIDES = [
  { title: "生成AIの大学業務での新たな活用可能性を発見する",               url: "https://speakerdeck.com/gmoriki/sheng-cheng-ainoda-xue-ye-wu-denoxin-tanahuo-yong-ke-neng-xing-wofa-jian-suru",                                                                       date: "2026-02-05", views: 250,  image: "https://files.speakerdeck.com/presentations/ab910e11c1c8411ea6c57c937e0587c1/slide_0.jpg?38314704" },
  { title: "生成AI活用の本質的理解：大学DXを加速する「プロトタイプ起点業務」", url: "https://speakerdeck.com/gmoriki/sheng-cheng-aihuo-yong-noben-zhi-de-li-jie-da-xue-dxwojia-su-suru-purototaipuqi-dian-ye-wu",                                              date: "2025-10-31", views: 420,  image: "https://files.speakerdeck.com/presentations/ade715f511264bef86bd4a752efe893e/slide_0.jpg?37191399" },
  { title: "AIエージェントのコモディティ化と大学職員の生存戦略2030",        url: "https://speakerdeck.com/gmoriki/aiezientonokomodeiteihua-toda-xue-zhi-yuan-nosheng-cun-zhan-lue-2030",                                                                           date: "2025-01-31", views: 1700, image: "https://files.speakerdeck.com/presentations/be4d72090a104fa28d8dc779904e7025/slide_0.jpg?33650950" },
  { title: "生成AIと歩むこれからの大学",                                  url: "https://speakerdeck.com/gmoriki/sheng-cheng-aitobu-mukorekaranoda-xue",                                                                                                             date: "2024-12-20", views: 2300, image: "https://files.speakerdeck.com/presentations/0bef1d9b61d64f9e964d7631fd04cd99/slide_0.jpg?33125127" },
  { title: "Difyを活用した「内省支援」エージェント開発の所感",             url: "https://speakerdeck.com/gmoriki/difywohuo-yong-sita-nei-sheng-zhi-yuan-ezientokai-fa-nosuo-gan",                                                                                  date: "2024-09-20", views: 2200, image: "https://files.speakerdeck.com/presentations/2fb99dc24e7048e2974dcae5308327db/slide_0.jpg?31810293" },
  { title: "大学業務における生成AI活用の現在地 -基本編-",                 url: "https://speakerdeck.com/gmoriki/da-xue-ye-wu-niokerusheng-cheng-aihuo-yong-noxian-zai-di-ji-ben-bian",                                                                             date: "2024-06-20", views: 6200, image: "https://files.speakerdeck.com/presentations/ecd0f3d8aa8748d282e5a46f3687b84a/slide_0.jpg?30681772" },
  { title: "生成AIを活用できる大学教職員になる-基本と実践-",              url: "https://speakerdeck.com/gmoriki/sheng-cheng-aiwohuo-yong-dekiruda-xue-jiao-zhi-yuan-ninaru-ji-ben-toshi-jian",                                                                     date: "2024-03-21", views: 1600, image: "https://files.speakerdeck.com/presentations/10a106da95a94728ae6c0a4c00e97516/slide_0.jpg?29399508" },
  { title: "大学業務における生成AI利用の体系",                            url: "https://speakerdeck.com/gmoriki/da-xue-ye-wu-niokerusheng-cheng-aili-yong-noti-xi",                                                                                                 date: "2023-12-12", views: 2000, image: "https://files.speakerdeck.com/presentations/ba164fbe7b94459387421df13902b9f1/slide_0.jpg?28161339" },
  { title: "Copilotとして理解する生成AI利用の基本",                       url: "https://speakerdeck.com/gmoriki/copilottositeli-jie-surusheng-cheng-aili-yong-noji-ben",                                                                                            date: "2023-11-01", views: 710,  image: "https://files.speakerdeck.com/presentations/9e88b52aa3a44c9a8dc07c3634d204cd/slide_0.jpg?29279872" },
  { title: "大学職員のためのプロンプトガイドの開発",                      url: "https://speakerdeck.com/gmoriki/da-xue-zhi-yuan-notamenopuronputogaidonokai-fa-ren-cai-kai-fa-niokerusheng-cheng-ai-li-yong-zhe-tosheng-cheng-ai-noguan-warinijiao-dian-wodang-tete", date: "2023-09-01", views: 580,  image: "https://files.speakerdeck.com/presentations/02e65306ed774f099871f24d2184da19/slide_0.jpg?32551812" },
];

const NOTES = [
  { title: "大学職員のためのプロンプトガイド2026", date: "2026-02-14", url: "https://note.com/pogohopper8/n/nced249950cfc", image: "https://assets.st-note.com/production/uploads/images/251604882/rectangle_large_type_2_5446953b018b72a9bd2261cd6aad8310.png?fit=bounds&quality=85&width=1280" },
  { title: "「非エンジニア」は誰のための言葉なのか", date: "2026-02-11", url: "https://note.com/pogohopper8/n/n104fd0146499", image: "https://assets.st-note.com/production/uploads/images/250833938/rectangle_large_type_2_042b220d07ec7fa717478a875d023484.png?fit=bounds&quality=85&width=1280" },
  { title: "あとから効いてくるAIとの付き合い方", date: "2026-01-12", url: "https://note.com/pogohopper8/n/n6616108810c6", image: "https://assets.st-note.com/production/uploads/images/243235615/rectangle_large_type_2_ece79ada89ce516dc7e303f85d77c409.png?fit=bounds&quality=85&width=1280" },
  { title: "NotionAIと一緒に「うえきばちポータル」を作った", date: "2026-01-01", url: "https://note.com/pogohopper8/n/nfba8a7056732", image: "https://assets.st-note.com/production/uploads/images/240344144/rectangle_large_type_2_811902457784c580a90463de4ff5261e.png?fit=bounds&quality=85&width=1280" },
  { title: "[翻訳] AIエージェント時代のコンテキストグラフについて", date: "2025-12-25", url: "https://note.com/pogohopper8/n/n334157e502ca", image: "https://assets.st-note.com/production/uploads/images/238688945/rectangle_large_type_2_6e42add3c0ec4ef3d27a410bff48f4ac.jpeg?fit=bounds&quality=85&width=1280" },
  { title: "生成AI利用者のためのプロンプトガイドをWeb公開しました", date: "2024-02-02", url: "https://note.com/pogohopper8/n/n85bba164bb7e", image: "https://assets.st-note.com/production/uploads/images/129310777/rectangle_large_type_2_cc2b6bbdb57fc8e7134a59b475c6f371.png?fit=bounds&quality=85&width=1280" },
];

const SLIDE_GRADIENTS = [
  "from-blue-600 to-indigo-700",
  "from-violet-600 to-purple-700",
  "from-emerald-600 to-teal-700",
  "from-rose-600 to-pink-700",
  "from-amber-500 to-orange-600",
  "from-cyan-600 to-sky-700",
  "from-fuchsia-600 to-violet-700",
  "from-teal-600 to-emerald-700",
  "from-orange-600 to-red-700",
  "from-indigo-600 to-blue-700",
];

const NOTE_GRADIENTS = [
  "from-slate-700 to-slate-900",
  "from-zinc-700 to-neutral-900",
  "from-gray-700 to-slate-900",
  "from-neutral-700 to-zinc-900",
  "from-stone-700 to-neutral-900",
  "from-slate-600 to-gray-800",
  "from-zinc-600 to-stone-800",
];

// ─────────────────────────────────────────
// データ処理
// ─────────────────────────────────────────
const allStats = computeStats(works);

const UEKIBACHI_PORTAL: WorkItem = {
  date: "2026年1月",
  title: "うえきばちポータル",
  description: "大学職員向けのAI活用情報ポータル。ツール・事例・研修資料をNotionで一元管理し、NotionAIが記事整理・要約などの定型業務を自動化。スマホからも利用可能。",
  link: "https://gmoriki.notion.site/uekibachi",
  image: "https://res.cloudinary.com/do97jmk0n/image/upload/v1767757764/uekibachi_notion_header_final_fzjjan.png",
  tags: ["プロダクト"],
  featured: true,
};

const featuredWorks: WorkItem[] = [
  works.find((w) => w.title.includes("プロンプトガイド開発"))!,
  UEKIBACHI_PORTAL,
];

const uniCount = new Set(works.filter((w) => w.university).map((w) => w.university)).size;

const TAG_VARIANT: Record<string, "default" | "secondary" | "outline"> = {
  "講演": "default", "研修": "default",
  "論文・発表": "secondary", "社会貢献": "secondary",
  "プロダクト": "outline", "オープンソース": "outline",
  "アドバイザリー": "outline", "教材開発": "outline",
};

const TABS = [
  { value: "all", label: "すべて" },
  { value: "講演", label: "講演" },
  { value: "研修", label: "研修" },
  { value: "プロダクト", label: "プロダクト" },
  { value: "論文", label: "論文・発表" },
  { value: "社会貢献", label: "社会貢献" },
];

const COLLAPSE_COUNT = 8;

// ─────────────────────────────────────────
// コンテンツカルーセル
// ─────────────────────────────────────────
interface ContentItem { title: string; url: string; sub?: string; gradient: string; bgImage?: string | null }

function ContentCarousel({
  items, label,
}: {
  items: ContentItem[];
  label: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [failedImgs, setFailedImgs] = useState<Set<string>>(new Set());
  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 220, behavior: "smooth" });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => scroll(-1)} aria-label="前へ">
          <ChevronLeft size={14} />
        </Button>
        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => scroll(1)} aria-label="次へ">
          <ChevronRight size={14} />
        </Button>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => {
          const rawImg = item.bgImage ?? null;
          const imgSrc = rawImg && !failedImgs.has(item.url) ? rawImg : null;
          return (
            <button
              key={i}
              onClick={() => window.open(item.url, "_blank", "noopener,noreferrer")}
              className={cn(
                "float-item snap-center shrink-0 w-[200px] rounded-xl overflow-hidden text-left",
                "transition-all duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "opacity-80 hover:opacity-100 hover:shadow-lg hover:ring-2 hover:ring-primary/70 hover:ring-offset-2",
              )}
              style={{ animationDelay: `${i * 0.35}s` }}
              aria-label={item.title}
            >
              <div className={cn("h-[130px] relative overflow-hidden", !imgSrc && `bg-gradient-to-br ${item.gradient}`)}>
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={() => setFailedImgs((prev) => new Set(prev).add(item.url))}
                  />
                ) : (
                  <div className="w-full h-full p-3 flex flex-col justify-between">
                    <Badge variant="secondary" className="text-xs bg-white/20 text-white border-0 backdrop-blur-sm w-fit">
                      {label}
                    </Badge>
                    <div className="space-y-1 opacity-30">
                      <div className="h-0.5 bg-white w-full rounded" />
                      <div className="h-0.5 bg-white w-2/3 rounded" />
                    </div>
                  </div>
                )}
                {imgSrc && (
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="text-xs bg-black/40 text-white border-0 backdrop-blur-sm">
                      {label}
                    </Badge>
                  </div>
                )}
              </div>
              <div className="bg-card border border-t-0 border-border rounded-b-xl p-3 h-[80px] flex flex-col justify-between">
                <p className="text-xs font-medium leading-snug line-clamp-3 text-foreground">
                  {item.title}
                </p>
                {item.sub && (
                  <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// メイン
// ─────────────────────────────────────────
export default function Works() {
  const [tab, setTab] = useState("all");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const filtered = useMemo(() => {
    const rev = [...works].reverse();
    if (tab === "all") return rev;
    if (tab === "論文") return rev.filter((w) => w.tags.includes("論文・発表"));
    return rev.filter((w) => w.tags.includes(tab));
  }, [tab]);

  const visibleItems = expanded ? filtered : filtered.slice(0, COLLAPSE_COUNT);

  const slideItems = useMemo<ContentItem[]>(() =>
    SLIDES.map((s, i) => ({ ...s, sub: s.date, bgImage: s.image, gradient: SLIDE_GRADIENTS[i % SLIDE_GRADIENTS.length] }))
  , []);

  const noteItems = useMemo<ContentItem[]>(() =>
    NOTES.map((n, i) => ({ ...n, sub: n.date, bgImage: n.image, gradient: NOTE_GRADIENTS[i % NOTE_GRADIENTS.length] }))
  , []);

  const kpis = [
    { label: "講演・研修", value: allStats.find((s) => s.label === "講演・研修")?.value ?? 0, suffix: "件", icon: Mic, desc: "全国の大学・機関" },
    { label: "論文・発表", value: allStats.find((s) => s.label === "論文・発表")?.value ?? 0, suffix: "件", icon: FileText, desc: "学会・研究集会" },
    { label: "社会貢献", value: allStats.find((s) => s.label === "社会貢献活動")?.value ?? 0, suffix: "件", icon: Heart, desc: "コミュニティ活動" },
    { label: "プロダクト", value: allStats.find((s) => s.label === "Works(作品等)")?.value ?? 0, suffix: "件", icon: Package, desc: "OSS・ツール" },
    { label: "大学・機関", value: uniCount, suffix: "+", icon: Building2, desc: "全国カバレッジ" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Navigation(fixed 72px)の下からレイアウト開始 */}
      <div className="flex pt-[72px]">
        <AppSidebar />

        <div className="flex-1 min-w-0 flex flex-col">
          <main className="flex-1 w-full px-5 md:px-12 lg:px-20 py-8 md:py-12 space-y-12 md:space-y-16">

            {/* ページタイトル */}
            <section id="section-overview" className="space-y-3 pt-2 scroll-mt-[88px]">
              <p className="text-xs font-medium tracking-widest uppercase text-primary">Portfolio</p>
              <div>
                <h1 className="text-4xl font-semibold tracking-tight">Works</h1>
              </div>
              {/* KPI さりげなく */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 pt-1">
                {kpis.map(({ label, value, suffix, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-1">
                    <Icon size={11} className="text-muted-foreground/60 shrink-0" />
                    <span className="text-xs text-muted-foreground/70">{label}</span>
                    <span className="text-sm font-semibold ml-0.5 text-foreground/80">{value}{suffix}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 主な実績（HERO） */}
            <section id="section-featured" className="space-y-6 scroll-mt-[88px]">
              <h2 className="text-2xl font-semibold tracking-tight">主な実績</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredWorks.map((work, i) => (
                  <div key={i} className="float-item" style={{ animationDelay: `${i * 0.5}s` }}>
                  <Card className="flex flex-col hover:shadow-lg transition-shadow duration-300 group h-full">
                    {(() => {
                      const imgSrc = work.image ?? null;
                      return imgSrc ? (
                        <div className="overflow-hidden rounded-t-lg aspect-[16/9]">
                          <img src={imgSrc} alt={work.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      ) : null;
                    })()}
                    <CardHeader>
                      <div className="flex flex-wrap gap-1.5 mb-1">
                        {work.tags.map((tag) => (
                          <Badge key={tag} variant={TAG_VARIANT[tag] ?? "secondary"}>{tag}</Badge>
                        ))}
                      </div>
                      <CardTitle className="text-2xl leading-snug">
                        {work.link ? (
                          <a href={work.link} target="_blank" rel="noopener noreferrer"
                            className="hover:underline inline-flex items-start gap-1">
                            {work.title}
                            <ExternalLink size={14} className="mt-1.5 shrink-0 opacity-40" />
                          </a>
                        ) : work.title}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {work.date}{work.organization && ` — ${work.organization}`}
                      </CardDescription>
                    </CardHeader>
                    {work.description && (
                      <CardContent className="pt-0 flex-1">
                        <p className="text-sm text-muted-foreground leading-relaxed">{work.description}</p>
                      </CardContent>
                    )}
                    {work.link && (
                      <CardContent className="pt-0">
                        <Button variant="outline" size="sm" asChild>
                          <a href={work.link} target="_blank" rel="noopener noreferrer">
                            詳細を見る <ArrowUpRight size={13} />
                          </a>
                        </Button>
                      </CardContent>
                    )}
                  </Card>
                  </div>
                ))}
              </div>
            </section>

            {/* コンテンツ */}
            <section id="section-content" className="space-y-5 scroll-mt-[88px]">
              <h2 className="text-xl font-semibold tracking-tight">コンテンツ</h2>
              <Tabs defaultValue="slides">
                <TabsList>
                  <TabsTrigger value="slides">スライド</TabsTrigger>
                  <TabsTrigger value="notes">記事</TabsTrigger>
                </TabsList>
                <TabsContent value="slides" className="mt-4">
                  <ContentCarousel items={slideItems} label="Slide" />
                </TabsContent>
                <TabsContent value="notes" className="mt-4">
                  <ContentCarousel items={noteItems} label="note" />
                </TabsContent>
              </Tabs>
            </section>

            {/* 活動マップ */}
            <section id="section-map" className="space-y-5 scroll-mt-[88px]">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tight">活動マップ</h2>
                <p className="text-sm text-muted-foreground">
                  講演・研修・論文発表などで関わった都道府県（クリックで詳細）
                </p>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <JapanMap />
                </CardContent>
              </Card>
            </section>

            {/* 全活動記録 */}
            <section id="section-log" className="space-y-5 scroll-mt-[88px]">
              <h2 className="text-xl font-semibold tracking-tight">全活動記録</h2>
              <Tabs value={tab} onValueChange={(v) => { setTab(v); setExpanded(false); }}>
                <TabsList>
                  {TABS.map(({ value, label }) => (
                    <TabsTrigger key={value} value={value}>
                      {label}
                      <span className="ml-1 text-xs text-muted-foreground">
                        {value === "all" ? works.length
                          : value === "論文" ? works.filter((w) => w.tags.includes("論文・発表")).length
                          : works.filter((w) => w.tags.includes(value)).length}
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                {TABS.map(({ value }) => (
                  <TabsContent key={value} value={value}>
                    <Card>
                      <CardContent className="p-0">
                        <div className="divide-y divide-border">
                          {visibleItems.map((work, i) => (
                            <div key={i} className="px-4 md:px-5 py-3 md:py-4 hover:bg-muted/50 transition-colors">
                              {/* モバイル: 縦積み / デスクトップ: 横並び */}
                              <div className="hidden md:flex items-start gap-4">
                                <span className="text-sm text-muted-foreground w-28 shrink-0 pt-0.5 leading-5">{work.date}</span>
                                <div className="flex-1 min-w-0 space-y-0.5">
                                  {work.link ? (
                                    <a href={work.link} target="_blank" rel="noopener noreferrer"
                                      className="text-sm font-medium hover:underline inline-flex items-center gap-1">
                                      {work.title}<ExternalLink size={11} className="opacity-35" />
                                    </a>
                                  ) : (
                                    <p className="text-sm font-medium">{work.title}</p>
                                  )}
                                  {(work.organization || work.university) && (
                                    <p className="text-xs text-muted-foreground">{work.organization ?? work.university}</p>
                                  )}
                                </div>
                                <div className="flex flex-wrap gap-1 shrink-0">
                                  {work.tags.slice(0, 2).map((tag) => (
                                    <Badge key={tag} variant={TAG_VARIANT[tag] ?? "secondary"}>{tag}</Badge>
                                  ))}
                                </div>
                              </div>
                              {/* モバイル用レイアウト */}
                              <div className="md:hidden space-y-1.5">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-xs text-muted-foreground shrink-0">{work.date}</span>
                                  <div className="flex gap-1 shrink-0">
                                    {work.tags.slice(0, 1).map((tag) => (
                                      <Badge key={tag} variant={TAG_VARIANT[tag] ?? "secondary"} className="text-[10px] px-1.5 py-0">{tag}</Badge>
                                    ))}
                                  </div>
                                </div>
                                {work.link ? (
                                  <a href={work.link} target="_blank" rel="noopener noreferrer"
                                    className="text-sm font-medium hover:underline flex items-start gap-1 leading-snug">
                                    <span>{work.title}</span>
                                    <ExternalLink size={10} className="opacity-35 shrink-0 mt-1" />
                                  </a>
                                ) : (
                                  <p className="text-sm font-medium leading-snug">{work.title}</p>
                                )}
                                {(work.organization || work.university) && (
                                  <p className="text-xs text-muted-foreground">{work.organization ?? work.university}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        {filtered.length > COLLAPSE_COUNT && (
                          <div className="border-t border-border">
                            <button
                              onClick={() => setExpanded((e) => !e)}
                              className="w-full flex items-center justify-center gap-1.5 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
                            >
                              {expanded
                                ? <><ChevronUp size={15} />折りたたむ</>
                                : <><ChevronDown size={15} />残り {filtered.length - COLLAPSE_COUNT} 件を表示</>
                              }
                            </button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </section>
          </main>

          <footer className="w-full border-t border-border mt-8 px-6 md:px-10 py-8">
            <p className="text-sm text-muted-foreground">© 2026 gmoriki. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
