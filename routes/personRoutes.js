const express = require("express");
const router = express.Router();
const Person = require("./../models/person");

// Post route to request a person

router.post("/", async (req, res) => {
  try {
    const data = req.body; //Assuming the request body contains the person data

    // Create a person document using the mmongoose model
    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get method to get the person

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// For work

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "Chef" || workType == "Manager" || workType == "Waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// For update

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //extract the id fromthe url parameter
    const updatedPersonData = req.body; // run mongooose validation

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, //Return the updated document
        runValidators: true, //Run mongooose validation
      }
    );

    if (!response) {
      res.status(404).json({ error: "Person not found" });
    }

    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// For delete method

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //extract the id fromthe url parameter

    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      res.status(404).json({ error: "Person not found" });
    }

    console.log("data deleted");
    res.status(200).json({ message: "Person Deleted Succesfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
