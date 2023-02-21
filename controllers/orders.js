import orders from '../models/orders.js'
// import users from '../models/users.js'

export const createOrder = async (req, res) => {
  try {
    // 建立訂單
    if (req.user.role === 1) {
      res.status(400).json({ success: false, message: '管理員身份不得報名' })
      return
    }
    const result = await orders.create({
      u_id: req.user._id,
      p_id: req.params.id
    })
    const results2 = await result.populate('p_id')
    console.log(results2)
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

// 使用者取得自己的訂單
export const getMyOrders = async (req, res) => {
  try {
    const result = await orders.find({ u_id: req.user._id }).populate('p_id')
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

// 管理員取得每一個活動報名的使用者
export const getEventOrders = async (req, res) => {
  try {
    console.log(req)
    const result = await orders.find({ p_id: req.params.id }).populate('p_id').populate('u_id')
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

// export const getAllOrders = async (req, res) => {
//   try {
//     // .populate(關聯資料路徑, 取的欄位)
//     const result = await orders.find().populate('products.p_id').populate('u_id', 'account')
//     res.status(200).json({ success: true, message: '', result })
//   } catch (error) {
//     res.status(500).json({ success: false, message: '未知錯誤' })
//   }
// }

// 管理員所有報名的訂單
export const getAllOrders = async (req, res) => {
  try {
    // .populate(關聯資料路徑, 取的欄位)
    // const result = await orders.find().populate('products.p_id').populate('users.u_id')
    const result = await orders.find().populate('p_id').populate('u_id')
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}
