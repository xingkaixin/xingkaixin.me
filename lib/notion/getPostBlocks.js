import api from '@/lib/server/notion-api'
import normalizeRecordMap from './normalizeRecordMap'

function stripCrdtFieldsFromSection (section) {
  if (!section || typeof section !== 'object') return section

  return Object.fromEntries(
    Object.entries(section).map(([id, entry]) => {
      if (!entry || typeof entry !== 'object') return [id, entry]
      const blockValue = entry.value
      if (!blockValue || typeof blockValue !== 'object') return [id, entry]

      const {
        crdt_data: _crdtData,
        crdt_format_version: _crdtFormatVersion,
        ...valueWithoutCrdt
      } = blockValue

      return [id, { ...entry, value: valueWithoutCrdt }]
    })
  )
}

function compactRecordMap (recordMap) {
  if (!recordMap || typeof recordMap !== 'object') return recordMap

  return {
    ...recordMap,
    block: stripCrdtFieldsFromSection(recordMap.block),
    collection: stripCrdtFieldsFromSection(recordMap.collection),
    collection_view: stripCrdtFieldsFromSection(recordMap.collection_view),
    notion_user: stripCrdtFieldsFromSection(recordMap.notion_user)
  }
}

export async function getPostBlocks (id) {
  const pageBlock = await api.getPage(id)
  return compactRecordMap(normalizeRecordMap(pageBlock))
}
