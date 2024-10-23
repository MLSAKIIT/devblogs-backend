import Joi from 'joi';

export const registerSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string().min(8).required(),
});

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);    
    
    if (error) {
      const [errorDetails] = error.details;
      
      return res.status(400).json({
        error: errorDetails.message
      });
    }

    next();
  }
}