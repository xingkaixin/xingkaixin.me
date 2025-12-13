/**
 * Lazy-load lang data using dynamic import (compatible with Turbopack)
 *
 * @param {string} section - The section of lang data to load
 * @param {string} lang    - The language name
 * @returns {Promise<object>} - The content of a lang JSON
 */
export default async function loadLocale(section, lang) {
  const localeMap = {
    'basic/en-US': () => import('./basic/en-US.json'),
    'basic/es-ES': () => import('./basic/es-ES.json'),
    'basic/ja-JP': () => import('./basic/ja-JP.json'),
    'basic/zh-CN': () => import('./basic/zh-CN.json'),
    'basic/zh-HK': () => import('./basic/zh-HK.json'),
    'basic/zh-TW': () => import('./basic/zh-TW.json'),
  }

  const key = `${section}/${lang}`
  const loader = localeMap[key]

  if (!loader) {
    throw new Error(`Locale not found: ${key}`)
  }

  const localeModule = await loader()
  return localeModule.default || localeModule
}
