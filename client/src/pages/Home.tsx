import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import WorksStats from "@/components/WorksStats";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="font-display text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight">
              gmoriki
            </h1>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-accent">
              AI人材育成
            </h2>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
            AIとヒトをつなぎ、誰もが技術の恩恵を受けられる社会を創る
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="container py-12 md:py-16">
        <Card className="p-8 md:p-12 bg-card">
          <div className="space-y-4">
            <h3 className="font-display text-2xl md:text-3xl font-bold">ABOUT</h3>
            <p className="text-lg md:text-xl leading-relaxed">
              森木 銀河（もりき・ぎんが）
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              gmoriki代表。民間企業で生成AIの活用推進を担当。個人事業主として大学のDX支援やAI人材育成を手がける。「AIとヒトをつなぐ」を信条に、企業とアカデミア、二つの領域で実践的なAI導入を推進している。
            </p>
          </div>
        </Card>
      </section>

      {/* MVV Section */}
      <section className="container py-12 md:py-16">
        <div className="space-y-8">
          <h3 className="font-display text-3xl md:text-4xl font-bold">MISSION · VISION · VALUES</h3>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="/mvv-slide.png" 
              alt="Mission, Vision, Values" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="container py-12 md:py-16">
        <div className="space-y-8">
          <h3 className="font-display text-3xl md:text-4xl font-bold">EXPERTISE</h3>
          
          <Card className="p-8 md:p-12 bg-card">
            <div className="space-y-6">
              <div>
                <h4 className="font-display text-2xl md:text-3xl font-bold mb-4 text-accent">
                  AI人材育成
                </h4>
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-6">
                  生成AIを活用できる人材を育成し、組織のAI導入を推進します。SPADE体系（Structuring, Prompting, Analyzing, Debugging, Evolving）を軸に、実践的なスキルを習得できる研修プログラムを提供しています。
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                  また、AgentOps時代に備え、AIエージェントを組織の文化や暗黙知を学ばせる「園芸家」としての人材育成にも取り組んでいます。
                </p>
              </div>

              <div className="border-t pt-6">
                <h5 className="font-display text-xl md:text-2xl font-bold mb-6">提供サービス</h5>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h6 className="font-display text-lg md:text-xl font-bold">研修</h6>
                    <p className="text-base md:text-lg text-muted-foreground">
                      大学・企業向けの生成AI研修プログラム。SPADEスキルを中心に、実務で使える実践的な内容を提供。
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h6 className="font-display text-lg md:text-xl font-bold">アドバイザリー</h6>
                    <p className="text-base md:text-lg text-muted-foreground">
                      組織のAI導入戦略立案、ガイドライン策定、継続的な伴走支援。
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h6 className="font-display text-lg md:text-xl font-bold">講演・ワークショップ</h6>
                    <p className="text-base md:text-lg text-muted-foreground">
                      生成AIの最新動向、大学DX、AI人材育成に関する講演・ワークショップ。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Works Section - Placeholder for dynamic component */}
      <section className="container py-12 md:py-16">
        <div className="space-y-8">
          <h3 className="font-display text-3xl md:text-4xl font-bold">WORKS</h3>
          <Card className="p-8 md:p-12 bg-card">
            <WorksStats />
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container py-12 md:py-16">
        <div className="space-y-8">
          <h3 className="font-display text-3xl md:text-4xl font-bold">CONTACT</h3>
          <Card className="p-8 md:p-12 bg-card">
            <p className="text-lg md:text-xl text-muted-foreground mb-6">
              研修・講演・アドバイザリーのご依頼、その他お問い合わせは、noteまたはXのDMでお気軽にご連絡ください。
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="text-lg">
                <a href="https://note.com/pogohopper8" target="_blank" rel="noopener noreferrer">
                  note
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg">
                <a href="https://x.com/gmoriki" target="_blank" rel="noopener noreferrer">
                  X (Twitter)
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="container py-8 border-t">
        <p className="text-sm text-muted-foreground">
          © 2025 Ginga Moriki. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
