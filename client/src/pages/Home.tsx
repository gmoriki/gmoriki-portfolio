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
import { Mail } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full">
        <div className="container max-w-6xl mx-auto py-24 md:py-32">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="font-display text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight">
                gmoriki
              </h1>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold" style={{ color: "oklch(0.35 0.08 160)" }}>
                AI人材育成
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-foreground max-w-3xl leading-relaxed">
              AIとヒトをつなぎ、誰もが技術の恩恵を受けられる社会を創る
            </p>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="w-full">
        <div className="container max-w-6xl mx-auto py-16 md:py-24">
          <div className="space-y-8">
            <h3 className="font-display text-3xl md:text-4xl font-bold">EXPERTISE</h3>
            
            <Card className="p-8 md:p-12 bg-card">
              <div className="space-y-6">
                <div>
                  <h4 className="font-display text-2xl md:text-3xl font-bold mb-4" style={{ color: "oklch(0.35 0.08 160)" }}>
                    AI人材育成
                  </h4>
                  <p className="text-lg md:text-xl leading-relaxed text-foreground mb-6">
                    生成AIを実務で活用できる人材を育成し、組織のAI導入を推進します。大学・企業向けの研修プログラムを通じて、実践的なスキルを習得できる環境を提供しています。
                  </p>
                  <p className="text-lg md:text-xl leading-relaxed text-foreground">
                    また、組織のAI導入戦略立案やガイドライン策定など、継続的な伴走支援も行っています。
                  </p>
                </div>

                <div className="border-t pt-6">
                  <h5 className="font-display text-xl md:text-2xl font-bold mb-6">提供サービス</h5>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                      <div className="aspect-square rounded-lg overflow-hidden">
                        <img 
                          src="/service-training.png" 
                          alt="研修サービス" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h6 className="font-display text-lg md:text-xl font-bold">研修</h6>
                      <p className="text-base md:text-lg text-foreground">
                        大学・企業向けの生成AI研修プログラム。実務で使える実践的な内容を提供。
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="aspect-square rounded-lg overflow-hidden">
                        <img 
                          src="/service-advisory.png" 
                          alt="アドバイザリーサービス" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h6 className="font-display text-lg md:text-xl font-bold">アドバイザリー</h6>
                      <p className="text-base md:text-lg text-foreground">
                        組織のAI導入戦略立案、ガイドライン策定、継続的な伴走支援。
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="aspect-square rounded-lg overflow-hidden">
                        <img 
                          src="/service-workshop.png" 
                          alt="講演・ワークショップサービス" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h6 className="font-display text-lg md:text-xl font-bold">講演・ワークショップ</h6>
                      <p className="text-base md:text-lg text-foreground">
                        生成AIの最新動向、大学DX、AI人材育成に関する講演・ワークショップ。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section className="w-full">
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
      <section className="w-full">
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
                  <a href="https://x.com/gmoriki" target="_blank" rel="noopener noreferrer">
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
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <p className="text-2xl md:text-3xl font-bold leading-relaxed" style={{ color: "oklch(0.35 0.08 160)" }}>
                      森木 銀河
                    </p>
                    <p className="text-lg md:text-xl text-muted-foreground">
                      もりき・ぎんが | Ginga Moriki
                    </p>
                  </div>
                  <div className="border-t pt-4 space-y-3">
                    <p className="text-lg md:text-xl leading-relaxed text-foreground">
                      <span className="font-semibold" style={{ color: "oklch(0.35 0.08 160)" }}>gmoriki代表</span>。民間企業で生成AIの活用推進を担当。個人事業主として大学のDX支援やAI人材育成を手がける。
                    </p>
                    <p className="text-lg md:text-xl leading-relaxed text-foreground">
                      「AIとヒトをつなぐ」を信条に、企業とアカデミア、二つの領域で実践的なAI導入を推進している。
                    </p>
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
