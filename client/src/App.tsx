import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from "@/pages/Blog";
import BlogPostPage from "@/pages/Blog/[slug]"; // ✅ Match folder + filename
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import Contact from "@/pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} /> {/* ✅ Matches the folder */}
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-background flex items-center justify-center">
              <h1 className="text-4xl font-bold">404 Page Not Found</h1>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
