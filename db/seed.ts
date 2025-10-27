import { FEEDS } from '@consts'
import { parseFeeds } from '@lib/utils'
import { Author, db, Feed, FeedItem, Image } from 'astro:db'

// https://astro.build/db/seed
export default async function seed() {
  await db.delete(FeedItem)
  await db.delete(Feed)

  await parseFeeds(FEEDS)
}
