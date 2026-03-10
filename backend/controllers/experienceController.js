import Experience from "../models/Experience.js";

//create new experience
export const create = async (req, resp) => {
  const { title, description, location, price, imageUrl } = req.body;

  //input validations
  if (!title || !description || !location || !price || !imageUrl) {
    return resp
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  //creates a new record in db
  try {
    const experience = await Experience.create({
      title,
      description,
      location,
      price,
      imageUrl,
      creator: req.user._id,
    });
    resp.status(201).json({
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

//get all experiences
export const getAll = async (req, resp) => {
  try {
    //added pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 6;
    const skip = (page - 1) * limit;

    //added search feature
    const keyword = req.query.q
      ? {
          $or: [
            { title: { $regex: req.query.q, $options: "i" } },
            { location: { $regex: req.query.q, $options: "i" } },
          ],
        }
      : {};

    const experiences = await Experience.find({ ...keyword })
      .sort({ createdAt: -1 }) //sort latest created experience
      .skip(skip)
      .limit(limit)
      .populate("creator", "name email"); //fetch creator details

    const total = await Experience.countDocuments({ ...keyword });

    resp.status(200).json({
      success: true,
      count: experiences.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: experiences,
    });
  } catch (error) {
    console.error(error);
    resp
      .status(500)
      .json({ success: false, message: "Failed to fetch experiences" });
  }
};

//get single experience
export const getSingle = async (req, resp) => {
  try {
    const experience = await Experience.findById(req.params.id).populate(
      "creator",
      "name email",
    );
    resp.status(200).json({ success: true, data: experience });
  } catch (error) {
    console.error(error);
    resp
      .status(500)
      .json({ success: false, message: "Failed to fetch experience" });
  }
};

//update experience
export const update = async (req, resp) => {
  const { title, description, location, price, imageUrl } = req.body;

  //input validations
  if (!title || !description || !location || !price || !imageUrl) {
    return resp
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const experience = await Experience.findById(req.params.id);

    //check note exists
    if (!experience) {
      return resp
        .status(404)
        .json({ success: false, message: "Experience not found" });
    }

    //check permissions
    if (experience.creator.toString() !== req.user._id.toString()) {
      return resp.status(401).json({ success: false, message: "Unauthorized" });
    }

    //updates only given fields
    if (title) experience.title = title;
    if (description) experience.description = description;
    if (location) experience.location = location;
    if (price) experience.price = price;
    if (imageUrl) experience.imageUrl = imageUrl;

    await experience.save();

    resp
      .status(200)
      .json({
        success: true,
        message: "Experience updated successfully",
        data: experience,
      });
  } catch (error) {
    console.error(error);
    resp
      .status(500)
      .json({ success: false, message: "Failed to update experience" });
  }
};


//delete experience
export const deleteOne = async (req, resp) => {
  try {
    const experience = await Experience.findById(req.params.id);

    //check note exists
    if (!experience) {
      return resp
        .status(404)
        .json({ success: false, message: "Experience not found" });
    }

    //check permissions
    if (experience.creator.toString() !== req.user._id.toString()) {
      return resp.status(401).json({ success: false, message: "Unauthorized" });
    }

    //delete experience from db
    await Experience.findByIdAndDelete(req.params.id);

    resp.status(200).json({ success: true, message: "Experience deleted successfully" });
  } catch (error) {
    console.error(error);
    resp
      .status(500)
      .json({ success: false, message: "Failed to delete experience" });
  }
};

//get experience for logged in user
export const getMine = async (req, resp) => {
  try {
    const experiences = await Experience.find({ creator: req.user._id });
    resp.status(200).json({ success: true, data: experiences });
  } catch (error) {
    console.error(error);
    resp
      .status(500)
      .json({ success: false, message: "Failed to fetch experiences" });
  }
};