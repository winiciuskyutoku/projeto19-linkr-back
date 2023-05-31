
export const  signInValidation = (schema)=> {
  return (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).send("error in the structure");

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    next();
  };
}