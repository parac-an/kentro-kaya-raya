import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-primary cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              RICHRED
            </h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('articles')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Artikel
            </button>
            <button 
              onClick={() => scrollToSection('videos')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Video
            </button>
            <Button className="bg-primary hover:bg-primary/90">
              Hubungi Kami
            </Button>
          </div>

          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 animate-fade-in">
            <button 
              onClick={() => scrollToSection('articles')}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors font-medium"
            >
              Artikel
            </button>
            <button 
              onClick={() => scrollToSection('videos')}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors font-medium"
            >
              Video
            </button>
            <Button className="w-full bg-primary hover:bg-primary/90">
              Hubungi Kami
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;