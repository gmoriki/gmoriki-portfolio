import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import WorksStats from "@/components/WorksStats";
import { motion } from "framer-motion";
import { works, computeStats } from "@/data/works-data";

const allStats = computeStats(works);
const lectureCount = allStats.find(s => s.label === "講演・研修")?.value ?? 0;
const uniCount = new Set(works.filter(w => w.university).map(w => w.university)).size;

const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function Works() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="w-full" style={{ paddingTop: "80px" }}>
        <div className="container max-w-6xl mx-auto py-16 md:py-24">
          <motion.div {...fadeInUp} className="space-y-3 mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Portfolio</p>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight">WORKS</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              全国の大学・教育機関にて講演・研修・アドバイザリーを展開。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container max-w-6xl mx-auto py-10 px-4 md:px-8 flex gap-16">
          <div className="space-y-1">
            <p className="font-display text-4xl md:text-5xl font-bold">{lectureCount}+</p>
            <p className="text-sm opacity-80">講演・研修</p>
          </div>
          <div className="space-y-1">
            <p className="font-display text-4xl md:text-5xl font-bold">{uniCount}+</p>
            <p className="text-sm opacity-80">全国の大学・機関</p>
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto py-16 md:py-24 px-4 md:px-8">
        <WorksStats />
      </div>

      <footer className="w-full border-t border-border">
        <div className="container max-w-6xl mx-auto py-8">
          <p className="text-sm text-muted-foreground">© 2026 gmoriki. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
