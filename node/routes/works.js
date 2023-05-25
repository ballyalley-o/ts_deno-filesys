const express = require('express');
const controller = require('../controllers/works')

const router = express.Router();


router.get('/:id', controller.getWork)
router.get('/', controller.getWorks)
router.post('/', controller.addWork)
router.put("/:id", controller.updateWork);
router.delete("/:id", controller.deleteWork);


module.exports = router;