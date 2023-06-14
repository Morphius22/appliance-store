var express = require("express");
var router = express.Router();
const Category = require("../models/category");
const Item = require("../models/item");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const allCategories = await Category.find().sort({ name: 1 }).exec();
  const allItems = await Item.find()
    .sort({ name: 1 })
    .populate("category")
    .exec();

  console.log(allItems);
  console.log(allCategories);
  console.log(allCategories[0].name);

  if (allCategories !== undefined) {
    res.render("index", {
      title: "Home Page",
      category_list: allCategories,
      item_list: allItems,
    });
  }
});

module.exports = router;
