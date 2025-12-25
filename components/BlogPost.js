import FormattedDate from "@/components/FormattedDate";
import { useConfig } from "@/lib/config";
import Link from "next/link";

const BlogPost = ({ post }) => {
  const BLOG = useConfig();

  // 有封面的布局
  if (post.pageCover) {
    return (
      <Link href={`${BLOG.path}/${post.slug}`} className="group block h-full">
        <article className="blog-card h-full overflow-hidden">
          {/* 封面图 */}
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <img
              src={post.pageCover}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          {/* 标题和日期 */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-4">
              <h2 className="article-title text-lg leading-relaxed transition-colors group-hover:text-vermillion md:text-xl">
                {post.title}
              </h2>
              <time className="date-stamp flex-shrink-0 pt-1">
                <FormattedDate date={post.date} />
              </time>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // 无封面的原始布局
  return (
    <Link href={`${BLOG.path}/${post.slug}`} className="group block h-full">
      <article className="blog-card h-full">
        {/* 内容区域 */}
        <div className="relative flex h-full flex-col gap-4">
          {/* 头部 */}
          <header className="flex flex-col gap-3">
            {/* 日期 - 右上角小印章风格 */}
            <div className="flex items-start justify-between gap-4">
              <h2 className="article-title text-lg leading-relaxed transition-colors group-hover:text-vermillion md:text-xl">
                {post.title}
              </h2>
              <time className="date-stamp flex-shrink-0 pt-1">
                <FormattedDate date={post.date} />
              </time>
            </div>

            {/* 摘要 */}
            <p className="text-sm leading-7 text-ink-medium line-clamp-2">
              {post.summary}
            </p>
          </header>

          {/* 底部 - 阅读更多 */}
          <div className="mt-auto flex items-center gap-2 pt-2">
            <span className="text-sm font-medium text-vermillion opacity-0 transition-all duration-300 group-hover:opacity-100">
              阅读全文
            </span>
            <span className="inline-flex h-6 w-6 items-center justify-center text-vermillion opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
              →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogPost;

