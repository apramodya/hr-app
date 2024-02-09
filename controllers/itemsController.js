const Item = require("../model/Item");
const Employee = require("../model/Employee");

const getAllItems = async (_, res) => {
  const items = await Item.find();
  if (!items) return res.status(204).json({ message: "No items found." });
  res.json(items);
};

const createNewItem = async (req, res) => {
  if (!req?.body?.code || !req?.body?.name) {
    return res.status(400).json({ message: "Code and name are required" });
  }

  try {
    const result = await Item.create({
      code: req.body.code,
      name: req.body.name,
      description: req.body.description,
    });

    res.status(201).json(result);
  } catch (error) {
    if (error.code === 11000) {
      let errMsg = Object.keys(error.keyValue)[0] + " already exists.";
      res.status(500).json({ message: errMsg });
    } else {
      res.status(500).json(error);
    }
  }
};

const updateItem = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const item = await Item.findOne({ _id: req.params.id }).exec();
  if (!item) {
    return res
      .status(204)
      .json({ message: `No item matches ID ${req.params.id}.` });
  }
  if (req.body?.code) item.code = req.body.code;
  if (req.body?.name) item.name = req.body.name;
  if (req.body?.description) item.description = req.body.description;
  const result = await item.save();
  res.json(result);
};

const deleteItem = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Item ID required." });

  const item = await Item.findOne({ _id: req.params.id }).exec();
  if (!item) {
    return res
      .status(204)
      .json({ message: `No item matches ID ${req.params.id}.` });
  }
  const result = await item.deleteOne(); //{ _id: req.params.id }
  res.json(result);
};

const getItem = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Item ID required." });

  const item = await Item.findOne({ _id: req.params.id }).exec();
  if (!item) {
    return res
      .status(404)
      .json({ message: `No item matches ID ${req.params.id}.` });
  }
  res.json(item);
};

const assignItem = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }
  if (!req?.body?.assignee) {
    return res.status(400).json({ message: "Assignee parameter is required." });
  }

  const item = await Item.findOne({ _id: req.params.id }).exec();
  if (!item) {
    return res
      .status(404)
      .json({ message: `No item matches ID ${req.params.id}.` });
  }

  const assignee = await Employee.findOne({ _id: req.body.assignee }).exec();
  if (!assignee) {
    return res
      .status(404)
      .json({ message: `No assignee matches ID ${req.body.assignee}.` });
  }

  if (req.body?.assignee) item.assigneeId = assignee;
  const result = await item.save();
  res.json(result);
};

const unAssignItem = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const item = await Item.findOne({ _id: req.params.id }).exec();
  if (!item) {
    return res
      .status(404)
      .json({ message: `No item matches ID ${req.params.id}.` });
  }
  item.assigneeId = null;
  const result = await item.save();
  res.json(result);
};

module.exports = {
  getAllItems,
  createNewItem,
  updateItem,
  deleteItem,
  getItem,
  assignItem,
  unAssignItem,
};
