import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link href="/" className="text-charcoal/40 text-sm hover:text-charcoal transition-colors mb-4 inline-block">
              ← Back
            </Link>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-900">
              Blog
            </h1>
            <p className="text-amber-700 mt-2">
              Tips, guides, and thoughts on jewelry making for beginners.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {posts.map(post => (
          <article key={post.slug} className="bg-white rounded-2xl p-8 border border-charcoal/5 hover:shadow-sm transition-shadow">
            <div className="text-sm text-charcoal/40 mb-3">
              {new Date(post.publishDate).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-3">
              {post.title}
            </h2>
            <p className="text-charcoal/60 mb-6 leading-relaxed">
              {post.description}
            </p>
            <Link
              href={`/blog/${post.slug}`}
              className="inline-block px-6 py-3 bg-rose text-white text-sm font-medium rounded-xl hover:bg-rose/90 transition-colors"
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-16 text-center bg-rose/5 rounded-2xl p-8">
        <p className="text-charcoal/70 mb-4">
          Ready to start your jewelry making journey?
        </p>
        <Link
          href="/quiz"
          className="inline-block px-8 py-4 bg-rose text-white font-medium rounded-xl hover:bg-rose/90 transition-colors"
        >
          Take the 1-minute quiz →
        </Link>
      </div>
    </main>
  )
}
