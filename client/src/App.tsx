import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import { ThemeProvider } from "@/components/ui/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <Switch>
        <Route path="/" component={Home} />
        <Route>404 Page Not Found</Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
