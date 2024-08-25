import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../../redux/authSlice';
import Input from '../../components/Common/Input';

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
    console.log("err",error)
  };

  // Redirect to email verification if signup is successful
  useEffect(() => {
    if (isSignupSuccessful) {
      navigate('/email-varification');
    }
  }, [isSignupSuccessful, navigate]);

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Signup</h1>
      <Formik
        initialValues={{ name: '', username: '', email: '', password: '', role: '0' }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
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
            {/* Role Dropdown */}
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
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              {loading ? 'Submitting...' : 'Sign Up'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
