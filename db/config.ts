import { column, defineDb, defineTable } from 'astro:db'

const Feed = defineTable({
  columns: {
    id: column.number({ primaryKey: true, unique: true }),
    title: column.text(),
    description: column.text(),
    url: column.text({ unique: true }),
    updated: column.date(),
  },
})

const FeedItem = defineTable({
  columns: {
    feedId: column.number({ references: () => Feed.columns.id }),
    title: column.text(),
    description: column.text(),
    url: column.text(),
    published: column.date(),
    updated: column.date(),
  },
})

const Author = defineTable({
  columns: {
    feedId: column.number({ references: () => Feed.columns.id }),
    name: column.text(),
  },
})

const Image = defineTable({
  columns: {
    feedId: column.number({ references: () => Feed.columns.id }),
    url: column.text(),
    alt: column.text(),
  },
})

// https://astro.build/db/config
export default defineDb({
  tables: { Feed, FeedItem, Author, Image },
})
