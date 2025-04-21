import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import Projects from "@/pages/Projects";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Navbar from "@/components/Navbar";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/blog" component={Blog} />
        <Route path="/projects" component={Projects} />
        <Route path="/contact" component={Contact} />
        <Route>
          <div className="min-h-screen bg-background flex items-center justify-center">
            <h1 className="text-4xl font-bold">404 Page Not Found</h1>
          </div>
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
