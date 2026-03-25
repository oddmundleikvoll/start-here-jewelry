import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { marked } from 'marked'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Start Here Jewelry Blog`,
    description: post.description,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const htmlContent = marked(post.content)

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <Link
        href="/blog"
        className="text-charcoal/40 text-sm hover:text-charcoal transition-colors mb-8 inline-block"
      >
        ← Back to blog
      </Link>

      <article>
        <header className="mb-10">
          <div className="text-sm text-charcoal/40 mb-4">
            {new Date(post.publishDate).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-charcoal leading-tight">
            {post.title}
          </h1>
        </header>

        <div
          className="prose prose-charcoal prose-lg max-w-none
            prose-headings:font-serif prose-headings:font-bold prose-headings:text-charcoal
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-charcoal/75 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-rose prose-a:no-underline hover:prose-a:underline
            prose-strong:text-charcoal prose-strong:font-semibold
            prose-ul:my-4 prose-li:text-charcoal/70
            prose-ul:space-y-2
            prose-code:text-rose prose-code:bg-rose/10 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm
            prose-code:before:content-none prose-code:after:content-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>

      {/* CTA */}
      <div className="mt-16 pt-12 border-t border-charcoal/10">
        <div className="bg-rose/5 rounded-2xl p-8 text-center">
          <p className="text-charcoal/70 mb-4">
            Ready to start? Take the 1-minute quiz →
          </p>
          <Link
            href="/quiz"
            className="inline-block px-8 py-4 bg-rose text-white font-medium rounded-xl hover:bg-rose/90 transition-colors"
          >
            Take the quiz
          </Link>
        </div>
      </div>
    </main>
  )
}
