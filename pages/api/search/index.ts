import { NextApiRequest, NextApiResponse } from 'next'
import { searchPosts } from '../../../lib/blog'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405)
  }

  const term = req.query.term as string

  const posts = await searchPosts(term)

  return res.status(200).json({
    posts,
  })
}
