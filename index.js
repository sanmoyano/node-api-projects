require('dotenv').config()
require('./mongo')

const express = require('express')
const app = express()
const cors = require('cors')

const Project = require('./models/Project')
const { response } = require('express')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>API SM - projects</h1>')
})

app.get('/api/projects', (req, res, next) => {
  Project.find({}).then(projects => {
    res.json(projects)
  }).catch(err => next(err))
})

app.get('/api/projects/:id', (req, res, next) => {
  const { id } = req.params

  Project.findById(id).then(project => {
    if (project) {
      res.json(project)
    } else {
      res.status(404).end()
    }
  }).catch(err => {
    next(err)
  })
})

app.post('/api/projects', (req, res, next) => {
  const project = req.body

  const newProject = new Project({
    title: project.title,
    description: project.description,
    image: project.image
  })

  newProject.save()
    .then(saveProject => {
      res.json(saveProject)
    }).catch(err => next(err))
})

app.put('/api/projects/:id', (req, res, next) => {
  const { id } = req.params
  const project = req.body

  const newProjectInfo = {
    title: project.title,
    description: project.description,
    image: project.image
  }

  Project.findByIdAndUpdate(id, newProjectInfo, { new: true })
    .then(result => {
      res.json(result)
    }).catch(err => next(err))
})

app.delete('/api/projects/:id', (req, res, next) => {
  const { id } = req.params

  Project.findByIdAndDelete(id).then(res => {
    res.status(204).end()
  }).catch(err => {
    next(err)
  })
})

app.use((req, res, next) => {
  res.status(404).end()
})

app.use((err, req, res, next) => {
  console.log(err)
  console.log(err.name)
  if (err.name === 'CastError') {
    response.status(400).end()
  } else {
    response.status(500).end()
  }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}🚀`)
})
