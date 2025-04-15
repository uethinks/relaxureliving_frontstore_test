import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 检查密钥
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    // 重新验证首页
    await res.revalidate('/')
    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
} 