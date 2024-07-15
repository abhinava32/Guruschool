const express = require('express');
const studentsController = require('../Controllers/studentsController');

const router = express.Router();
console.log("reached here");

router.post('/new-student', studentsController.addStudents);
router.post('/login', studentsController.login);

module.exports = router;