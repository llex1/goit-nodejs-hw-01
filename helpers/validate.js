const {
  Types: { ObjectId },
} = require("mongoose");
const Joi = require("joi");

class Validate {
  id(req, res, next) {
    const keyId = Object.keys(req.params).find((el) => {
      return el.slice(el.length - 2).toLocaleLowerCase() === "id";
    });
    if (!ObjectId.isValid(req.params[keyId])) {
      return res.status("400").send("id not valide");
    }
    next();
  }
  email(req, res, next) {
    const joiSchema = Joi.object({
      email: Joi.string().email(),
    }).unknown();
    if (!!req.body.email & !!joiSchema.validate(req.body).error) {
      return res.status("400").send(joiSchema.validate(req.body).error.message);
    }
    next();
  }
}

module.exports = new Validate();
