import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/Common/Input';
import { loginUser } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((state) => state.auth);

  const validation = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(loginUser(values))
      .then(() => {
        navigate('/'); 
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setSubmitting(false); 
      });
  };
  useEffect(() => {
    if (token) {
      navigate('/'); 
    }
  }, [token]);


  return (
    <div className='flex justify-center items-center min-h-screen bannerImg p-4'>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validation}
        onSubmit={handleSubmit}
      >
        {formik => (
          <Form className="w-full max-w-md p-8 formBackgorund shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <Input label="Email" name="email" type="email" placeholder="Enter your email" formik={formik} />
            <Input label="Password" name="password" type="password" placeholder="Enter your password" formik={formik} />
            <button
              type="submit"
              className="w-full mt-4 py-2 px-4 bgButton text-white rounded-md hover:bg-blue-700 transition-colors"
              disabled={formik.isSubmitting || loading}
            >
              {loading ? "Submitting" : "Login"}
            </button>
            {error && <div className="text-red-500 text-sm mt-4">{error}</div>}
            <div className="mt-4 text-center">
              Don’t have an account?
              <button onClick={() => navigate('/signup')} className='mt-3 pl-2 text-blue-600 underline'>
                Sign up
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
