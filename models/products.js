import { Schema, model } from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    required: [true, '缺少名稱']
  },
  price: {
    type: Number,
    min: [0, '價格錯誤'],
    required: [true, '缺少價格']
  },
  date: {
    type: Date,
    default: Date.now(),
    required: [true, '缺少日期']
  },
  starttime: {
    type: String,
    required: [true, '缺少開始時間']
  },
  endedtime: {
    type: String,
    required: [true, '缺少結束時間']
  },
  description: {
    type: String,
    required: [true, '缺少說明']
  },
  keyWord: {
    type: String,
    required: [true, '缺少標籤']
  },
  image: {
    type: String,
    required: [true, '缺少圖片']
  },
  sell: {
    type: Boolean,
    required: [true, '缺少狀態']
  },
  category: {
    type: String,
    required: [true, '缺少分類'],
    enum: {
      values: ['心靈勵志', '生活風格', '藝文', '名人講堂', '職涯', '體驗', '其他'],
      message: '分類錯誤'
    }
  }
}, { versionKey: false })

export default model('products', schema)
