import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Navbar from "@/components/Navbar";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/blog" component={Blog} />
        <Route path="/projects" component={Home} />
        <Route path="/contact" component={Contact} />
        <Route>404 Page Not Found</Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
