import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DetailContent {
  title: string;
  description: string;
  items?: string[];
}

export default function Home() {
  const [selectedDetail, setSelectedDetail] = useState<DetailContent | null>(null);

  const openDetail = (content: DetailContent) => {
    setSelectedDetail(content);
  };

  const closeDetail = () => {
    setSelectedDetail(null);
  };

  const mvvContent: DetailContent = {
    title: "Mission · Vision · Values",
    description: "私の仕事における大切な要点や理念",
    items: [
      "【Mission】AIとヒトをつなぎ、誰もが技術の恩恵を受けられる社会を創る。生成AIという革新的な技術と、それを使う人々の間に立ち、技術の民主化を実現します。",
      "【Vision】AIエージェントの園芸家を育て、自律的に成長するエコシステムを創る。AIエージェントを組織の文化や暗黙知を学ばせる存在として扱える人材を育成します。",
      "【Values - 社会正義】困っている人から貪らない。社会貢献枠の設定、買い切り型教材、修了生への紹介、持続可能な支援を実践します。",
      "【Values - ナレッジ共有】知識は共有されるべき。note発信、オープン教材、修了生登壇、Slackコミュニティ、プロンプト例共有を行います。",
      "【Values - 相互支援】Give & Give の精神。修了生登壇機会、ネットワークの結節点、コミュニティ醸成、長期的信頼を大切にします。"
    ]
  };

  const expertiseContent: DetailContent = {
    title: "専門性",
    description: "生成AI活用推進、AI人材育成、データ分析・システム構築の3つの軸で活動しています。",
    items: [
      "生成AI活用推進：大企業の現場で生成AI活用を推進。業務フローにAIを組み込み、実際の業務効率化とツール開発を実践。",
      "AI人材育成：SPADEスキル（Structuring, Prompting, Analyzing, Debugging, Evolving）を体系化。全国の大学で研修・講演を実施。",
      "データ分析・システム構築：Python, VBA, Tableau, KH Coderなどを使った業務効率化。報告業務50%削減の実績。"
    ]
  };

  const achievementsContent: DetailContent = {
    title: "実績",
    description: "大学職員として、そして生成AI人材育成の専門家として、多くの実績を積み重ねてきました。",
    items: [
      "業務時間50%削減（東京都市大学）：VBAを用いたデータ処理の自動化により、報告業務の時間を大幅に削減。",
      "教員業績管理システムPM（九州大学）：教員業績管理システム等リプレースのプロジェクトリーダーとして、教員業績データ連携機能の運用を担当。",
      "生成AIコーディネーター養成講座（愛媛大学）：大学職員のための生成AIコーディネーター養成講座を企画・実施。",
      "全国の大学で研修・講演多数：文京学院大学、早稲田大学、九州大学など、全国の大学で生成AI活用に関する研修・講演を実施。"
    ]
  };

  const servicesContent: DetailContent = {
    title: "サービスメニュー",
    description: "大学・企業向けに、生成AI活用推進とAI人材育成のサービスを提供しています。",
    items: [
      "大学向け研修：生成AIコーディネーター養成講座など、大学の状況に応じたカスタマイズ研修を提供。",
      "企業向けアドバイザリー：継続的な伴走支援により、組織全体の生成AI活用を推進。",
      "講演・ワークショップ：予算に応じた形式で、生成AI活用の基礎から応用まで幅広く対応。",
      "オンライン教材：買い切り型の教材により、いつでもどこでも学習可能。サブスクリプションではなく、持続可能な学習環境を提供。"
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Editorial Style */}
      <section className="container py-16 md:py-24 lg:py-32">
        <div className="editorial-grid">
          {/* Main Title Area */}
          <div className="col-span-12 lg:col-span-8">
            <div className="space-y-8">
              <div>
                <h1 className="text-[clamp(4rem,12vw,10rem)] leading-[0.9] tracking-tighter font-display font-black">
                  gmoriki
                </h1>
                <p className="text-[clamp(1.5rem,4vw,3rem)] leading-tight font-display font-semibold mt-4 text-primary">
                  AI人材育成
                </p>
              </div>
              <div className="border-t-2 border-foreground/20 pt-6 max-w-2xl">
                <p className="text-xl md:text-2xl font-body leading-relaxed">
                  AIとヒトをつなぎ、誰もが技術の恩恵を受けられる社会を創る
                </p>
              </div>
            </div>
          </div>

          {/* Side Info */}
          <div className="col-span-12 lg:col-span-4 lg:pt-32">
            <div className="space-y-6 border-l-2 border-foreground/20 pl-6">
              <div>
                <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Name</p>
                <p className="text-lg font-body">森木銀河 / Ginga Moriki</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Expertise</p>
                <p className="text-base font-body leading-relaxed">
                  生成AI活用推進 / AI人材育成 / データ分析・システム構築
                </p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Education</p>
                <p className="text-base font-body">教育学修士</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MVV Section */}
      <section className="container pb-16">
        <Card 
          className="cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 border-foreground/10 bg-accent/30"
          onClick={() => openDetail(mvvContent)}
        >
          <CardContent className="p-8 md:p-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">
              Mission · Vision · Values
            </h2>
            <div className="editorial-grid">
              <div className="col-span-12 md:col-span-4 space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="text-xl font-display font-semibold mb-2">Mission</h3>
                  <p className="text-base font-body text-muted-foreground leading-relaxed">
                    AIとヒトをつなぎ、誰もが技術の恩恵を受けられる社会を創る
                  </p>
                </div>
              </div>
              <div className="col-span-12 md:col-span-4 space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="text-xl font-display font-semibold mb-2">Vision</h3>
                  <p className="text-base font-body text-muted-foreground leading-relaxed">
                    AIエージェントの園芸家を育て、自律的に成長するエコシステムを創る
                  </p>
                </div>
              </div>
              <div className="col-span-12 md:col-span-4 space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="text-xl font-display font-semibold mb-2">Values</h3>
                  <p className="text-base font-body text-muted-foreground leading-relaxed">
                    社会正義・ナレッジ共有・相互支援
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Main Content Grid */}
      <section className="container pb-16">
        <div className="editorial-grid">
          {/* Expertise Card - Spans 7 columns */}
          <div className="col-span-12 lg:col-span-7">
            <Card 
              className="cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 border-foreground/10 h-full"
              onClick={() => openDetail(expertiseContent)}
            >
              <CardContent className="p-8 md:p-10">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 border-b-2 border-foreground/10 pb-4">
                  専門性
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-2">生成AI活用推進</h3>
                    <p className="text-base font-body text-muted-foreground leading-relaxed">
                      大企業の現場で生成AI活用を推進。業務フローにAIを組み込む。
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-2">AI人材育成</h3>
                    <p className="text-base font-body text-muted-foreground leading-relaxed">
                      SPADEスキルを体系化。全国の大学で研修・講演を実施。
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-2">データ分析・システム構築</h3>
                    <p className="text-base font-body text-muted-foreground leading-relaxed">
                      Python, VBA, Tableauなどを使った業務効率化。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements Card - Spans 5 columns */}
          <div className="col-span-12 lg:col-span-5">
            <Card 
              className="cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 border-foreground/10 h-full bg-primary/5"
              onClick={() => openDetail(achievementsContent)}
            >
              <CardContent className="p-8 md:p-10">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 border-b-2 border-foreground/10 pb-4">
                  実績
                </h2>
                <ul className="space-y-4 text-base font-body">
                  <li className="leading-relaxed">業務時間50%削減<br/><span className="text-sm text-muted-foreground">東京都市大学</span></li>
                  <li className="leading-relaxed">教員業績管理システムPM<br/><span className="text-sm text-muted-foreground">九州大学</span></li>
                  <li className="leading-relaxed">生成AIコーディネーター養成講座<br/><span className="text-sm text-muted-foreground">愛媛大学</span></li>
                  <li className="leading-relaxed">全国の大学で研修・講演多数</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Services Card - Spans 5 columns */}
          <div className="col-span-12 lg:col-span-5">
            <Card 
              className="cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 border-foreground/10 h-full"
              onClick={() => openDetail(servicesContent)}
            >
              <CardContent className="p-8 md:p-10">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 border-b-2 border-foreground/10 pb-4">
                  サービス
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-display font-semibold mb-1">大学向け研修</h3>
                    <p className="text-sm font-body text-muted-foreground">生成AIコーディネーター養成講座など</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-semibold mb-1">企業向けアドバイザリー</h3>
                    <p className="text-sm font-body text-muted-foreground">継続的な伴走支援</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-semibold mb-1">講演・ワークショップ</h3>
                    <p className="text-sm font-body text-muted-foreground">予算に応じた形式</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-semibold mb-1">オンライン教材</h3>
                    <p className="text-sm font-body text-muted-foreground">買い切り型の教材</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Career Card - Spans 7 columns */}
          <div className="col-span-12 lg:col-span-7">
            <Card className="border-2 border-foreground/10 h-full bg-secondary/30">
              <CardContent className="p-8 md:p-10">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 border-b-2 border-foreground/10 pb-4">
                  キャリア
                </h2>
                <div className="space-y-6">
                  <div className="border-l-2 border-primary pl-4">
                    <p className="text-sm text-muted-foreground mb-1">2025/01 - 現在</p>
                    <p className="text-lg font-display font-semibold">民間企業</p>
                    <p className="text-base font-body text-muted-foreground">生成AI活用推進</p>
                  </div>
                  <div className="border-l-2 border-primary pl-4">
                    <p className="text-sm text-muted-foreground mb-1">2024/05 - 現在</p>
                    <p className="text-lg font-display font-semibold">愛媛大学</p>
                    <p className="text-base font-body text-muted-foreground">プロジェクトフェロー</p>
                  </div>
                  <div className="border-l-2 border-muted-foreground/30 pl-4">
                    <p className="text-sm text-muted-foreground mb-1">2021/11 - 2025/01</p>
                    <p className="text-lg font-display font-semibold">九州大学</p>
                    <p className="text-base font-body text-muted-foreground">IR室 学術推進専門員</p>
                  </div>
                  <div className="border-l-2 border-muted-foreground/30 pl-4">
                    <p className="text-sm text-muted-foreground mb-1">2019/04 - 2021/10</p>
                    <p className="text-lg font-display font-semibold">東京都市大学</p>
                    <p className="text-base font-body text-muted-foreground">専任事務職員</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="border-t-2 border-foreground/10 py-16 md:py-24">
        <div className="container">
          <div className="editorial-grid">
            <div className="col-span-12 lg:col-span-8">
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
                お問い合わせ
              </h2>
              <p className="text-xl font-body leading-relaxed mb-10 max-w-2xl">
                研修・講演・アドバイザリーのご依頼、その他お問い合わせは、noteまたはXのDMでお気軽にご連絡ください。
              </p>
              <div className="flex gap-4 flex-wrap">
                <Button 
                  asChild 
                  size="lg" 
                  className="text-lg px-8 py-6 font-body border-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
                  variant="outline"
                >
                  <a href="https://note.com/pogohopper8" target="_blank" rel="noopener noreferrer">
                    note
                  </a>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  className="text-lg px-8 py-6 font-body border-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
                  variant="outline"
                >
                  <a href="https://twitter.com/pogohopper8" target="_blank" rel="noopener noreferrer">
                    X (Twitter)
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-foreground/10 py-8">
        <div className="container">
          <p className="text-sm text-muted-foreground font-body">
            © 2025 Ginga Moriki. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Detail Dialog */}
      <Dialog open={!!selectedDetail} onOpenChange={closeDetail}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto border-2 border-foreground/20">
          <DialogHeader>
            <DialogTitle className="text-3xl font-display font-bold">{selectedDetail?.title}</DialogTitle>
            <DialogDescription className="text-lg font-body">
              {selectedDetail?.description}
            </DialogDescription>
          </DialogHeader>
          {selectedDetail?.items && (
            <ul className="space-y-4 text-base font-body leading-relaxed">
              {selectedDetail.items.map((item, index) => (
                <li key={index} className="border-l-2 border-primary pl-4">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
