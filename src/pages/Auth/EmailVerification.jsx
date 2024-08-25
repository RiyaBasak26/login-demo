import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { verifyEmail, resetEmailVerification } from '../../redux/authSlice';
import Input from '../../components/Common/Input';
import './style.css'

const EmailVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isEmailVerified } = useSelector((state) => state.auth);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    otp: Yup.number().required('OTP is required').typeError('OTP must be a number'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(verifyEmail(values));
    setSubmitting(false);
  };

  useEffect(() => {
    if (isEmailVerified) {
      navigate('/login'); 
    }
    return () => {
      dispatch(resetEmailVerification()); 
    };
  }, [isEmailVerified, navigate, dispatch]);

  return (
    <div className="flex justify-center items-center min-h-screen bannerImg">
      <Formik
        initialValues={{ email: '', otp: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {formik => (
          <Form className="w-full max-w-lg p-8 bg-white shadow-lg formBackgorund rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Email Verification</h2>
            <Input label="Email" name="email" type="email" placeholder="Enter your email" formik={formik} />
            <Input label="OTP" name="otp" type="text" placeholder="Enter your OTP" formik={formik} />
            <button
              type="submit"
              className="w-full mt-4 py-2 px-4 bgButton text-white rounded-md"
              disabled={formik.isSubmitting || loading}
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
            {error && <div className="text-red-500 text-sm mt-4">{error}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EmailVerification;
