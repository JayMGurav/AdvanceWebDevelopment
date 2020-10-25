const express = require('express')
const app = express()
const upload = require('express-fileupload')
const fs = require('fs')
const path = require('path');
const middleware = require('./utils/middleware')
const Student = require('./model/Student')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(upload({ createParentPath: true }))
app.use(middleware.requestLogger)

app.post('/mydetails', async (req, res) => {
  try {
    if (req.files) {
      const file = req.files.resume
      fs.writeFile(`./uploads/${file.name}`, file.data, { flag: 'w' }, async function (err) {
        if (err) throw err
        console.log("written to file")
        const student = new Student({
          ...req.body,
          fileName: file.name
        })
        const { name, gender, course, fileName } = await student.save()
        res.json({ name, gender, course, fileName })
      })
    }
  } catch (err) {
    console.error('Error: ', err.message)
  }
})



app.get('/:name/myresume', async (req, res) => {
  try {
    if (req.params.name) {
      const name = req.params.name;
      const { fileName } = await Student.findOne({ name })
      const file = fs.createReadStream(path.join(__dirname, '/uploads/', fileName));
      const stats = fs.statSync(path.join(__dirname, '/uploads/', fileName));
      res.setHeader('Content-Length', stats.size);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
      file.pipe(res);
    }
  } catch (err) {
    console.error('Error: ', err.message)
  }
})
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
