const express = require("express");
const router = express.Router();

const item_controller = require("../controllers/itemController");

//get request for creating a item
router.get("/create", item_controller.item_create_get);

//post request for creating a item
router.post("/create", item_controller.item_create_post);

//get request to delete a item
router.get("/:id/delete", item_controller.item_delete_get);

//post request to delete a item
router.post("/:id/delete", item_controller.item_delete_post);

//get request to update a item
router.get("/:id/update", item_controller.item_update_get);

//post request to update a item
router.post("/:id/update", item_controller.item_update_post);

//get request for a item
router.get("/:id", item_controller.item_detail);

module.exports = router;
