const ShowLove = require("../models/Showlove"); // Adjust path as necessary

// Create a new ShowLove entry
const createShowLove = async (req, res) => {
   try {
      const uploadedBy = req.user.id;
      const { imageUrl, displayName, bio, showLoveLink, color, heading, customNote, socialMedia } =
         req.body;

      if (
         !imageUrl ||
         !displayName ||
         !bio ||
         !showLoveLink ||
         !color ||
         !heading ||
         !customNote ||
         !socialMedia
      ) {
         return res.status(400).json({ message: "All fields are required" });
      }

      // Create a new instance of ShowLove
      const newShowLove = new ShowLove({
         uploadedBy,
         imageUrl,
         displayName,
         bio,
         showLoveLink,
         color,
         heading,
         customNote,
         socialMedia,
      });

      // Save the document to the database
      const savedShowLove = await newShowLove.save();

      // Respond with the created document
      res.status(201).json({
         message: "ShowLove created successfully",
         data: savedShowLove,
      });
   } catch (error) {
      console.error("Error creating ShowLove:", error);
      res.status(500).json({ message: "Internal server error", error });
   }
};

module.exports = { createShowLove };
