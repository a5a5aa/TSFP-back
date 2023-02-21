import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoute from './routes/users.js'
import productRoute from './routes/products.js'
import './passport/passport.js'
import orderRoute from './routes/orders.js'
import articleRoute from './routes/articles.js'

mongoose.connect(process.env.DB_URL)
mongoose.set('sanitizeFilter', true)

const app = express()

// 跨域請求測定
app.use(
  cors({
    // origin 代表請求來源
    origin (origin, callback) {
      // 只允許來自 github localhost 與後端(postman)的請求
      // callback(錯誤,是否允許)
      if (
        origin === undefined ||
        origin.includes('github') ||
        origin.includes('localhost')
      ) {
        callback(null, true)
      } else {
        callback(new Error(), false)
      }
    }
  })
)

// 處理跨域錯誤
app.use((_, req, res, next) => {
  res.status(403).json({ success: false, message: '請求被拒' })
})

app.use(express.json())
app.use((_, req, res, next) => {
  res.status(400).json({ success: false, message: '格式錯誤' })
})

app.use('/users', userRoute)
app.use('/products', productRoute)
app.use('/orders', orderRoute)
app.use('/articles', articleRoute)

app.all('*', (req, res) => {
  res.status(404).json({ success: false, message: '找不到' })
})

app.listen(process.env.PORT || 4000, () => {
  console.log('伺服器啟動')
})
