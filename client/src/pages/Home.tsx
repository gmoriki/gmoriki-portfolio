import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import WorksStats from "@/components/WorksStats";
import Navigation from "@/components/Navigation";
import { Mail } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Section */}
      <section className="w-full" style={{ paddingTop: '80px' }}>
        <div className="container max-w-6xl mx-auto py-24 md:py-32">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="font-display text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight">
                gmoriki
              </h1>
              <h2 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold" style={{ color: "oklch(0.35 0.08 160)", marginTop: '35px' }}>
                職場としての大学に、AI人材育成を。
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-foreground max-w-3xl leading-relaxed">
              AIとヒトをつなぎ、誰もが技術の恩恵を受けられる社会を創る
            </p>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="w-full">
        <div className="container max-w-6xl mx-auto py-16 md:py-24">
          <div className="space-y-8">
          <h3 className="font-display text-4xl md:text-5xl font-bold mb-8">SERVICES</h3>          
            <Card className="p-8 md:p-12 bg-card">
              <div className="space-y-6">
                <div>
                  <h4 className="font-display text-2xl md:text-3xl font-bold mb-4" style={{ color: "oklch(0.35 0.08 160)" }}>
                    AI人材開発 / AI組織開発
                  </h4>
                  <p className="text-lg md:text-xl leading-relaxed text-foreground mb-6">
                    生成AIを実務で活用できる人材を育成し、組織のAI導入を推進します。大学・教育機関向けの研修プログラムを通じて、実践的なスキルを習得できる環境を提供しています。
                  </p>
                  <p className="text-lg md:text-xl leading-relaxed text-foreground">
                    また、組織のAI導入戦略立案やガイドライン策定など、継続的な伴走支援も行っています。
                  </p>
                </div>

                <div className="border-t pt-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h6 className="font-display text-lg md:text-xl font-bold">📚 研修</h6>
                      <p className="text-base md:text-lg text-foreground">
                        大学のFD/SDのほか、教育機関・企業向けの生成AI研修プログラム。実務で使える実践的な内容を提供。
                      </p>
                      <div className="mt-4 flex flex-col items-center">
                        <img src="/service-training-impact-v4.png" alt="知識から行動変容・インパクト創出へ" className="w-[70%] h-auto" />
                        <p className="text-sm text-center mt-2 text-muted-foreground">行動変容によるインパクト創出</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h6 className="font-display text-lg md:text-xl font-bold">🤝 アドバイザリー</h6>
                      <p className="text-base md:text-lg text-foreground">
                        組織のAI導入戦略立案、ガイドライン策定、AI活用コミュニティ運用、研修改善。
                      </p>
                      <div className="mt-4 flex flex-col items-center">
                        <img src="/service-advisory-strategy-v4.png" alt="場当たり的から体系的戦略・継続改善へ" className="w-[70%] h-auto" />
                        <p className="text-sm text-center mt-2 text-muted-foreground">研修の改善や戦略支援</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h6 className="font-display text-lg md:text-xl font-bold">🎤 講演・ワークショップ</h6>
                      <p className="text-base md:text-lg text-foreground">
                        生成AIの最新動向、大学DX、AI人材育成に関する講演・ワークショップ。
                      </p>
                      <div className="mt-4 flex flex-col items-center">
                        <img src="/service-lecture-opportunity-v4.png" alt="機運なしから対話・気づき・推進の契機へ" className="w-[70%] h-auto" />
                        <p className="text-sm text-center mt-2 text-muted-foreground">機会創出</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section id="works" className="w-full">
        <div className="container max-w-6xl mx-auto py-16 md:py-24">
          <div className="space-y-8">
            <h3 className="font-display text-3xl md:text-4xl font-bold">WORKS</h3>
            <Card className="p-8 md:p-12 bg-card">
              <WorksStats />
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full">
        <div className="container max-w-6xl mx-auto py-16 md:py-24">
          <div className="space-y-8">
            <h3 className="font-display text-3xl md:text-4xl font-bold">CONTACT</h3>
            <Card className="p-8 md:p-12 bg-card">
              <p className="text-lg md:text-xl text-foreground mb-6">
                研修・講演・アドバイザリーのご依頼、その他お問い合わせは、以下の方法でお気軽にご連絡ください。
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="text-lg">
                  <a href="mailto:info@gmoriki.com">
                    <Mail className="mr-2 h-5 w-5" />
                    Email
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg">
                  <a href="https://note.com/pogohopper8" target="_blank" rel="noopener noreferrer">
                    note
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg">
                  <a href="https://x.com/pogohopper8" target="_blank" rel="noopener noreferrer">
                    X (Twitter)
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* About & MVV - Dialog Triggers */}
      <section className="w-full">
        <div className="container max-w-6xl mx-auto py-12 md:py-16">
          <div className="flex flex-wrap gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-11 px-8 text-lg">
                  ABOUT ME
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl md:text-3xl">ABOUT ME</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 pt-4">
                  <div className="flex items-start gap-6">
                    <img 
                      src="/gmoriki.png" 
                      alt="森木銀河" 
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="space-y-4">
                      <p className="text-lg md:text-xl leading-relaxed font-semibold">
                        森木 銀河(もりき・ぎんが)
                      </p>
                        <p className="text-base md:text-lg leading-relaxed text-foreground">
                          gmoriki 代表。民間企業にて生成AI活用推進に従事する働ら、個人事業主として大学・教育機関のAI人材育成を手がける。私立・国立大学職員としての実務経験を持ち、大学という組織特有の文化や課題に精通していることが強み。教員・職員双方を対象とした研修企画、登壇、アドバイジングなど、現場に即した実践的なAI活用支援を行っている。
                        </p>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-11 px-8 text-lg">
                  MISSION · VISION · VALUES
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl md:text-3xl">MISSION · VISION · VALUES</DialogTitle>
                </DialogHeader>
                <div className="pt-4">
                  <img 
                    src="/mvv-slide.png" 
                    alt="Mission, Vision, Values" 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t">
        <div className="container max-w-6xl mx-auto py-8">
          <p className="text-sm text-muted-foreground">
            © 2025 Ginga Moriki. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
