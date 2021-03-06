import express from "express";
import { validation } from "@project/common";
import Facility from "../../../models/Facility";
import Report from "../../../models/Report";
import { errorHandler } from "../../../utils/functions";

const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const facility = await Facility.findById(id).populate(
      "comments.user",
      "name avatar"
    );

    if (!facility) return res.status(400).json({ msg: "Invalid Facility id" });

    return res.status(200).json(facility);
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
});

router.get("/", async (req, res) => {
  try {
    const facilities = await Facility.find().populate(
      "comments.user",
      "name avatar"
    );

    return res.status(200).json(facilities);
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
});

router.post("/report", async (req, res) => {
  const { to, message } = req.body;

  try {
    await validation.forms.report.validate(
      { to, message },
      { abortEarly: false }
    );
    const newReport = new Report({ to, message });
    await newReport.save();

    return res.status(200).json({ msg: "Sent successfully" });
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
});

export default router;
