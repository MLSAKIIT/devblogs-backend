import Joi from "joi";

export const createBlogSchema = Joi.object().keys({
  title: Joi.string().min(10).max(100).required(),
  content: Joi.string().min(10).max(1500).required(),
});
