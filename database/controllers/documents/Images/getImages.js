import ImageUpload from "../../../../model/Documents/Images/imageUpload";

export async function getImages(req, res) {
  try {
    const images = await ImageUpload.find({});
    if (!images)
      return res.status(404).json({ error: "Images data not found" });
    return res.status(200).json(images);
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching Images Data" });
  }
}
