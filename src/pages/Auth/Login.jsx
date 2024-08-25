import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/Common/Input';
import { loginUser } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const validation = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(loginUser(values)).then(() => {
        navigate('/'); // Redirect to homepage after successful login
      })
      .catch((err) => {
        console.log("err",err)

      })
      .finally(() => {
        setSubmitting(false); // Ensure submitting state is reset
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redirect to homepage if authenticated
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validation}
        onSubmit={handleSubmit}
      >
        {formik => (
          <Form className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <Input label="Email" name="email" type="email" placeholder="Enter your email" formik={formik} />
            <Input label="Password" name="password" type="password" placeholder="Enter your password" formik={formik} />
            <button
              type="submit"
              className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-md"
              disabled={formik.isSubmitting || loading}
            >
              {loading ? "Submitting" : "Login"}
            </button>
            {error && <div className="text-red-500 text-sm mt-4">{error}</div>}
          </Form>
        )}
      </Formik>
      <div>
        Don’t have an account?
        <button onClick={() => navigate('/signup')}>Sign up</button>
      </div>
    </div>
  );
}

export default Login;
