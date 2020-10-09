const router = require("express").Router();
const tripController = require("../../controllers/tripController");


router
.route("/")
.get(tripController.findAll)
.put(tripController.update)
.post(tripController.create)



router
.route("/:id")
.get(tripController.findById)
.delete(tripController.remove)
.put(tripController.update)

router
.route("/userId/:id")
.get(tripController.findByUserId)

module.exports = router