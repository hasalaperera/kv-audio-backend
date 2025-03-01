import Inquiry from "../models/inquiry.js";
import { isITAdmin, isItCustomer } from "./userController.js";

export async function addInquiry(req, res) {
  try {
    if (isItCustomer(req)) {
      const data = req.body;
      data.email = req.user.email;
      data.phone = req.user.phone;

      // id genarate
      let id = 0;

      // get data from database and sort and limit
      const inquiries = await Inquiry.find().sort({ id: -1 }).limit(1);

      if (inquiries.length == 0) {
        id = 1;
      } else {
        id = inquiries[0].id + 1;
      }

      data.id = id;

      const newInquiry = new Inquiry(data);
      const response = await newInquiry.save();

      res.json({
        message: "Inquiry added successfully",
        id: response.id,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Error while adding inquiry",
    });
  }
}

export async function getInquiries(req, res) {
  try {
    if (isItCustomer(req)) {
      const inquiries = await Inquiry.find({ email: req.user.email });
      res.json(inquiries);
      return;
    } else if (isITAdmin(req)) {
      const inquiries = await Inquiry.find();
      res.json(inquiries);
      return;
    } else {
      res.status(403).json({
        message: "You are not authorized to access this resource",
      });
      return;
    }
  } catch (e) {
    res.status(500).json({
      message: "Error while getting inquiries",
    });
  }
}

export async function deleteInquiry(req, res) {
  try {
    if (isITAdmin(req)) {
      const id = req.params.id;

      await Inquiry.deleteOne({ id: id });
      res.json({
        message: "Inquiry deleted successfully",
      });
      return;
    } else if (isItCustomer(req)) {
      const id = req.params.id;

      const inquiry = await Inquiry.findOne({ id: id });
      if (inquiry == null) {
        res.status(404).json({
          message: "Inquiry not found",
        });
        return;
      } else {
        if (inquiry.email == req.user.email) {
          await Inquiry.deleteOne({ id: id });
          res.json({
            message: "Inquiry deleted successfully",
          });
          return;
        } else {
          res.status(403).json({
            message: "You are not authorized to delete this inquiry",
          });
          return;
        }
      }
    }
  } catch (e) {
    res.status(500).json({
      message: "Error while deleting inquiry",
    });
  }
}

export async function updateInquiry(req, res) {
  try {
    if (isITAdmin(req)) {
      const id = req.params.id;
      const data = req.body;

      await Inquiry.updateOne({ id: id }, data);
      res.json({
        message: "Inquiry updated successfully",
      });
      return;
    } else if (isItCustomer(req)) {
      const id = req.params.id;
      const data = req.body;

      const inquiry = await Inquiry.findOne({ id: id });
      if (inquiry == null) {
        res.status(404).json({
          message: "Inquiry not found",
        });
        return;
      } else {
        if (inquiry.email == req.user.email) {
          await Inquiry.updateOne({ id: id }, { message: data.message });
          res.json({
            message: "Inquiry updated successfully",
          });
          return;
        } else {
          res.status(403).json({
            message: "You are not authorized to update this inquiry",
          });
          return;
        }
      }
    } else {
      res.status(403).json({
        message: "You are not authorized to update this inquiry",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Error while updating inquiry",
    });
  }
}
