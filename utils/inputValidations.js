import { body, validationResult } from "express-validator";

const validationFields = (fields) => {
  const validate = [];

  if (fields.includes("username")) {
    validate.push(
      body("username")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Usernmae is Required!")
        .isLength({ min: 3 })
    );
  }
  if (fields.includes("email")) {
    validate.push(
      body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is Required!")
        .normalizeEmail()
    );
  }
  if (fields.includes("name")) {
    validate.push(
      body("name")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Name is Required!")
        .isAlpha().withMessage("Name can be only letters!")
    );
  }
  if (fields.includes("password")) {
    validate.push(
      body("password")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Password is Required!")
    );
  }
  if (fields.includes("title")) {
    validate.push(
      body("title")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Title is Required!")
    );
  }
  if (fields.includes("description")) {
    validate.push(
      body("description")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Description is Required!")
    );
  }

  return validate;

};


const validateresult = (req,res,next)=>{
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.json({
            success:false,
            error:error.array(),
            status:403
        })
    }
    next();
};

// senitizing fields
const sanitizeInput = (req, res, next) => {
    if (req.body.username) req.body.username = req.sanitize(req.body.username);
    if (req.body.name) req.body.name = req.sanitize(req.body.name);
    if (req.body.email) req.body.email = req.sanitize(req.body.email);
    if (req.body.password) req.body.password = req.sanitize(req.body.password);
    if (req.body.title) req.body.title = req.sanitize(req.body.title);
    if (req.body.description) req.body.description = req.sanitize(req.body.description);
    if (req.body.text) req.body.text = req.sanitize(req.body.text);
    
    
    next();
  };
  

export {validateresult,validationFields,sanitizeInput}