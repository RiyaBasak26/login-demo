import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../../redux/authSlice';
import Input from '../../components/Common/Input';
import './style.css';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  role: Yup.string().required('Role is required'),
});

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isSignupSuccessful } = useSelector((state) => state.auth);

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(signupUser(values));
    setSubmitting(false);
  };

  useEffect(() => {
    if (isSignupSuccessful) {
      navigate('/email-varification');
    }
  }, [isSignupSuccessful, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bannerImg p-4 sm:p-8">
      <Formik
        initialValues={{ name: '', username: '', email: '', password: '', role: '0' }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg formBackgorund ">
            <h1 className="text-2xl font-bold mb-5 text-center">Sign Up</h1>
            <Input
              label="Name"
              name="name"
              placeholder="Enter your name"
              formik={formik}
            />
            <Input
              label="Username"
              name="username"
              placeholder="Enter your username"
              formik={formik}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              formik={formik}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              formik={formik}
            />
            <div className="mb-4">
              <label className="font-medium mb-1 block">Role</label>
              <select
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full p-2 border rounded-md ${
                  formik.touched.role && formik.errors.role ? 'border-red-600' : 'border-gray-300'
                }`}
              >
                <option value="" label="Select role" />
                <option value="0" label="User" />
                <option value="1" label="Creator" />
                <option value="2" label="Studio" />
              </select>
              {formik.touched.role && formik.errors.role && (
                <div className="text-red-600 text-sm mt-1">{formik.errors.role}</div>
              )}
            </div>
            <button
              type="submit"
              disabled={formik.isSubmitting || loading}
              className="w-full text-white bgButton py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              {loading ? 'Submitting...' : 'Sign Up'}
            </button>
            {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
            <div className="mt-4 text-center">
              Already have an account?
              <button onClick={() => navigate('/login')} className="ml-2 text-blue-600 underline hover:text-blue-800">
                Login
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
