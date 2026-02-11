import { config as BLOG } from '@/lib/server/config'

import { idToUuid } from 'notion-utils'
import dayjs from 'dayjs'
import api from '@/lib/server/notion-api'
import getAllPageIds from './getAllPageIds'
import getPageProperties from './getPageProperties'
import filterPublishedPosts from './filterPublishedPosts'
import normalizeRecordMap from './normalizeRecordMap'

/**
 * @param {{ includePages: boolean }} - false: posts only / true: include pages
 */
export async function getAllPosts ({ includePages = false }) {
  const id = idToUuid(process.env.NOTION_PAGE_ID)

  const response = normalizeRecordMap(await api.getPage(id))

  const collection = Object.values(response.collection || {})[0]?.value
  const collectionQuery = response.collection_query
  const block = response.block || {}
  const schema = collection?.schema

  const rawMetadata = block[id]?.value

  // Check Type
  if (
    rawMetadata?.type !== 'collection_view_page' &&
    rawMetadata?.type !== 'collection_view'
  ) {
    console.log(`pageId "${id}" is not a database`)
    return []
  } else {
    // Construct Data
    const pageIds = getAllPageIds(collectionQuery)
    const data = []
    for (let i = 0; i < pageIds.length; i++) {
      const pageId = pageIds[i]
      const pageBlock = block[pageId]?.value
      if (!pageBlock) continue

      const properties = (await getPageProperties(pageId, block, schema)) || { id: pageId }

      // Add fullwidth to properties
      properties.fullWidth = pageBlock?.format?.page_full_width ?? false
      // Add page cover image (transform to full URL if needed)
      const rawCover = pageBlock?.format?.page_cover
      if (rawCover) {
        // If it's already a full URL, use it directly; otherwise construct Notion image URL
        if (rawCover.startsWith('http')) {
          properties.pageCover = rawCover
        } else {
          // Notion internal path - construct full URL via Notion's image proxy
          properties.pageCover = `https://www.notion.so/image/${encodeURIComponent(rawCover)}?table=block&id=${pageId}`
        }
      } else {
        properties.pageCover = null
      }
      // Convert date (with timezone) to unix milliseconds timestamp
      properties.date = (
        properties.date?.start_date
          ? dayjs.tz(properties.date?.start_date)
          : dayjs(pageBlock?.created_time)
      ).valueOf()

      data.push(properties)
    }

    // remove all the the items doesn't meet requirements
    const posts = filterPublishedPosts({ posts: data, includePages })

    // Sort by date
    if (BLOG.sortByDate) {
      posts.sort((a, b) => b.date - a.date)
    }
    return posts
  }
}
