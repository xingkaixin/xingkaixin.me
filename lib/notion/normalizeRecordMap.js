function normalizeRecordMapEntry (entry) {
  if (!entry || typeof entry !== 'object') return entry

  const wrappedValue = entry.value
  const hasWrappedShape =
    wrappedValue &&
    typeof wrappedValue === 'object' &&
    wrappedValue.value &&
    typeof wrappedValue.value === 'object'

  if (!hasWrappedShape) return entry

  const { value, ...meta } = wrappedValue
  return {
    ...entry,
    ...meta,
    value
  }
}

function normalizeRecordMapSection (section) {
  if (!section || typeof section !== 'object') return section

  return Object.fromEntries(
    Object.entries(section).map(([id, entry]) => [id, normalizeRecordMapEntry(entry)])
  )
}

export default function normalizeRecordMap (recordMap) {
  if (!recordMap || typeof recordMap !== 'object') return recordMap

  return {
    ...recordMap,
    block: normalizeRecordMapSection(recordMap.block),
    collection: normalizeRecordMapSection(recordMap.collection),
    collection_view: normalizeRecordMapSection(recordMap.collection_view),
    notion_user: normalizeRecordMapSection(recordMap.notion_user)
  }
}
