import * as Yup from 'yup';

export default async (request, response, next) => {
  try {
    const schema = Yup.object().shape({
      startDate: Yup.date().required(),
      endDate: Yup.date().required(),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  } catch ({ errors }) {
    return response.status(406).json({ type: 'validation', errors });
  }
};
