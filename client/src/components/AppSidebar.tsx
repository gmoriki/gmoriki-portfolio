import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard, BookOpen, MapPin,
  Star, List, X, Menu, ExternalLink,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "section-overview",  label: "概要",         icon: LayoutDashboard },
  { id: "section-featured",  label: "主要プロダクト", icon: Star },
  { id: "section-content",   label: "コンテンツ",    icon: BookOpen },
  { id: "section-map",       label: "活動マップ",    icon: MapPin },
  { id: "section-log",       label: "全活動記録",    icon: List },
];

// fixed Navigationの高さ(72px) + バッファ8px
function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: "smooth" });
}

function SidebarContent({ onNav }: { onNav?: () => void }) {
  return (
    <div className="flex flex-col h-full">
      {/* ブランド */}
      <div className="px-5 py-6 border-b border-sidebar-border">
        <p className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground mb-1">Portfolio</p>
        <h1 className="text-base font-semibold leading-tight text-foreground">gmoriki</h1>
      </div>

      {/* ナビゲーション */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => { scrollTo(id); onNav?.(); }}
            className={cn(
              "w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm",
              "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent",
              "transition-colors duration-150 text-left"
            )}
          >
            <Icon size={15} className="shrink-0" />
            {label}
          </button>
        ))}
      </nav>

      {/* フッター */}
      <div className="px-4 py-4 border-t border-sidebar-border">
        <a
          href="https://gmoriki.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          gmoriki.com <ExternalLink size={11} />
        </a>
      </div>
    </div>
  );
}

export function AppSidebar() {
  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto">
      <SidebarContent />
    </aside>
  );
}

export function MobileSidebarToggle() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden h-8 w-8"
        onClick={() => setOpen(true)}
        aria-label="メニューを開く"
      >
        <Menu size={16} />
      </Button>

      {/* オーバーレイ */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 md:hidden"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-72 bg-sidebar border-r border-sidebar-border md:hidden flex flex-col">
            <div className="flex justify-end p-3 border-b border-sidebar-border">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setOpen(false)}>
                <X size={16} />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <SidebarContent onNav={() => setOpen(false)} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
