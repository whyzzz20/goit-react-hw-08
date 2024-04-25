import { Form, Formik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { register } from '../../redux/auth/operations';
import { selectErrorMessage } from '../../redux/auth/selectors';

import FormLabel from '../FormLabel';

const INITIAL_VALUES = {
  name: '',
  email: '',
  password: '',
};

const VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string().required('Required').min(5, 'Name must be longer'),
  email: Yup.string().email('Enter valid email address').required('Required'),
  password: Yup.string().required('Required').min(7, 'Password must be longer'),
});

const RegisterForm = () => {
  const error = useSelector(selectErrorMessage);

  const dispatch = useDispatch();

  const handleSubmit = values => {
    dispatch(register(values))
      .unwrap()
      .catch(() => toast.error(error));
  };
  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
      >
        <Form>
          <FormLabel title="username" />
          <FormLabel title="email" />
          <FormLabel title="password" />
          <button type="submit">Register</button>
        </Form>
      </Formik>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};
export default RegisterForm;
