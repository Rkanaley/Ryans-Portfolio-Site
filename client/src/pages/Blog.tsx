import { blogPosts } from "@/lib/constants";
import BlogCard from "@/components/BlogCard";
import { motion } from "framer-motion";
import PongBackground from "@/components/PongBackground";
import Link from "next/link"; // ✅ Move this up here

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <PongBackground />
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-center mb-8">Blog</h1>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Thoughts, insights, and explorations in web development, technology, and design.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Link href={`/blog/${post.slug}`} key={index}>
                <BlogCard {...post} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
