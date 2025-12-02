import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-sm shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container max-w-6xl mx-auto py-4 px-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-display text-xl md:text-2xl font-bold hover:opacity-70 transition-opacity"
            >
              gmoriki
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollToSection("expertise")}
                className="text-base font-medium hover:opacity-70 transition-opacity"
              >
                SERVICES
              </button>
              <button
                onClick={() => scrollToSection("works")}
                className="text-base font-medium hover:opacity-70 transition-opacity"
              >
                WORKS
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-base font-medium hover:opacity-70 transition-opacity"
              >
                CONTACT
              </button>

              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-base font-medium hover:opacity-70 transition-opacity">
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
                          gmoriki代表。民間企業で生成AIの活用推進を担当。個人事業主として大学のDX支援やAI人材育成を手がける。「AIとヒトをつなぐ」を信条に、企業とアカデミア、二つの領域で実践的なAI導入を推進している。
                        </p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-accent rounded-md transition-colors z-50"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed top-[72px] left-0 right-0 bg-background border-b border-border shadow-lg z-40 md:hidden">
          <div className="container max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("expertise")}
                className="text-left text-base font-medium hover:opacity-70 transition-opacity py-2"
              >
                SERVICES
              </button>
              <button
                onClick={() => scrollToSection("works")}
                className="text-left text-base font-medium hover:opacity-70 transition-opacity py-2"
              >
                WORKS
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left text-base font-medium hover:opacity-70 transition-opacity py-2"
              >
                CONTACT
              </button>
              <Dialog>
                <DialogTrigger asChild>
                  <button 
                    className="text-left text-base font-medium hover:opacity-70 transition-opacity py-2"
                  >
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
                          gmoriki代表。民間企業で生成AIの活用推進を担当。個人事業主として大学のDX支援やAI人材育成を手がける。「AIとヒトをつなぐ」を信条に、企業とアカデミア、二つの領域で実践的なAI導入を推進している。
                        </p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
