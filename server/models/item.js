const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const itemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    itemDescription: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    itemPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    itemPicture: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 500,
    },
    itemCondition: {
      type: String,
      minlength: 3,
      maxlength: 255,
      required: true,
    },
    itemCategory: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

function validateItem(item) {
  const schema = Joi.object({
    itemName: Joi.string().min(3).max(255).required(),
    itemDescription: Joi.string().min(3).max(255).required(),
    itemPrice: Joi.number().positive().required(),
    itemPicture: Joi.string().min(1).max(500).required(),
    itemCondition: Joi.string().min(3).max(255).required(),
    itemCategory: Joi.string().min(3).max(255).required(),
    user: Joi.objectId().required(),
  });
  return schema.validate(item);
}

module.exports.Item = Item;
module.exports.validateItem = validateItem;
