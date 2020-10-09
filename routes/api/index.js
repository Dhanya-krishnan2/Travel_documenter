const router = require("express").Router();
const tripRoutes = require("./trip");

// Book routes
router.use("/trip", tripRoutes);




module.exports = router;