import { Router } from 'express'

const router = Router()

router.get('/health', (req, res) => {
  res.json({ status: 'working' })
})

export default router
