const express = require("express");
const router = express.Router();
const Person = require("./../models/person");
const {jwtAuthMiddleware, generateToken} = require('../jwt');
const { use } = require("passport");

// Post route to request a person

router.post("/signup", async (req, res) => {
  try {
    const data = req.body; //Assuming the request body contains the person data

    // Create a person document using the mongoose model
    const newPerson = new Person(data);

    //save the new person data
    const response = await newPerson.save();
    console.log("data saved");

    const payload = {
      id: response.id,
      username: response.username
    }

    console.log(JSON.stringify(payload));
    const token = generateToken(payload)
    console.log("Token is:", token);

    res.status(200).json({response: response, token: token});

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get method to get the person

router.get("/", jwtAuthMiddleware ,async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res)=>{
  try {
      const userData = req.user;
      console.log('User data :', userData);

      const userId = userData.id;
      const user = await Person.findById(userId)

      res.status(200).json({user})
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
})

// For work

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter" || workType == 'delivery') {
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

// Lgin route
router.post('/login', async(req,res)=>{
  try {
    // Extract user or password from request body
    const {username, password} = req.body;

    // Find the user by username
    const user = await Person.findOne({username: username})

    // if user does not exist or password does not match, return error
    if( !user || !(await user.comparePassword(password))){
      return res.status(401).json({error: 'Invalid username or password'})
    }

    //Generate token
    const payload = {
      id: user.id,
      username: user.username
    }
    const token = generateToken(payload)

    //return token as a response
    res.json({token})

  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal server error'})
  }
})

module.exports = router;
