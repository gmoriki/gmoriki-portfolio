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
              className="hover:opacity-70 transition-opacity"
            >
              <img 
                src="/logo.png" 
                alt="gmoriki" 
                className="h-8 md:h-10 w-auto"
              />
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
                    MVV
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
                      className="w-full h-auto"
                    />
                  </div>
                </DialogContent>
              </Dialog>

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
                          森木 銀河
                        </p>
                        <p className="text-sm md:text-base text-muted-foreground mb-2">
                          もりき ぎんが
                        </p>
                        <p className="text-base md:text-lg leading-relaxed text-foreground">
                          gmoriki 代表。民間企業にて生成AI活用推進に従事する傍ら、個人事業主として大学・教育機関のAI人材育成を手がける。私立・国立大学職員としての実務経験を持ち、大学という組織特有の文化や課題に精通していることが強み。教員・職員双方を対象とした研修企画、登壇、アドバイジングなど、現場に即した実践的なAI活用支援を行っている。
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
                  <button className="text-left text-base font-medium hover:opacity-70 transition-opacity py-2">
                    MVV
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
                      className="w-full h-auto"
                    />
                  </div>
                </DialogContent>
              </Dialog>
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
                          森木 銀河
                        </p>
                        <p className="text-sm md:text-base text-muted-foreground mb-2">
                          もりき ぎんが
                        </p>
                        <p className="text-base md:text-lg leading-relaxed text-foreground">
                          gmoriki 代表。民間企業にて生成AI活用推進に従事する傍ら、個人事業主として大学・教育機関のAI人材育成を手がける。私立・国立大学職員としての実務経験を持ち、大学という組織特有の文化や課題に精通していることが強み。教員・職員双方を対象とした研修企画、登壇、アドバイジングなど、現場に即した実践的なAI活用支援を行っている。
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
