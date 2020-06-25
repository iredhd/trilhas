import * as Yup from 'yup';

class Validation {
  static password = Yup.string().min(6);

  static email = Yup.string().email();

  static userName = Yup.string();

  static city = Yup.object();

  static async login(data) {
    try {
      const schema = Yup.object().shape({
        email: this.email.required(),
        password: this.password.required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      return null;
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((validationError) => {
        validationErrors[validationError.path] = validationError.message;
      });

      return validationErrors;
    }
  }

  static async register(data) {
    try {
      const schema = Yup.object().shape({
        name: this.userName.required(),
        email: this.email.required(),
        password: this.password.required(),
        passwordConfirmation: this.password.oneOf([Yup.ref('password')]).required(),
        city: this.city.required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      return null;
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((validationError) => {
        validationErrors[validationError.path] = validationError.message;
      });

      return validationErrors;
    }
  }
}

export default Validation;
