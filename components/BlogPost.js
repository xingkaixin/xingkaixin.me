import FormattedDate from "@/components/FormattedDate";
import { useConfig } from "@/lib/config";
import Link from "next/link";

const BlogPost = ({ post }) => {
  const BLOG = useConfig();

  return (
    <Link href={`${BLOG.path}/${post.slug}`} className="group block h-full">
      <article className="relative h-full overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800/70 dark:bg-slate-900/70">
        <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-400/15 via-indigo-400/15 to-emerald-400/15 blur-3xl" />
        </div>
        <div className="relative flex h-full flex-col gap-4">
          <header className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-black transition group-hover:text-sky-600 dark:text-gray-100 dark:group-hover:text-sky-300 md:text-xl">
                {post.title}
              </h2>
              <time className="flex-shrink-0 text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                <FormattedDate date={post.date} />
              </time>
            </div>
            <p className="text-sm leading-7 text-gray-700 dark:text-gray-300 line-clamp-2">
              {post.summary}
            </p>
          </header>
          <div className="mt-auto flex items-center gap-2 text-sm font-medium text-sky-700 transition group-hover:gap-3 dark:text-sky-300">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/10 text-base text-sky-500 transition group-hover:bg-sky-500/20 dark:bg-sky-400/10 dark:text-sky-200">
              →
            </span>
            <span>阅读全文</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogPost;
