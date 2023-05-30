const Item = require("../models/item");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// //home page
// exports.index = asyncHandler(async (req, res, next) => {
//   const [allCategories, allItems] = await Promise.all([
//     Category.find().sort({ name: 1 }).exec(),
//     Item.find().sort({ name: 1 }).populate("category").exec(),
//   ]);

//   console.log(allItems);

//   res.render("index", {
//     title: "Home Page",
//     category_list: allCategories,
//     item_list: allItems,
//   });
// });

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
exports.category_detail = asyncHandler(async (req, res, next) => {});
