/* eslint-disable */

const BadPlate = require("../models/bad_plate");

exports.bad_plates_get_all = async (req, res) => {
  try {
    const plates = await BadPlate.find();
    res.json(plates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.bad_plates_get_one = (req, res) => {
  res.json(res.plate);
};

exports.bad_plates_post = async (req, res) => {
  console.log("POST BAD PLATE" )
  console.log(req.body)
  const plate = new BadPlate({
    fullname: req.body.fullname,
    phone: req.body.phone,
    email: req.body.email,
    role: req.body.role,
    vehicle_type: req.body.vehicle_type,
    gender: req.body.gender,
    age: req.body.age,
    plate_number: req.body.plate_number,
    place_name : req.body.place_name, 
    kana_text : req.body.kana_text, 
    classification_number : req.body.classification_number,
    license_plate : req.body.place_name+ req.body.classification_number + req.body.kana_text+ req.body.plate_number,
    // organization_name: req.body.organization_name,
    // organization_name_khmer: req.body.organization_name_khmer,
    // badStatus: req.body.badStatus,
  });
  try {
    const newPlate = await plate.save();
    res.status(201).json(newPlate);
  } catch (err) {
    console.log(err	)
    res.status(400).json({ message: err.message });
  }
};

exports.bad_plates_update = async (req, res) => {
  if (req.body.fullname != null) {
    res.plate.fullname = req.body.fullname;
  }
  if (req.body.phone != null) {
    res.plate.phone = req.body.phone;
  }
  if (req.body.email != null) {
    res.plate.email = req.body.email;
  }
  if (req.body.role != null) {
    res.plate.role = req.body.role;
  }
  if (req.body.vehicle_type != null) {
    res.plate.vehicle_type = req.body.vehicle_type;
  }
  if (req.body.gender != null) {
    res.plate.gender = req.body.gender;
  }
  if (req.body.age != null) {
    res.plate.age = req.body.age;
  }
  if (req.body.plate_number != null) {
    res.plate.plate_number = req.body.plate_number;
  }
  if (req.body.kana_text != null) {
    res.plate.kana_text = req.body.kana_text;
  }
  if (req.body.classification_number != null) {
    res.plate.classification_number = req.body.classification_number;
  }
  if (req.body.place_name != null) {
    res.plate.place_name = req.body.place_name;
  }
  // if (req.body.organization_name != null) {
  //   res.plate.organization_name = req.body.organization_name;
  // }
  // if (req.body.organization_name_khmer != null) {
  //   res.plate.organization_name_khmer = req.body.organization_name_khmer;
  // }
  if (req.body.badStatus != null) {
    res.plate.badStatus = req.body.badStatus;
  }
  res.plate.license_plate = req.body.place_name+ req.body.classification_number + req.body.kana_text+ req.body.plate_number;
  try {
    const updatedPlate = await res.plate.save();
    res.json(updatedPlate);
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message });
  }
};

exports.bad_plates_delete = async (req, res) => {
  try {
    await res.plate.remove();
    res.json({ message: "Deleted plate" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.BadPlateID = async function getBadPlate(req, res, next) {
  let plate;
  try {
    plate = await BadPlate.findOne({ license_plate: req.params.id });
    if (plate == null) {
      return res.status(404).json({ message: "Cannot find plate" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.plate = plate;
  next();
};
