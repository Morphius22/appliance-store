const Category = require("../models/category");
const item = require("../models/item");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const upload = multer({ dest: "public/images" });

//home page
exports.index = asyncHandler(async (req, res, next) => {
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

//get form for new item
exports.item_create_get = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();

  res.render("create_item", {
    title: "Create a new item",
    category_list: allCategories,
  });
});

//post request to create a new item
exports.item_create_post = [
  body("name", "name field must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "description must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "price field must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("stock", "stock field must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category", "category must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log("we hit the async function");

    req.body.category = await Category.find({ name: req.body.category }).exec();

    console.log(req.body.category);

    console.log(req.file);

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category[0],
      image: req.file.buffer.toString("base64"),
    });

    console.log(item);

    if (!errors.isEmpty()) {
      //there are errors - re-render form
      const allCategories = await Category.find().sort({ name: 1 }).exec();

      console.log("we hit an error");

      res.render("create_item", {
        title: "Error in Form",
        category_list: allCategories,
        errors: errors.array(),
      });
    } else {
      //no errors. save new category
      await item.save();
      console.log("a new item should have been saved");

      res.redirect("/");
    }
  }),
];

//get request to delete a new item
exports.item_delete_get = asyncHandler(async (req, res, next) => {});

//post request to delete a new item
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  await Item.findByIdAndDelete(req.body.itemid);

  res.redirect("/");
});

//get request to update a item
exports.item_update_get = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 });
  const item = await Item.findById(req.params.id).populate("category");

  console.log(item);

  res.render("create_item", {
    title: "Update Item",
    category_list: allCategories,
    item: item,
  });
});

//post request to update a item
exports.item_update_post = asyncHandler(async (req, res, next) => {
  const updatedItem = new Item({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    category: req.body.category,
    _id: req.params.id,
  });

  const item = await Item.findByIdAndUpdate(req.params.id, updatedItem);

  res.redirect("/");
});

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
