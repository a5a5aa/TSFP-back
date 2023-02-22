import { Schema, model, ObjectId } from 'mongoose'

// const orderSchema = new Schema({
//   p_id: {
//     type: ObjectId,
//     ref: 'products',
//     required: [true, '缺少商品']
//   }
// })

const schema = new Schema({
  u_id: {
    type: ObjectId,
    ref: 'users',
    required: [true, '缺少使用者']
  },
  p_id: {
    type: ObjectId,
    ref: 'products',
    required: [true, '缺少活動']
  },
  date: {
    type: Date,
    default: Date.now()
  }
}, { versionKey: false })

export default model('orders', schema)
