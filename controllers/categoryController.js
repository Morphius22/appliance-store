const Item = require("../models/item");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

//get form for new category
exports.category_create_get = asyncHandler(async (req, res, next) => {});

//post request to create a new category
exports.category_create_post = asyncHandler(async (req, res, next) => {});

//get request to delete a new category
exports.category_delete_get = asyncHandler(async (req, res, next) => {});

//post request to delete a new category
exports.category_delete_post = asyncHandler(async (req, res, next) => {});

//get request to update a category
exports.category_update_get = asyncHandler(async (req, res, next) => {});

//post request to update a category
exports.category_update_post = asyncHandler(async (req, res, next) => {});

//get request for a specific category
exports.category_detail = asyncHandler(async (req, res, next) => {
  const [category, itemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).populate("category").exec(),
  ]);

  console.log("this is the category" + category);
  console.log("this is the items in category" + itemsInCategory);

  if (category === null) {
    const err = new Error("no category found");
    err.status = 404;
    return next(err);
  }

  res.render("category_detail", {
    title: category.name,
    category: category,
    itemsInCategory: itemsInCategory,
  });
});
