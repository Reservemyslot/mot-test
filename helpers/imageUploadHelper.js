
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')
const multer = require('multer')
const path = require('path')
const { S3_ACCESS } = require('../serverConfig')
const { BUCKET_NAME } = require('../serverConfig')


const s3 = new aws.S3({
  ...S3_ACCESS,
})

const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png|pdf/
  const extname = filetypes.test(path.extname(file.originalname))
  const mimetype = filetypes.test(file.mimetype)
  if (extname && mimetype) {
    return cb(null, true)
  }
  cb('Error:Images Only!')
}


// var upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: BUCKET_NAME,
//     key: function (req, file, cb) {
//       console.log(file)
//       var filetype = ''
//       if (file.mimetype === 'image/gif') {
//         filetype = 'gif'
//       }
//       if (file.mimetype === 'image/png') {
//         filetype = 'png'
//       }
//       if (file.mimetype === 'image/jpeg') {
//         filetype = 'jpg'
//       }
//       cb(null, 'image-' + Date.now() + '.' + filetype)
//     },
//   }),
// })

// function uploadphoto(req, res, next) {
//   console.log(req.file)
//   if (!req.file) {
//     res.status(200)
//     req.result = { success: false, message: 'An error occurred!' }
//     next()
//   }
//   req.result = { fileUrl: req.file.location }
//   next()
// }



module.exports = {

  imageUpload: (folderName) =>
    multer({
      storage: multerS3({
        s3,
        bucket: BUCKET_NAME,
        metadata: (req, file, cb) => {
          cb(null, {
            fieldName: file.fieldname,
          })
        },
        key: (req, file, cb) => {
          const newFileName = `${Date.now()}-${file.originalname}`
          const fullPath = `${folderName}${newFileName}`
          cb(null, fullPath)
        },
      }),
      limits: {
        fileSize: 10000000,
      },
      fileFilter: (req, file, cb) => {
        checkFileType(file, cb)
      },
    }),
 
}
