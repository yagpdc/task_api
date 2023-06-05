const Joi = require("joi");

const TaskSchema = Joi.object({
  id: Joi.number().integer().greater(0),
  nome: Joi.string().min(3).max(30).required(),
  situation: Joi.string().min(3).max(30).required(),
}).with("id", ["nome", "situation"] );

module.exports = TaskSchema;
