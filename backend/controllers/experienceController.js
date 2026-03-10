import Experience from "../models/Experience.js";

//create new experience
export const createExperience = async (req, resp) => {
  const { title, description, location, price, imageUrl } = req.body;

  //input validations
  if(!title || !description || !location || !price || !imageUrl) {
    return resp.status(400).json({success: false, message: "All fields are required"});
  }

  //creates a new record in db
  try {
    const experience = await Experience.create({
      title,
      description,
      location,
      price,
      imageUrl,
      creator: req.user.id,
    });
    resp
      .status(201)
      .json({
        success: true,
        message: "Experience created successfully",
        data: experience,
      });
  } catch (error) {
    console.error(error);
    resp
      .status(500)
      .json({ success: false, message: "Experience creation failed" });
  }
};
