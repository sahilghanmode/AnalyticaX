import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './media') 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)  
  }
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.xls', '.xlsx']
  const ext = path.extname(file.originalname).toLowerCase()
  if (allowedTypes.includes(ext)) {
    cb(null, true)
  } else {
    cb(new Error('Only Excel files are allowed'))
  }
}

export const uploadExcel = multer({ storage, fileFilter })
