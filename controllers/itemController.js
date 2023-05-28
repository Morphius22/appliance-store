const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

//get form for new item
exports.item_create_get = asyncHandler(async (req, res, next) => {});

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
exports.item_detail = asyncHandler(async (req, res, next) => {});

module.exports = router;
