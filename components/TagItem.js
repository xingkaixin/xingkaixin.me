import Link from 'next/link'

const TagItem = ({ tag }) => (
  <Link href={`/tag/${encodeURIComponent(tag)}`}>
    <span className="inline-block px-2 py-1 text-xs font-medium text-ink-medium border border-paper-warm bg-paper-cream transition-all hover:border-vermillion hover:text-vermillion">
      {tag}
    </span>
  </Link>
)

export default TagItem
