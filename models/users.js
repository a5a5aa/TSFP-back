import { Schema, model, ObjectId, Error } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: [true, '缺少信箱'],
    validate: {
      validator (email) {
        return validator.isEmail(email)
      },
      message: '信箱格式錯誤'
    }
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    unique: true,
    required: [true, '缺少手機號碼']
  },
  tokens: {
    type: [String],
    // 預設空陣列
    default: []
  },
  date: {
    type: Date,
    default: () => Date.now() + 8 * 60 * 60 * 1000,
    required: [true, '缺少日期']
  },
  role: {
    type: Number,
    // 0 使用者 1 管理員
    default: 0
  }
}, { versionKey: false })

schema.pre('save', function (next) {
  const user = this
  if (user.isModified('password')) {
    if(user.password.length >= 4 && user.password.length <= 20){
      user.password = bcrypt.hashSync(user.password,10)
    } else {
      const error = new Error.ValidationError(null)
      error.addError('password',new Error.ValidatorError({message:'密碼長度錯誤'}))
      next(error)
      return
    }
  }
  next()
})

schema.pre('findOneAndUpdate',function(next){
  const user = this._update
  if(user.password){
    if(user.password.length >= 4 && user.password.length <= 20){
      user.password = bcrypt.hashSync(user.password,10)
    } else {
      const error = new Error.ValidationError(null)
      error.addError('password',new Error.ValidatorError({message:'密碼長度錯誤'}))
      next(error)
      return
    }
  }
  next()
})
export default model('users',schema)