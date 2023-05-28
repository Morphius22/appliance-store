#! /usr/bin/env node

console.log(
  "This script populates some test items and catagories to your database."
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Category = require("./models/category");

const items = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function categoriesCreate(name, description) {
  categoryDetail = {
    name: name,
    description: description,
  };

  const category = new Category(categoryDetail);
  await category.save();
  categories.push(category);
  console.log(`Added category: ${name}`);
}

async function itemCreate(name, description, price, stock, category) {
  itemDetail = {
    name: name,
    description: description,
    price: price,
    stock: stock,
    category: category,
  };

  const item = new Item(itemDetail);
  await item.save();
  items.push(item);
  console.log(`Added item: ${name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoriesCreate("Ovens", "Find all parts for Ovens"),
    categoriesCreate("Dishwashers", "Find all parts for Dishwashers"),
    categoriesCreate("Refrigerators", "Find all parts for Refrigerators"),
  ]);
  console.log(categories);
}

async function createItems() {
  console.log("Adding Items");
  await Promise.all([
    itemCreate("Compressor", "compressor replacement", 300, 2, categories[2]),
    itemCreate("Door Handle", "Replacement door handle", 25, 12, categories[2]),
    itemCreate(
      "Pilot Starter",
      "Replacement pilot starter",
      10,
      50,
      categories[0]
    ),
    itemCreate("Magic Item", "The magic thing", 875, 1, categories[0]),
    itemCreate(
      "Front Panel",
      "A replacement for the front panel",
      100,
      2,
      categories[1]
    ),
    itemCreate("Drain Line", "A replacement drain line", 30, 6, categories[1]),
    itemCreate("Pump", "A replacement pump", 325, 9, categories[1]),
  ]);
}
