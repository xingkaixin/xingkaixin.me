import { useConfig } from '@/lib/config'
import Vercel from '@/components/Vercel'

const Footer = ({ fullWidth }) => {
  const BLOG = useConfig()

  const d = new Date()
  const y = d.getFullYear()
  const from = +BLOG.since

  return (
    <div
      className={`mt-12 flex-shrink-0 m-auto w-full text-ink-light transition-all ${
        !fullWidth ? 'max-w-2xl px-4' : 'px-4 md:px-24'
      }`}
    >
      <hr className="border-paper-warm" />
      <div className="my-6 flex items-center justify-between text-sm">
        {/* 版权信息 */}
        <p className="font-mono text-xs tracking-wide">
          © {from === y || !from ? y : `${from} - ${y}`} · {BLOG.author}
        </p>

        {/* 右侧印章 */}
        <div className="flex items-center gap-4">
          <span className="seal-stamp text-xs">行</span>
          <Vercel />
        </div>
      </div>
    </div>
  )
}

export default Footer
