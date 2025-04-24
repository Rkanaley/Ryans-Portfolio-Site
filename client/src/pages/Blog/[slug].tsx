import { useParams } from "react-router-dom";
import { blogPosts } from "@/lib/constants";
import Head from "next/head";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Post not found.</h1>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} | YourSite</title>
        <meta name="description" content={post.description} />
      </Head>
      <div className="min-h-screen bg-background text-foreground px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-muted-foreground mb-8">{post.description}</p>
          <div className="prose dark:prose-invert">
            {post.component ? <post.component /> : <p>Coming soon...</p>}
          </div>
        </div>
      </div>
    </>
  );
}
