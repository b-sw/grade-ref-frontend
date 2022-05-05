import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: 'Field must not be empty.',
  },
  string: {
    max: ({ max }) => {
      return `Enter maximum of ${max} characters.`;
    },
  },
});

export default Yup;