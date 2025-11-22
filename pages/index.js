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
      page: 1, // current page is 1
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
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <div className="flex flex-col gap-2 rounded-2xl border border-slate-200/70 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/70 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 md:text-3xl">
              {title}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {description}
            </p>
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            共 {totalPosts} 篇文章
          </div>
        </div>
        <section className="grid gap-6 md:grid-cols-2">
          {postsToShow.map((post) => (
            <BlogPost key={post.id} post={post} />
          ))}
        </section>
        {showNext && (
          <div className="flex justify-center">
            <Pagination page={page} showNext={showNext} />
          </div>
        )}
      </div>
    </Container>
  );
}
