import articles from '../models/articles.js'

export const createArticle = async (req, res) => {
  try {
    console.log(req.file)
    console.log(req.body)
    const result = await articles.create({
      title: req.body.title,
      articleText: req.body.articleText,
      shortDesc: req.body.shortDesc,
      keyWord: req.body.keyWord,
      image: req.file?.path || '',
      upload: req.body.upload,
      category: req.body.category
    })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const getUploadArticles = async (req, res) => {
  try {
    const result = await articles.find({ upload: true })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getAllArticles = async (req, res) => {
  try {
    const result = await articles.find()
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getArticles = async (req, res) => {
  try {
    const result = await articles.findById(req.params.id)
    if (!result) {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(200).json({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const editArticle = async (req, res) => {
  try {
    const result = await articles.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      articleText: req.body.articleText,
      shortDesc: req.body.shortDesc,
      keyWord: req.body.keyWord,
      image: req.file?.path,
      upload: req.body.upload,
      category: req.body.category
    }, { new: true })
    if (!result) {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(200).json({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else if (error.name === 'CastError') {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}
