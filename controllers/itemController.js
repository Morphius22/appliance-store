const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

//home page
exports.index = asyncHandler(async (req, res, next) => {
  const [allCategories, allItems] = await Promise.all([
    Category.find().sort({ name: 1 }).exec(),
    Item.find().sort({ name: 1 }).populate("category").exec(),
  ]);

  console.log(allItems);

  res.render("index", {
    title: "Home Page",
    category_list: allCategories,
    item_list: allItems,
  });
});

//get form for new item
exports.item_create_get = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();

  res.render("create_item", {
    title: "Create a new item",
    category_list: allCategories,
  });
});

//post request to create a new item
exports.item_create_post = asyncHandler(async (req, res, next) => {});

//get request to delete a new item
exports.item_delete_get = asyncHandler(async (req, res, next) => {});

//post request to delete a new item
exports.item_delete_post = asyncHandler(async (req, res, next) => {});

//get request to update a item
exports.item_update_get = asyncHandler(async (req, res, next) => {});

//post request to update a item
exports.item_update_post = asyncHandler(async (req, res, next) => {});

//get request for a specific item
exports.item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate("category").exec();
  const allCategories = await Category.find().sort({ name: 1 }).exec();

  console.log("this is the item", item);

  if (item === null) {
    const err = new Error("no item found");
    err.status = 404;
    return next(err);
  }

  res.render("item_detail", {
    title: item.name,
    item: item,
    category_list: allCategories,
  });
});
