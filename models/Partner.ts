import mongoose, { Schema, model, models } from "mongoose"

const partnerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logoUrl: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

const Partner = models.Partner || model("Partner", partnerSchema)

export default Partner
