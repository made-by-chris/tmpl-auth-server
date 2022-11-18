import express from  "express"
import multer from  "multer"
import path from  "path"
const app = express()

// cloudinary example -> https://www.npmjs.com/package/multer-storage-cloudinary
// s3 example -> https://www.npmjs.com/package/multer-s3

// local file example
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/") // this saves the file to the uploads folder in the root of the project
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`)
  },
})

const upload = multer({ storage })
app.use(express.static("uploads"))


app.get("/", (req, res) => {
  console.log(__dirname)
  console.log(req.method + " " + req.url + " request received")
  res.sendFile(__dirname + "/file-form.html")
})

app.post(
  "/upload-profile-pic",
  upload.single("profile_pic"),
  function (req, res, next) {
    if (!req.file) {
      res.send("No file received")
      return
    }
    console.log(req.method + " " + req.url + " request received")
    console.log("file: " + JSON.stringify(req.file))
    res.send(
      `<h2>Here is the picture:</h2><img src="https://cdn.cloudinary.com/projectID/${req.file.filename}" alt=”something”/>`
    )
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  }
)

app.listen(8080, () => console.log("FILE DEMO LISTENING ON PORT 8080"))