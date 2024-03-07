const express = require("express");
const {
  CreateData,
  UpdateData,
  DeleteData,
  getAllData,
  getSingleData,
  sendData,
} = require("../Controllers/UserDataController");
const router = express.Router();

// CREATE
router.post("/create", CreateData);

// UPDATE
router.put("/update/:id", UpdateData);

// DELETE
router.delete("/delete/:id", DeleteData);

// GET DATA
router.get("/", getAllData);

// GET Singlr Data
router.get("/:id", getSingleData);

// SENDING MAIL

router.post("/send-data/:id", sendData);

module.exports = router;
