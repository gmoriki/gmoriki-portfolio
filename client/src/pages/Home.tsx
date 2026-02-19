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
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" },
};

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
              <h2 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-primary" style={{ marginTop: '35px' }}>
                職場としての大学に、AI人材育成を。
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-foreground max-w-3xl leading-relaxed">
              AIとヒトの共生環境を築き、普遍的価値を探求する「場」を守り抜く
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full border-t border-border">
        <div className="container max-w-6xl mx-auto py-16 md:py-24">
          <motion.div {...fadeInUp} className="grid md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-start">
            <img
              src="/gmoriki.png"
              alt="森木銀河"
              className="w-32 h-32 md:w-48 md:h-48 object-cover"
            />
            <div className="space-y-4">
              <h3 className="font-display text-3xl md:text-4xl font-bold">ABOUT</h3>
              <p className="text-lg md:text-xl leading-relaxed font-semibold">森木 銀河</p>
              <p className="text-sm text-muted-foreground">もりき ぎんが</p>
              <p className="text-base md:text-lg leading-relaxed text-foreground">
                gmoriki 代表。民間企業にて生成AI活用推進に従事する傍ら、個人事業主として大学・教育機関のAI人材育成を手がける。私立・国立大学職員としての実務経験を持ち、大学という組織特有の文化や課題に精通していることが強み。教員・職員双方を対象とした研修企画、登壇、アドバイジングなど、現場に即した実践的なAI活用支援を行っている。
              </p>
              <div className="pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">MISSION · VISION · VALUES</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle className="font-display text-2xl md:text-3xl">MISSION · VISION · VALUES</DialogTitle>
                    </DialogHeader>
                    <div className="pt-4">
                      <img
                        src="/mvv-slide.png"
                        alt="Mission, Vision, Values"
                        className="w-full h-auto"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="expertise" className="w-full border-t border-border">
        <div className="container max-w-6xl mx-auto py-16 md:py-24">
          <div className="space-y-8">
            <motion.div {...fadeInUp}>
              <h3 className="font-display text-4xl md:text-5xl font-bold mb-4">SERVICES</h3>
              <div className="space-y-2">
                <h4 className="font-display text-xl md:text-2xl font-semibold text-primary">
                  AI人材開発 / AI組織開発
                </h4>
                <p className="text-lg md:text-xl leading-relaxed text-foreground max-w-3xl">
                  生成AIを実務で活用できる人材を育成し、組織のAI導入を推進します。大学・教育機関向けの研修プログラムを通じて、実践的なスキルを習得できる環境を提供しています。また、組織のAI導入戦略立案やガイドライン策定など、継続的な伴走支援も行っています。
                </p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* 研修 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
              >
                <Card className="p-8 bg-card flex flex-col gap-6 h-full">
                  <div className="space-y-3">
                    <h6 className="font-display text-lg md:text-xl font-bold">📚 研修</h6>
                    <p className="text-base md:text-lg text-foreground">
                      大学のFD/SDのほか、教育機関・企業向けの生成AI研修プログラム。実務で使える実践的な内容を提供。
                    </p>
                  </div>
                  <div className="mt-auto flex flex-col items-center">
                    <div className="w-full max-w-md mx-auto">
                      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center py-8">
                        <div className="flex flex-col items-center gap-3">
                          <img src="/training-before.png" alt="知識習得段階" className="w-24 h-24 object-contain" />
                        </div>
                        <svg className="w-12 h-12 flex-shrink-0" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 24h32m-8-8l8 8-8 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-primary" style={{ stroke: "oklch(0.35 0.08 160)" }} />
                        </svg>
                        <div className="flex flex-col items-center gap-3">
                          <img src="/training-after.png" alt="行動変容・インパクト創出" className="w-24 h-24 object-contain" />
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-center mt-2 text-muted-foreground">行動変容によるインパクト創出</p>
                  </div>
                </Card>
              </motion.div>

              {/* アドバイザリー */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              >
                <Card className="p-8 bg-card flex flex-col gap-6 h-full">
                  <div className="space-y-3">
                    <h6 className="font-display text-lg md:text-xl font-bold">🤝 アドバイザリー</h6>
                    <p className="text-base md:text-lg text-foreground">
                      組織のAI導入戦略立案、ガイドライン策定、AI活用コミュニティ運用、研修改善。
                    </p>
                  </div>
                  <div className="mt-auto flex flex-col items-center">
                    <div className="w-full max-w-md mx-auto">
                      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center py-8">
                        <div className="flex flex-col items-center gap-3">
                          <img src="/advisory-before.png" alt="場当たり的アプローチ" className="w-24 h-24 object-contain" />
                        </div>
                        <svg className="w-12 h-12 flex-shrink-0" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 24h32m-8-8l8 8-8 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "oklch(0.35 0.08 160)" }} />
                        </svg>
                        <div className="flex flex-col items-center gap-3">
                          <img src="/advisory-after.png" alt="体系的戦略・継続改善" className="w-24 h-24 object-contain" />
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-center mt-2 text-muted-foreground">研修の改善や戦略支援</p>
                  </div>
                </Card>
              </motion.div>

              {/* 講演・ワークショップ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              >
                <Card className="p-8 bg-card flex flex-col gap-6 h-full">
                  <div className="space-y-3">
                    <h6 className="font-display text-lg md:text-xl font-bold">🎤 講演・ワークショップ</h6>
                    <p className="text-base md:text-lg text-foreground">
                      生成AIの最新動向、大学DX、AI人材育成に関する講演・ワークショップ。
                    </p>
                  </div>
                  <div className="mt-auto flex flex-col items-center">
                    <div className="w-full max-w-md mx-auto">
                      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center py-8">
                        <div className="flex flex-col items-center gap-3">
                          <img src="/lecture-before.png" alt="機運なし" className="w-24 h-24 object-contain" />
                        </div>
                        <svg className="w-12 h-12 flex-shrink-0" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 24h32m-8-8l8 8-8 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "oklch(0.35 0.08 160)" }} />
                        </svg>
                        <div className="flex flex-col items-center gap-3">
                          <img src="/lecture-after.png" alt="対話・気づき・推進の契機" className="w-24 h-24 object-contain" />
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-center mt-2 text-muted-foreground">機会創出</p>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section id="works" className="w-full border-t border-border">
        <div className="container max-w-6xl mx-auto py-16 md:py-24">
          <div className="space-y-8">
            <motion.h3 {...fadeInUp} className="font-display text-3xl md:text-4xl font-bold">WORKS</motion.h3>
            <Card className="p-8 md:p-12 bg-card">
              <WorksStats />
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full border-t border-border">
        <div className="container max-w-6xl mx-auto py-16 md:py-24">
          <div className="space-y-8">
            <motion.h3 {...fadeInUp} className="font-display text-3xl md:text-4xl font-bold">CONTACT</motion.h3>
            <Card className="p-8 md:p-12 bg-card">
              <p className="text-lg md:text-xl text-foreground mb-6">
                研修・講演・アドバイザリーのご依頼、その他お問い合わせは、以下の方法でお気軽にご連絡ください。
              </p>
              <div className="mb-6 p-4 bg-accent/30">
                <p className="text-base md:text-lg text-foreground">
                  🌱 <a href="https://gmoriki.notion.site/uekibachi" target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:no-underline text-primary">うえきばちポータル</a>では、AI活用のヒントや研修資料、大学職員向けのお役立ち情報など、様々な補足コンテンツを公開しています。ぜひご覧ください。
                </p>
              </div>
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

      {/* Footer */}
      <footer className="w-full border-t border-border">
        <div className="container max-w-6xl mx-auto py-8">
          <p className="text-sm text-muted-foreground">
            © 2026 gmoriki. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
