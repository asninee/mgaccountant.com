import { db, eq, Feed, FeedItem } from 'astro:db'
import { type ClassValue, clsx } from 'clsx'
import { useEffect, useState } from 'react'
import Parser from 'rss-parser'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const useMediaQuery = (query: string) => {
  const [value, setValue] = useState(false)

  useEffect(() => {
    const onChange = (event: MediaQueryListEvent) => {
      setValue(event.matches)
    }

    const result = matchMedia(query)
    result.addEventListener('change', onChange)
    setValue(result.matches)

    return () => result.removeEventListener('change', onChange)
  }, [query])

  return value
}

/**
 * Convert a date to a relative time string, such as
 * "a minute ago", "in 2 hours", "yesterday", "3 months ago", etc.
 * using Intl.RelativeTimeFormat
 */
export const getRelativeTimeString = (
  date: Date | number,
  lang = typeof navigator !== 'undefined' ? navigator.language : 'en'
): string => {
  const timeMs = typeof date === 'number' ? date : date.getTime()
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000)

  const cutoffs = [
    60,
    3600,
    86400,
    86400 * 7,
    86400 * 30,
    86400 * 365,
    Infinity,
  ]
  const units: Intl.RelativeTimeFormatUnit[] = [
    'second',
    'minute',
    'hour',
    'day',
    'week',
    'month',
    'year',
  ]

  const unitIndex = cutoffs.findIndex(cutoff => cutoff > Math.abs(deltaSeconds))
  const divisor = cutoffs[unitIndex - 1] || 1

  return new Intl.RelativeTimeFormat(lang, { numeric: 'auto' }).format(
    Math.floor(deltaSeconds / divisor),
    units[unitIndex]
  )
}

const parseFeed = async (url: string) => {
  const parser = new Parser({
    timeout: 10000,
    maxRedirects: 5,
  })
  return await parser.parseURL(url)
}

const processFeed = async (url: string) => {
  const feed = await parseFeed(url)
  const existingFeed = await db
    .select()
    .from(Feed)
    .where(eq(Feed.url, url))
    .limit(1)
    .get()

  if (existingFeed) return

  const [insertedFeed] = await db
    .insert(Feed)
    .values({
      title: feed.title || 'Untitled Feed',
      description: feed.description || 'No description available',
      url: url,
      updated: new Date(feed.lastBuildDate || feed.pubDate || new Date()),
    })
    .returning({ id: Feed.id })

  for (const item of feed.items) {
    try {
      await db.insert(FeedItem).values({
        feedId: insertedFeed.id,
        title: item.title || 'Untitled Feed Item',
        description: item.contentSnippet || item.summary || '',
        url: item.link || '',
        published: new Date(item.pubDate || new Date()),
        updated: new Date(item.isoDate || item.pubDate || new Date()),
      })
    } catch (error) {
      console.error(`Error inserting feed item: ${item.title}`, error)
    }
  }
}

export const parseFeeds = async (list: string[]) => {
  const feedPromises = list.map(async url => {
    try {
      await processFeed(url)
    } catch (error) {
      console.error(`Error parsing feed ${url}:`, error)
    }
  })

  await Promise.allSettled(feedPromises)
}
