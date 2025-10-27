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

// https://astro.build/db/config
export default defineDb({
  tables: { Feed, FeedItem },
})
