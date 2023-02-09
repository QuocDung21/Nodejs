const schoolController = require('../controllers/shcoolController')

const Router = require('express').Router()


//  add to school

Router.post('/', schoolController.addSchool)
Router.put("/:id", schoolController.updateSchool)
Router.get('/', schoolController.getAllSchools)
Router.get('/:id', schoolController.getSchool)
Router.delete('/:id', schoolController.deleteSchool)

module.exports = Router