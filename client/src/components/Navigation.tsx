import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Link } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme, switchable } = useTheme();

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
    } else {
      // Works ページ等からアクセスした場合はホームへ戻る
      window.location.href = `/#${sectionId}`;
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
              <Link href="/works" className="text-base font-medium hover:opacity-70 transition-opacity">
                WORKS
              </Link>
              <button
                onClick={() => scrollToSection("about")}
                className="text-base font-medium hover:opacity-70 transition-opacity"
              >
                ABOUT
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-base font-medium hover:opacity-70 transition-opacity"
              >
                CONTACT
              </button>
              {switchable && toggleTheme && (
                <button
                  onClick={toggleTheme}
                  className="p-2 hover:opacity-70 transition-opacity"
                  aria-label="Toggle dark mode"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              )}
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
              <Link
                href="/works"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-left text-base font-medium hover:opacity-70 transition-opacity py-2"
              >
                WORKS
              </Link>
              <button
                onClick={() => scrollToSection("about")}
                className="text-left text-base font-medium hover:opacity-70 transition-opacity py-2"
              >
                ABOUT
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left text-base font-medium hover:opacity-70 transition-opacity py-2"
              >
                CONTACT
              </button>
              {switchable && toggleTheme && (
                <button
                  onClick={() => { toggleTheme(); setIsMobileMenuOpen(false); }}
                  className="text-left text-base font-medium hover:opacity-70 transition-opacity py-2 flex items-center gap-2"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                  {theme === "dark" ? "ライトモード" : "ダークモード"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
