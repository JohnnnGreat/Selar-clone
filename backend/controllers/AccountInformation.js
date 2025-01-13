const setUpAccountInformation = (req, res) => {
   try {
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error setting up account information" });
   }
};
