import Link from 'next/link'
import { useConfig } from '@/lib/config'
import { useLocale } from '@/lib/locale'

const Pagination = ({ page, showNext }) => {
  const BLOG = useConfig()
  const locale = useLocale()
  const currentPage = +page
  let additionalClassName = 'justify-between'
  if (currentPage === 1 && showNext) additionalClassName = 'justify-end'
  if (currentPage !== 1 && !showNext) additionalClassName = 'justify-start'

  return (
    <div className={`flex gap-4 ${additionalClassName}`}>
      {currentPage !== 1 && (
        <Link
          href={
            currentPage - 1 === 1
              ? `${BLOG.path || '/'}`
              : `/page/${currentPage - 1}`
          }
        >
          <button
            rel="prev"
            className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-ink-medium transition-all hover:text-vermillion"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            {locale.PAGINATION.PREV}
          </button>
        </Link>
      )}
      {showNext && (
        <Link href={`/page/${currentPage + 1}`}>
          <button
            rel="next"
            className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-ink-medium transition-all hover:text-vermillion"
          >
            {locale.PAGINATION.NEXT}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </Link>
      )}
    </div>
  )
}

export default Pagination
