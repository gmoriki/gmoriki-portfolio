import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sparkles, Target, Heart, BookOpen, Award, Users, Briefcase } from "lucide-react";

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
      {/* Hero Section */}
      <section className="container py-20 md:py-28">
        <div className="max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
            森木銀河
            <span className="block text-2xl md:text-4xl font-normal text-muted-foreground mt-6">
              Ginga Moriki
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-10 leading-relaxed">
            AIとヒトをつなぎ、誰もが技術の恩恵を受けられる社会を創る
          </p>
          <div className="flex flex-wrap gap-3">
            <Badge variant="secondary" className="text-base md:text-lg px-5 py-2.5">
              AI人材・組織開発
            </Badge>
            <Badge variant="secondary" className="text-base md:text-lg px-5 py-2.5">
              生成AI活用推進
            </Badge>
            <Badge variant="secondary" className="text-base md:text-lg px-5 py-2.5">
              教育学修士
            </Badge>
          </div>
        </div>
      </section>

      {/* MVV Section - Single Card */}
      <section className="container pb-12">
        <Card 
          className="cursor-pointer hover:shadow-xl transition-all bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-950/20 dark:via-purple-950/15 dark:to-pink-950/20 border-2"
          onClick={() => openDetail(mvvContent)}
        >
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">Mission · Vision · Values</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 md:space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-7 h-7 text-primary" />
                <h3 className="text-xl md:text-2xl font-semibold">Mission</h3>
              </div>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                AIとヒトをつなぎ、誰もが技術の恩恵を受けられる社会を創る
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-7 h-7 text-primary" />
                <h3 className="text-xl md:text-2xl font-semibold">Vision</h3>
              </div>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                AIエージェントの園芸家を育て、自律的に成長するエコシステムを創る
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Heart className="w-7 h-7 text-primary" />
                <h3 className="text-xl md:text-2xl font-semibold">Values</h3>
              </div>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                社会正義・ナレッジ共有・相互支援
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Main Content Grid */}
      <section className="container pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Expertise Card */}
          <Card 
            className="cursor-pointer hover:shadow-xl transition-all"
            onClick={() => openDetail(expertiseContent)}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl">
                <BookOpen className="w-7 h-7 text-primary" />
                専門性
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <h3 className="font-semibold mb-2 text-lg md:text-xl">生成AI活用推進</h3>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  大企業の現場で生成AI活用を推進。業務フローにAIを組み込む。
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-lg md:text-xl">AI人材育成</h3>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  SPADEスキルを体系化。全国の大学で研修・講演を実施。
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-lg md:text-xl">データ分析・システム構築</h3>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Python, VBA, Tableauなどを使った業務効率化。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Achievements Card */}
          <Card 
            className="cursor-pointer hover:shadow-xl transition-all"
            onClick={() => openDetail(achievementsContent)}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl">
                <Award className="w-7 h-7 text-primary" />
                実績
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-base md:text-lg text-muted-foreground">
                <li className="leading-relaxed">• 業務時間50%削減（東京都市大学）</li>
                <li className="leading-relaxed">• 教員業績管理システムPM（九州大学）</li>
                <li className="leading-relaxed">• 生成AIコーディネーター養成講座（愛媛大学）</li>
                <li className="leading-relaxed">• 全国の大学で研修・講演多数</li>
              </ul>
            </CardContent>
          </Card>

          {/* Services Card */}
          <Card 
            className="cursor-pointer hover:shadow-xl transition-all"
            onClick={() => openDetail(servicesContent)}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl">
                <Users className="w-7 h-7 text-primary" />
                サービスメニュー
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <h3 className="font-semibold mb-2 text-base md:text-lg">大学向け研修</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    生成AIコーディネーター養成講座など
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-base md:text-lg">企業向けアドバイザリー</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    継続的な伴走支援
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-base md:text-lg">講演・ワークショップ</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    予算に応じた形式
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-base md:text-lg">オンライン教材</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    買い切り型の教材
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Career Card */}
          <Card className="bg-gradient-to-br from-slate-50/50 via-gray-50/30 to-zinc-50/50 dark:from-slate-950/20 dark:via-gray-950/15 dark:to-zinc-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl">
                <Briefcase className="w-7 h-7 text-primary" />
                キャリア
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <p className="font-semibold text-base md:text-lg mb-1">2025/01 - 現在</p>
                <p className="text-base md:text-lg">民間企業</p>
                <p className="text-sm md:text-base text-muted-foreground">生成AI活用推進</p>
              </div>
              <div>
                <p className="font-semibold text-base md:text-lg mb-1">2024/05 - 現在</p>
                <p className="text-base md:text-lg">愛媛大学</p>
                <p className="text-sm md:text-base text-muted-foreground">プロジェクトフェロー</p>
              </div>
              <div>
                <p className="font-semibold text-base md:text-lg mb-1">2021/11 - 2025/01</p>
                <p className="text-base md:text-lg">九州大学</p>
                <p className="text-sm md:text-base text-muted-foreground">IR室 学術推進専門員</p>
              </div>
              <div>
                <p className="font-semibold text-base md:text-lg mb-1">2019/04 - 2021/10</p>
                <p className="text-base md:text-lg">東京都市大学</p>
                <p className="text-sm md:text-base text-muted-foreground">専任事務職員</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gradient-to-br from-blue-50/40 via-purple-50/30 to-pink-50/40 dark:from-blue-950/15 dark:via-purple-950/10 dark:to-pink-950/15 py-20 md:py-28">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">お問い合わせ</h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            研修・講演・アドバイザリーのご依頼、その他お問い合わせは、noteまたはXのDMでお気軽にご連絡ください。
          </p>
          <div className="flex gap-5 justify-center flex-wrap">
            <Button asChild variant="default" size="lg" className="text-base md:text-lg px-8 py-6">
              <a href="https://note.com/pogohopper8" target="_blank" rel="noopener noreferrer">
                note
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base md:text-lg px-8 py-6">
              <a href="https://twitter.com/pogohopper8" target="_blank" rel="noopener noreferrer">
                X (Twitter)
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Detail Dialog */}
      <Dialog open={!!selectedDetail} onOpenChange={closeDetail}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl">{selectedDetail?.title}</DialogTitle>
            <DialogDescription className="text-base md:text-lg">
              {selectedDetail?.description}
            </DialogDescription>
          </DialogHeader>
          {selectedDetail?.items && (
            <ul className="space-y-4 text-base md:text-lg">
              {selectedDetail.items.map((item, index) => (
                <li key={index} className="leading-relaxed">
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
