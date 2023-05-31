export default function schemaValidation(schema) {
  return (req, res, next) => {
      res.locals.passwordConfirm = req.body.confirmPassword;
      const validation = schema.validate(req.body, { abortEarly: false });

      if (validation.error) {
          const errors = validation.error.details.map(detail => detail.message);
          return res.status(422).send(errors);
      }
      next();
  }
}