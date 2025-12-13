import PropTypes from 'prop-types'
import cn from 'classnames'
import { useConfig } from '@/lib/config'
import useTheme from '@/lib/theme'
import FormattedDate from '@/components/FormattedDate'
import TagItem from '@/components/TagItem'
import NotionRenderer from '@/components/NotionRenderer'
import TableOfContents from '@/components/TableOfContents'

/**
 * A post renderer
 *
 * @param {PostProps} props
 *
 * @typedef {object} PostProps
 * @prop {object}   post       - Post metadata
 * @prop {object}   blockMap   - Post block data
 * @prop {string}   emailHash  - Author email hash (for Gravatar)
 * @prop {boolean} [fullWidth] - Whether in full-width mode
 */
export default function Post (props) {
  const BLOG = useConfig()
  const { post, blockMap, fullWidth = false } = props
  const { dark } = useTheme()

  return (
    <article className={cn('flex flex-col', fullWidth ? 'md:px-24' : 'items-center')}>
      {/* 墨滴装饰 */}
      <div className="ink-drop absolute -left-10 -top-10 opacity-40"
           style={{ width: '120px', height: '120px' }} />

      {/* 文章标题 */}
      <h1 className={cn(
        'w-full article-title text-3xl md:text-4xl',
        { 'max-w-2xl px-4': !fullWidth }
      )}>
        {post.title}
      </h1>

      {/* 文章元信息 */}
      {post.type[0] !== 'Page' && (
        <nav className={cn(
          'w-full flex mt-6 items-center flex-wrap gap-4 text-ink-light',
          { 'max-w-2xl px-4': !fullWidth }
        )}>
          {/* 作者印章 */}
          <div className="flex items-center gap-2">
            <a href={BLOG.socialLink || '#'} className="flex items-center gap-2 transition-colors hover:text-vermillion">
              <span className="seal-stamp text-xs py-0.5 px-1.5">行</span>
              <span className="text-sm">{BLOG.author}</span>
            </a>
            <span className="text-ink-faint">/</span>
          </div>

          {/* 日期 */}
          <div className="date-stamp">
            <FormattedDate date={post.date} />
          </div>

          {/* 标签 */}
          {post.tags && (
            <div className="flex flex-nowrap max-w-full overflow-x-auto article-tags gap-2">
              {post.tags.map(tag => (
                <TagItem key={tag} tag={tag} />
              ))}
            </div>
          )}
        </nav>
      )}

      {/* 分隔线 */}
      <div className={cn('w-full mt-8 mb-4', { 'max-w-2xl px-4': !fullWidth })}>
        <div className="h-px bg-gradient-to-r from-transparent via-paper-warm to-transparent" />
      </div>

      {/* 内容区域 */}
      <div className="self-stretch flex flex-col items-center lg:flex-row lg:items-stretch">
        {!fullWidth && <div className="flex-1 hidden lg:block" />}
        <div className={fullWidth ? 'flex-1 pr-4' : 'flex-none w-full max-w-2xl px-4'}>
          <NotionRenderer recordMap={blockMap} fullPage={false} darkMode={dark} />
        </div>
        <div className={cn('order-first lg:order-[unset] w-full lg:w-auto max-w-2xl lg:max-w-[unset] lg:min-w-[160px]', fullWidth ? 'flex-none' : 'flex-1')}>
          {/* 目录 */}
          <TableOfContents blockMap={blockMap} className="pt-3 sticky" style={{ top: '65px' }} />
        </div>
      </div>
    </article>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  blockMap: PropTypes.object.isRequired,
  emailHash: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool
}
