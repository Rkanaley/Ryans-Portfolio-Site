import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [_, navigate] = useLocation();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // Close the mobile menu after clicking
    setOpen(false);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation handler that both navigates and closes the menu
  const handleNavigation = (href: string) => {
    navigate(href);
    setOpen(false);
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-sm border-b" : ""
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <span className="text-xl font-bold">RK</span>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Button key={item.label} variant="ghost" asChild>
              {item.href.startsWith('#') ? (
                <a href={item.href} onClick={(e) => handleScroll(e, item.href)}>
                  {item.label}
                </a>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </Button>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <SheetClose key={item.label} asChild>
                    <Button variant="ghost" asChild>
                      {item.href.startsWith('#') ? (
                        <a href={item.href} onClick={(e) => handleScroll(e, item.href)}>
                          {item.label}
                        </a>
                      ) : (
                        <a onClick={() => handleNavigation(item.href)}>
                          {item.label}
                        </a>
                      )}
                    </Button>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
