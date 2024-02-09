const Item = require("../model/Item");

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
  } catch (err) {
    console.error(err);
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
  if (req.body?.assignee) item.assignee = req.body.assignee;
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
  if (req.body?.assignee) item.assignee = req.body.assignee;
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
  item.assignee = null;
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
