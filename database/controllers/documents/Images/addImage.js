import ImageUpload from "../../../../model/Documents/Images/imageUpload";

export async function addImage(req, res) {
  try {
    //console.log(req.body, "req");
    const body = req.body;

    const imageData = {
      myFile: body.myFile,
    };

    const images = await ImageUpload.create(imageData);
    images.save();
    console.log(images, "images");

    if (!images)
      return res.status(404).json({ error: "Images data not found" });
    return res
      .status(200)
      .json({ message: "New Image successfully uploaded!" });
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching Images Data" });
  }
}
