import * as Yup from 'yup';

export default async (request, response, next) => {
  try {
    const schema = Yup.object().shape({
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      farmId: Yup.string().uuid().required(),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  } catch ({ errors }) {
    return response.status(406).json({ type: 'validation', errors });
  }
};
