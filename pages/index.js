import { clientConfig } from "@/lib/server/config";
import Container from "@/components/Container";
import BlogPost from "@/components/BlogPost";
import Pagination from "@/components/Pagination";
import { getAllPosts } from "@/lib/notion";
import { useConfig } from "@/lib/config";

export async function getStaticProps() {
  const posts = await getAllPosts({ includePages: false });
  const postsToShow = posts.slice(0, clientConfig.postsPerPage);
  const totalPosts = posts.length;
  const showNext = totalPosts > clientConfig.postsPerPage;
  return {
    props: {
      page: 1,
      postsToShow,
      showNext,
      totalPosts,
    },
    revalidate: 1,
  };
}

export default function Blog({ postsToShow, page, showNext, totalPosts }) {
  const BLOG = useConfig();
  const { title, description } = BLOG;

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
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <BlogPost post={post} />
              </div>
            ))}
          </section>

          {/* 分页 */}
          {showNext && (
            <div className="flex justify-center pt-4">
              <Pagination page={page} showNext={showNext} />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
