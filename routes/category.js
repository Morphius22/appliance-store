const express = require("express");
const router = express.Router();

const item_controller = require("../controllers/itemController");
const category_controller = require("../controllers/categoryController");

//get request for creating a category
router.get("/create", category_controller.category_create_get);

//get request for creating a category
router.get("/admin", category_controller.admin_get);

//post request for creating a category
router.post("/create", category_controller.category_create_post);

//get request to delete a category
router.get("/:id/delete", category_controller.category_delete_get);

//post request to delete a category
router.post("/:id/delete", category_controller.category_delete_post);

//get request to update a category
router.get("/:id/update", category_controller.category_update_get);

//post request to update a category
router.post("/:id/update", category_controller.category_update_post);

//get request for a category
router.get("/:id", category_controller.category_detail);

module.exports = router;
