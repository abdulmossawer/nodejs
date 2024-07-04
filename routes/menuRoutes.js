const express = require('express')
const router = express.Router();
const MenuItem = require("../models/menuItem.js");

// Post route to add a MenuItem
router.post("/", async (req, res) => {
    try {
      const data = req.body;
  
      const newMenuItem = new MenuItem(data);
  
      const response = await newMenuItem.save();
      console.log("data saved");
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal error" });
    }
  });

  // Get method to the Menu
router.get("/", async (req, res) => {
    try {
      const data = await MenuItem.find();
      console.log("data fetched");
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal error" });
    }
  });

  router.get("/:tasteType", async (req,res) =>{
    try {
      const tasteType = req.params.tasteType;
      if (tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour') {
        const response = await MenuItem.find({taste: tasteType})
        console.log("response fetched");
        res.status(200).json(response)
      } else {
        console.log(error);
        res.status(500).json({ error: "Internal error" });
      }
    } catch (error) {
      
    }
  })


  // Update method for menuItem
  router.put('/:id', async(req, res) =>{
    try {
        const menuItem = req.params.id
        const updatedMenuItemData = req.body

        const response = await MenuItem.findByIdAndUpdate(menuItem, updatedMenuItemData, {
            new: true,
            runValidators: true
        })

        if (!response) {
            return res.status(404).json({error: 'Person not found'})
        }

        console.log('data updated');
        res.status(200).json(response)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal error" });
    }
  })

  // For delete method

router.delete("/:id", async (req, res) => {
    try {
      const menuId = req.params.id; //extract the id fromthe url parameter
  
      const response = await MenuItem.findByIdAndDelete(menuId);
  
      if (!response) {
        res.status(404).json({ error: "Menu not found" });
      }
  
      console.log("data deleted");
      res.status(200).json({ message: "Menu Deleted Succesfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  module.exports = router