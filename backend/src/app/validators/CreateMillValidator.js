import * as Yup from 'yup';

export default async (request, response, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().min(5).max(15).required(),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  } catch ({ errors }) {
    return response.status(406).json({ type: 'validation', errors });
  }
};
