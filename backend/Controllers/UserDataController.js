const asyncHandler = require("express-async-handler");
const userDataModel = require("../Model/UserDataModel");
const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = require("./env");

// CREATE
exports.CreateData = asyncHandler(async (req, res) => {
  try {
    const { name, email, phone, hobby } = req.body;
    if (!name || !email || !phone || !hobby) {
      res.status(401).send("please enter all fields");
    }

    const newdata = new userDataModel({ name, email, phone, hobby });
    await newdata.save();
    res.status(200).json(newdata);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erron in create data call back");
  }
});
// UPDATE
exports.UpdateData = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = await userDataModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.status(200).json(updateData);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Erron in update data call back");
  }
});
// DELETE
exports.DeleteData = asyncHandler(async (req, res) => {
  try {
    const deleteData = await userDataModel.findByIdAndDelete(req.params.id);
    return res.status(200).send("data has been deleted");
  } catch (error) {
    console.log(error);
    return res.status(400).json("Error in delete data call back");
  }
});

// GET Data

exports.getAllData = asyncHandler(async (req, res) => {
  try {
    await userDataModel.find().then((users) => res.json(users));
  } catch ({ error }) {
    console.log(error);
    return res.status(500).send("Error wile getting data");
  }
});

exports.getSingleData = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    await userDataModel.findById(id).then((users) => res.json(users));
  } catch ({ error }) {
    console.log(error);
    return res.status(500).send("Error wile getting data");
  }
});

exports.sendData = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let data = await userDataModel.findById(id);

    var text = "User Data " + data;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });
    let message = {
      from: {
        name: "CRUD Application",
        address: EMAIL,
      },
      to: "info@redpositive.in", // list of receivers
      subject: "User Data", // Subject line
      text: text, // plain text body
    };
    transporter
      .sendMail(message)
      .then((info) => {
        return res.status(200).json({
          msg: "Sucessfully sent mail",
          info: info.messageId,
          preview: nodemailer.getTestMessageUrl(info),
        });
      })
      .catch((err) => {
        return res.status(500).json({ err });
      });
  } catch (error) {
    console.log(error);
  }
});
