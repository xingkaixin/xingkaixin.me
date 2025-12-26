import { clientConfig } from "@/lib/server/config";
import Container from "@/components/Container";
import BlogPost from "@/components/BlogPost";
import { getAllPosts } from "@/lib/notion";
import { useConfig } from "@/lib/config";
import { useState, useEffect, useCallback, useRef } from "react";

export async function getStaticProps() {
  const posts = await getAllPosts({ includePages: false });
  const totalPosts = posts.length;
  const postsPerPage = clientConfig.postsPerPage;
  return {
    props: {
      allPosts: posts,
      totalPosts,
      postsPerPage,
    },
    revalidate: 1,
  };
}

export default function Blog({ allPosts, totalPosts, postsPerPage }) {
  const BLOG = useConfig();
  const { title, description } = BLOG;

  // 当前显示的文章数量
  const [displayCount, setDisplayCount] = useState(postsPerPage);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);

  // 当前显示的文章
  const postsToShow = allPosts.slice(0, displayCount);
  const hasMore = displayCount < totalPosts;

  // 加载更多文章
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    // 模拟加载延迟，提供更好的用户体验
    setTimeout(() => {
      setDisplayCount(prev => Math.min(prev + postsPerPage, totalPosts));
      setIsLoading(false);
    }, 300);
  }, [isLoading, hasMore, postsPerPage, totalPosts]);

  // Intersection Observer 实现滚动加载
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [hasMore, isLoading, loadMore]);

  return (
    <Container title={title} description={description} fullWidth>
      <div className="relative mx-auto w-full max-w-5xl">
        {/* 侧边竖排装饰文字 - 仅桌面端显示 */}
        <div className="vertical-text fixed left-8 top-1/2 hidden -translate-y-1/2 xl:block">
          人生不该只有一种体验
        </div>
        <div className="vertical-text fixed right-8 top-1/2 hidden -translate-y-1/2 xl:block">
          做个兴趣广泛的人
        </div>

        {/* 墨滴装饰 */}
        <div className="ink-drop -left-20 -top-10 hidden opacity-60 lg:block"
             style={{ width: '150px', height: '150px' }} />
        <div className="ink-drop -right-16 top-40 hidden opacity-40 lg:block"
             style={{ width: '100px', height: '100px' }} />

        <div className="space-y-10">
          {/* 头部区域 */}
          <header className="relative overflow-hidden border-b border-paper-warm pb-8">
            {/* 标题 */}
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="space-y-2">
                <h1 className="font-calligraphy text-3xl text-ink-black md:text-4xl">
                  {title}
                </h1>
                <p className="font-serif text-lg italic text-ink-light">
                  {description}
                </p>
              </div>

              {/* 印章 + 文章数 */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-ink-light">
                  共 {totalPosts} 篇
                </span>
                <span className="seal-stamp">行</span>
              </div>
            </div>
          </header>

          {/* 博客列表 */}
          <section className="grid gap-6 md:grid-cols-2">
            {postsToShow.map((post, index) => (
              <div
                key={post.id}
                className="fade-up opacity-0"
                style={{ animationDelay: `${Math.min(index, postsPerPage - 1) * 0.1}s` }}
              >
                <BlogPost post={post} />
              </div>
            ))}
          </section>

          {/* 滚动加载指示器 */}
          <div ref={loaderRef} className="flex justify-center py-8">
            {isLoading && (
              <div className="flex items-center gap-2 text-ink-light">
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-ink-light border-t-transparent" />
                <span className="text-sm">加载中...</span>
              </div>
            )}
            {!hasMore && totalPosts > postsPerPage && (
              <div className="text-center text-sm text-ink-light">
                <span className="opacity-60">— 已加载全部文章 —</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
