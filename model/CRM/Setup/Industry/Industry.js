import { Schema, models, model } from "mongoose";

const setupIndustrySchema = new Schema(
  {
    name: String,
  },
  { collection: "SetupIndustry" }
);

const setupIndustry =
  models.setupIndustry || model("setupIndustry", setupIndustrySchema);

export default setupIndustry;
