import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sparkles, Target, Heart, BookOpen, Award, Users, ExternalLink } from "lucide-react";

interface DetailContent {
  title: string;
  description: string;
  items?: string[];
  link?: string;
}

export default function Home() {
  const [selectedDetail, setSelectedDetail] = useState<DetailContent | null>(null);

  const openDetail = (content: DetailContent) => {
    setSelectedDetail(content);
  };

  const closeDetail = () => {
    setSelectedDetail(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            森木銀河
            <span className="block text-2xl md:text-3xl font-normal text-muted-foreground mt-4">
              Ginga Moriki
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            AIとヒトをつなぎ、誰もが技術の恩恵を受けられる社会を創る
          </p>
          <div className="flex flex-wrap gap-3">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              AI人材・組織開発
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              生成AI活用推進
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              教育学修士
            </Badge>
          </div>
        </div>
      </section>

      {/* MVV Section */}
      <section className="container pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            className="p-8 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/50"
            onClick={() =>
              openDetail({
                title: "Mission",
                description:
                  "AIとヒトをつなぎ、誰もが技術の恩恵を受けられる社会を創る。生成AIという革新的な技術と、それを使う人々の間に立ち、技術の民主化を実現します。",
                items: [
                  "組織導入支援：現場の業務フローにAIを組み込む",
                  "人材育成：SPADEスキルを持つAIエージェントの園芸家を育成",
                  "エコシステム構築：相互支援のネットワークを創る",
                ],
              })
            }
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold">Mission</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AIとヒトをつなぎ、誰もが技術の恩恵を受けられる社会を創る
            </p>
          </Card>

          <Card
            className="p-8 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/50"
            onClick={() =>
              openDetail({
                title: "Vision",
                description:
                  "AIエージェントの園芸家を育て、自律的に成長するエコシステムを創る。私がいなくても回る仕組みを目指します。",
                items: [
                  "界隈のアイコン（現在）：道を示す存在として機能",
                  "園芸家の育成（1-3年後）：次世代のAIエージェント育成者を育てる",
                  "エコシステム自律化（3-5年後）：自己組織化するコミュニティの実現",
                ],
              })
            }
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold">Vision</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AIエージェントの園芸家を育て、自律的に成長するエコシステムを創る
            </p>
          </Card>

          <Card
            className="p-8 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/50"
            onClick={() =>
              openDetail({
                title: "Values",
                description: "3つの価値観を軸に活動しています。",
                items: [
                  "社会正義：困っている人から貪らない。持続可能な支援を重視。",
                  "ナレッジ共有：知識は共有されるべき。オープンな教材提供とコミュニティ醸成。",
                  "相互支援：Give & Giveの精神。長期的な信頼関係を構築。",
                ],
              })
            }
          >
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold">Values</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              社会正義・ナレッジ共有・相互支援
            </p>
          </Card>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="container pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {/* 専門性 */}
          <Card
            className="p-8 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/50 md:col-span-2"
            onClick={() =>
              openDetail({
                title: "専門性",
                description:
                  "生成AI活用推進、AI人材育成、データ分析・システム構築の3つの軸で活動しています。",
                items: [
                  "生成AI活用推進：大企業の現場で生成AI活用を推進。業務フローにAIを組み込み、実際に使われるツールを開発。",
                  "AI人材育成：SPADEスキル（Structuring, Prompting, Analyzing, Debugging, Evolving）を体系化。全国の大学で研修・講演を実施。",
                  "データ分析・システム構築：Python, VBA, Tableau, KH Coderなどを使った業務効率化。報告業務50%削減の実績。",
                ],
              })
            }
          >
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-7 h-7 text-primary" />
              <h3 className="text-2xl font-semibold">専門性</h3>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">生成AI活用推進</h4>
                <p className="text-sm text-muted-foreground">
                  大企業の現場で生成AI活用を推進。業務フローにAIを組み込む。
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">AI人材育成</h4>
                <p className="text-sm text-muted-foreground">
                  SPADEスキルを体系化。全国の大学で研修・講演を実施。
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">データ分析・システム構築</h4>
                <p className="text-sm text-muted-foreground">
                  Python, VBA, Tableauなどを使った業務効率化。
                </p>
              </div>
            </div>
          </Card>

          {/* 実績 */}
          <Card
            className="p-8 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/50"
            onClick={() =>
              openDetail({
                title: "主な実績",
                description: "大学職員、IR室、民間企業での実績をご紹介します。",
                items: [
                  "東京都市大学：VBAで業務時間50%削減。物品台帳システム構築。",
                  "九州大学：教員の研究時間確保のためのエフォート分析。教員業績管理システムリプレースのPM。",
                  "愛媛大学：生成AIコーディネーター養成講座を立ち上げ。修了生が他大学の研修に登壇。",
                  "全国の大学：文京学院大学、早稲田大学など、全国の大学で研修・講演を実施。",
                  "生成AIポリシー分析：2023年5月時点で大学の生成AIポリシーを収集・分析し、公表。",
                ],
              })
            }
          >
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-7 h-7 text-primary" />
              <h3 className="text-2xl font-semibold">実績</h3>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>業務時間50%削減（東京都市大学）</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>教員業績管理システムPM（九州大学）</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>生成AIコーディネーター養成講座（愛媛大学）</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>全国の大学で研修・講演多数</span>
              </li>
            </ul>
          </Card>

          {/* サービスメニュー */}
          <Card
            className="p-8 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/50 lg:col-span-2"
            onClick={() =>
              openDetail({
                title: "サービスメニュー",
                description:
                  "大学・教育機関、企業向けに以下のサービスを提供しています。",
                items: [
                  "大学向け研修パッケージ：生成AIコーディネーター養成講座など、組織全体のAI活用を推進する研修プログラム。",
                  "企業向けアドバイザリー：継続的な伴走支援。現場の業務フローにAIを組み込む。",
                  "講演・ワークショップ：対面講演（5-10万円）、半日ワークショップ（10-15万円）など、予算に応じた形式を提供。",
                  "オンライン教材：買い切り型の教材提供（サブスクなし）。知識の体系化と共有。",
                  "社会貢献枠：年間2-3件、学生団体・NPO・小規模大学などを対象に低予算で対応。",
                ],
              })
            }
          >
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-7 h-7 text-primary" />
              <h3 className="text-2xl font-semibold">サービスメニュー</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">大学向け研修</h4>
                <p className="text-sm text-muted-foreground">
                  生成AIコーディネーター養成講座など
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">企業向けアドバイザリー</h4>
                <p className="text-sm text-muted-foreground">継続的な伴走支援</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">講演・ワークショップ</h4>
                <p className="text-sm text-muted-foreground">予算に応じた形式</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">オンライン教材</h4>
                <p className="text-sm text-muted-foreground">買い切り型の教材</p>
              </div>
            </div>
          </Card>

          {/* キャリア */}
          <Card className="p-8 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/50">
            <h3 className="text-xl font-semibold mb-6">キャリア</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-semibold">2025/01 - 現在</p>
                <p className="text-muted-foreground">民間企業</p>
                <p className="text-xs text-muted-foreground mt-1">
                  生成AI活用推進
                </p>
              </div>
              <div>
                <p className="font-semibold">2024/05 - 現在</p>
                <p className="text-muted-foreground">愛媛大学</p>
                <p className="text-xs text-muted-foreground mt-1">
                  プロジェクトフェロー
                </p>
              </div>
              <div>
                <p className="font-semibold">2021/11 - 2025/01</p>
                <p className="text-muted-foreground">九州大学</p>
                <p className="text-xs text-muted-foreground mt-1">
                  IR室 学術推進専門員
                </p>
              </div>
              <div>
                <p className="font-semibold">2019/04 - 2021/10</p>
                <p className="text-muted-foreground">東京都市大学</p>
                <p className="text-xs text-muted-foreground mt-1">
                  専任事務職員
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container pb-24">
        <Card className="p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">お問い合わせ</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            研修・講演・アドバイザリーのご依頼、その他お問い合わせは、noteまたはXのDMでお気軽にご連絡ください。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <a
                href="https://note.com/pogohopper8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                note
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a
                href="https://twitter.com/pogohopper8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                X (Twitter)
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </Card>
      </section>

      {/* Detail Dialog */}
      <Dialog open={!!selectedDetail} onOpenChange={closeDetail}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedDetail?.title}</DialogTitle>
            <DialogDescription className="text-base leading-relaxed pt-4">
              {selectedDetail?.description}
            </DialogDescription>
          </DialogHeader>
          {selectedDetail?.items && (
            <div className="space-y-3 pt-4">
              {selectedDetail.items.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-primary mt-1 flex-shrink-0">•</span>
                  <p className="text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
