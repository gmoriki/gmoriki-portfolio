import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { ArrowRight, BookOpen, Users, Mic, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { works, computeStats } from "@/data/works-data";

const allStats = computeStats(works);
const lectureCount = allStats.find(s => s.label === "講演・研修")?.value ?? 0;
const uniCount = new Set(works.filter(w => w.university).map(w => w.university)).size;
const featuredWorks = works.filter(w => w.featured).slice(-3).reverse();

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
            <p className="text-xl md:text-2xl text-foreground max-w-2xl leading-relaxed">
              AIとヒトの共生環境を築き、普遍的価値を探求する「場」を守り抜く
            </p>
            <div className="flex gap-12 pt-8 border-t border-border">
              <div className="space-y-1">
                <p className="font-display text-4xl md:text-5xl font-bold text-primary">{lectureCount}+</p>
                <p className="text-sm text-muted-foreground">講演・研修</p>
              </div>
              <div className="space-y-1">
                <p className="font-display text-4xl md:text-5xl font-bold text-primary">{uniCount}+</p>
                <p className="text-sm text-muted-foreground">全国の大学・機関</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="expertise" className="w-full border-t border-border">
        <div className="container max-w-6xl mx-auto py-16 md:py-24">
          <div className="space-y-10">
            <motion.h3 {...fadeInUp} className="font-display text-4xl md:text-5xl font-bold">SERVICES</motion.h3>
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
              >
                <Card className="p-10 bg-card h-full">
                  <div className="space-y-4">
                    <BookOpen className="w-10 h-10 text-primary" />
                    <h6 className="font-display text-xl font-bold">研修</h6>
                    <p className="text-base text-foreground leading-relaxed">
                      大学のFD/SDのほか、教育機関・企業向けの生成AI研修プログラム。実務で使える実践的な内容を提供。
                    </p>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              >
                <Card className="p-10 bg-card h-full">
                  <div className="space-y-4">
                    <Users className="w-10 h-10 text-primary" />
                    <h6 className="font-display text-xl font-bold">アドバイザリー</h6>
                    <p className="text-base text-foreground leading-relaxed">
                      組織のAI導入戦略立案、ガイドライン策定、AI活用コミュニティ運用、研修改善。
                    </p>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              >
                <Card className="p-10 bg-card h-full">
                  <div className="space-y-4">
                    <Mic className="w-10 h-10 text-primary" />
                    <h6 className="font-display text-xl font-bold">講演・ワークショップ</h6>
                    <p className="text-base text-foreground leading-relaxed">
                      生成AIの最新動向、大学DX、AI人材育成に関する講演・ワークショップ。
                    </p>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full border-t border-border">
        <div className="container max-w-6xl mx-auto py-16 md:py-24">
          <motion.div {...fadeInUp} className="space-y-10">
            <h3 className="font-display text-4xl md:text-5xl font-bold">ABOUT</h3>
            <div className="grid md:grid-cols-[auto_1fr] gap-10 md:gap-24 items-start">
              <img
                src="/gmoriki.png"
                alt="森木銀河"
                className="w-32 h-32 md:w-48 md:h-48 object-cover"
              />
              <div className="space-y-4">
                <p className="text-lg md:text-xl font-semibold">森木 銀河</p>
                <p className="text-sm text-muted-foreground">もりき ぎんが</p>
                <p className="text-base md:text-lg leading-relaxed text-foreground">
                  国立・私立大学職員の現場経験と民間企業でのAI推進実績を持つ。その二面性を強みに、大学・教育機関のAI人材育成を実践的に支援している。
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-8 bg-card space-y-3">
                <p className="text-xs font-semibold tracking-widest text-muted-foreground">MISSION</p>
                <p className="text-base md:text-lg leading-relaxed text-foreground">
                  AIとヒトの共生環境を築き、普遍的価値を探求する「場」を守り抜く。
                </p>
              </Card>
              <Card className="p-8 bg-primary text-primary-foreground space-y-3">
                <p className="text-xs font-semibold tracking-widest opacity-70">VISION</p>
                <p className="text-base md:text-lg leading-relaxed">
                  自律的なAI群を指揮し、人が本質的な価値創造に集中できる世界。
                </p>
              </Card>
              <Card className="p-8 bg-card space-y-3">
                <p className="text-xs font-semibold tracking-widest text-muted-foreground">VALUES</p>
                <div className="space-y-2">
                  <p className="text-base md:text-lg text-foreground">知恵は共有財にする</p>
                  <p className="text-base md:text-lg text-foreground">同志として助け合う</p>
                  <p className="text-base md:text-lg text-foreground">現場の「実利」をつくる</p>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Works Section */}
      <section id="works" className="w-full border-t border-border relative overflow-hidden">
        <img
          src="/japan-map.jpg"
          alt=""
          aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[560px] opacity-[0.06] pointer-events-none select-none"
        />
        <div className="container max-w-6xl mx-auto py-16 md:py-24 relative z-10">
          <div className="space-y-10">
            <motion.div {...fadeInUp} className="space-y-4">
              <h3 className="font-display text-4xl md:text-5xl font-bold">WORKS</h3>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-muted-foreground">全国 {uniCount}+ の大学・機関で実績 ― 日本地図で全容を見る</p>
                <Link href="/works">
                  <Button size="lg" className="gap-2 text-base px-6">
                    実績をすべて見る <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredWorks.map((work, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                >
                  <Card className="p-6 bg-card h-full flex flex-col gap-3">
                    <div className="flex flex-wrap gap-2">
                      {work.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="inline-block px-2 py-0.5 text-xs font-bold bg-primary text-primary-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{work.date}</p>
                    <p className="text-base font-semibold leading-snug flex-1">
                      {work.link ? (
                        <a href={work.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {work.title}
                        </a>
                      ) : work.title}
                    </p>
                    {work.organization && (
                      <p className="text-sm text-muted-foreground">{work.organization}</p>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full border-t border-border">
        <div className="container max-w-6xl mx-auto py-16 md:py-24">
          <div className="space-y-8">
            <motion.h3 {...fadeInUp} className="font-display text-3xl md:text-4xl font-bold">CONTACT</motion.h3>
            <Card className="p-8 md:p-12 bg-card">
              <div className="mb-6 p-4 bg-accent/30">
                <p className="text-base md:text-lg text-foreground">
                  🌱 <a href="https://gmoriki.notion.site/uekibachi" target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:no-underline text-primary">うえきばちポータル</a>では、AI活用のヒントや研修資料、大学職員向けのお役立ち情報を公開しています。
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
