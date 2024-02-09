const express = require("express");
const router = express.Router();
const itemsController = require("../../controllers/itemsController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(itemsController.getAllItems)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    itemsController.createNewItem
  );

router
  .route("/:id")
  .get(itemsController.getItem)
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    itemsController.updateItem
  )
  .delete(verifyRoles(ROLES_LIST.Admin), itemsController.deleteItem);

router
  .route("/:id/assign")
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    itemsController.assignItem
  );

router
  .route("/:id/unassign")
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    itemsController.unAssignItem
  );

module.exports = router;
