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

  const category = new Category({ categoryDetail });
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
}

async function createItems() {
  console.log("Adding Items");
  await Promise.all([
    itemCreate(
      "Compressor",
      "compressor for a refrigerator",
      300,
      2,
      categories[2]
    ),
    itemCreate(
      "Door Handle",
      "Replacement door handle for a refrigerator",
      25,
      12,
      categories[2]
    ),
    itemCreate(
      "Pilot Starter",
      "Replacement pilot starter for an oven",
      10,
      50,
      categories[0]
    ),
    itemCreate(
      "Magic Item",
      "The magic thing that makes ovens work",
      875,
      1,
      categories[0]
    ),
    itemCreate(
      "Front Panel",
      "A replacement for the front of a dishwasher",
      100,
      2,
      categories[1]
    ),
    itemCreate(
      "Drain Line",
      "A replacement drain line for a dishwasher",
      30,
      6,
      categories[1]
    ),
    itemCreate(
      "Pump",
      "A replacement pump for a dishwasher",
      325,
      9,
      categories[1]
    ),
  ]);
}
