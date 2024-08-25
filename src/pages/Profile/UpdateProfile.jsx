import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/authSlice';
import Input from '../../components/Common/Input';
import './style.css';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    city: Yup.number().nullable(),
    state: Yup.number().nullable(),
    country: Yup.number().nullable(),
    phone: Yup.string().nullable(),
    address: Yup.string().nullable(),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    username: Yup.string().required('Username is required'),
    bio: Yup.string().nullable(),
    profile_img: Yup.mixed(),
    banner_img: Yup.mixed(),
  });

  console.log("user",user)
  const handleSubmit = (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append('user_id', user?.user_id);
    formData.append('name', values.name);
    formData.append('city', values.city || '');
    formData.append('state', values.state || '');
    formData.append('country', values.country || '');
    formData.append('phone', values.phone || '');
    formData.append('address', values.address || '');
    formData.append('email', values.email);
    formData.append('username', values.username);
    formData.append('bio', values.bio || '');

    if (values.profile_img) {
      formData.append('profile_img', values.profile_img);
    }
    if (values.banner_img) {
      formData.append('banner_img', values.banner_img);
    }

    dispatch(updateUser(formData))
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bannerImg p-4 sm:p-8">
      <Formik
        initialValues={{
          name: user?.name || '',
          city: user?.city || '',
          state: user?.state || '',
          country: user?.country || '',
          phone: user?.phone || '',
          address: user?.address || '',
          email: user?.email || '',
          username: user?.username || '',
          profile_img: null,
          banner_img: null,
          bio: user?.bio || '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {formik => (
          <Form className="w-full max-w-2xl p-8 formBackgorund shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Name" name="name" type="text" placeholder="Enter your name" formik={formik} />
              <Input label="City" name="city" type="number" placeholder="Enter your city ID" formik={formik} />
              <Input label="State" name="state" type="number" placeholder="Enter your state ID" formik={formik} />
              <Input label="Country" name="country" type="number" placeholder="Enter your country ID" formik={formik} />
              <Input label="Phone" name="phone" type="text" placeholder="Enter your phone" formik={formik} />
              <Input label="Address" name="address" type="text" placeholder="Enter your address" formik={formik} />
              <Input label="Email" name="email" type="email" placeholder="Enter your email" formik={formik} />
              <Input label="Username" name="username" type="text" placeholder="Enter your username" formik={formik} />
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4">
              <div className="mb-4">
                <label className="block text-sm font-medium">Profile Image</label>
                <input
                  type="file"
                  name="profile_img"
                  onChange={(event) => formik.setFieldValue('profile_img', event.currentTarget.files[0])}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Banner Image</label>
                <input
                  type="file"
                  name="banner_img"
                  onChange={(event) => formik.setFieldValue('banner_img', event.currentTarget.files[0])}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <Input label="Bio" name="bio" type="text" placeholder="Enter your bio" formik={formik} />
            </div>
            <button
              type="submit"
              className="w-full mt-4 py-2 px-4 bgButton  text-white rounded-md hover:bg-blue-700 transition-colors"
              disabled={formik.isSubmitting || loading}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
            {error && <div className="text-red-500 text-sm mt-4">{error}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateProfile;
