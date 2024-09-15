import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/authSlice';
import Input from '../../components/Common/Input';
import { BASE_URL, API } from '../../constant';
import axios from 'axios';
import './style.css';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { user, loading, error, token } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [profileFileName, setProfileFileName] = useState('');
  const [bannerFileName, setBannerFileName] = useState('');

  const getUserDetail = async () => {
    await axios.get(`${API.GET_USER_DETAILS(user?.user_id)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setUserData(response.data.data);
        if (response.data.data.profile_img) {
          const profileImgFileName = response.data.data.profile_img.split('/').pop();
          setProfileFileName(profileImgFileName);
        }
        if (response.data.data.banner_img) {
          const bannerImgFileName = response.data.data.banner_img.split('/').pop();
          setBannerFileName(bannerImgFileName);
        }
      })
      .catch((err) => console.error('Error fetching user details:', err));

  }

  useEffect(() => {
    if (token && user?.user_id) {
      getUserDetail()
    }
  }, [token, user]);

  useEffect(() => {
    if (token) {
      axios.get(`${BASE_URL}/country`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setCountries(response.data.data);
        })
        .catch((err) => console.error('Error fetching countries:', err));
    }
  }, [token]);

  useEffect(() => {
    if (userData) {
      fetchStates(userData?.country)
      fetchCities(userData?.state)
    }
  }, [userData])

  const fetchStates = async (countryId) => {
    await axios.get(`${BASE_URL}/state/${countryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => setStates(response.data.data))
      .catch((err) => console.error('Error fetching states:', err));
  };

  const fetchCities = async (stateId) => {
    await axios.get(`${BASE_URL}/city/${stateId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => setCities(response.data.data))
      .catch((err) => console.error('Error fetching cities:', err));
  };

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

  });

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
      {userData ? (
        <Formik
          initialValues={{
            name: userData.name || '',
            city: userData.city || '',
            state: userData.state || '',
            country: userData.country || '',
            phone: userData.phone || '',
            address: userData.address || '',
            email: userData.email || '',
            username: userData.username || '',
            profile_img: null,
            banner_img: null,
            bio: userData.bio || '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {formik => (
            <Form className="w-full max-w-2xl p-8 formBackgorund shadow-lg rounded-lg">
              <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Name" name="name" type="text" placeholder="Enter your name" formik={formik} />

                <div className="mb-4">
                  <label className="block  font-medium mb-4">Country</label>
                  <select
                    name="country"
                    onChange={(e) => {
                      formik.handleChange(e);
                      fetchStates(e.target.value);
                    }}
                    value={formik.values.country}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.id}>{country.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block font-medium mb-4">State</label>
                  <select
                    name="state"
                    onChange={(e) => {
                      formik.handleChange(e);
                      fetchCities(e.target.value);
                    }}
                    value={formik.values.state}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.id} value={state.id}>{state.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block font-medium mb-4">City</label>
                  <select
                    name="city"
                    onChange={formik.handleChange}
                    value={formik.values.city}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>{city.name}</option>
                    ))}
                  </select>
                </div>
                <Input label="Phone" name="phone" type="number" placeholder="Enter your phone" formik={formik} />
                <Input label="Address" name="address" type="text" placeholder="Enter your address" formik={formik} />
                <Input label="Email" name="email" type="email" placeholder="Enter your email" formik={formik} />
                <Input label="Username" name="username" type="text" placeholder="Enter your username" formik={formik} />
              </div>

              <div className="grid grid-cols-1 gap-4 mt-4 ">
                <div className="mb-4">
                  <label className="block font-medium mb-4">Profile Image</label>
                  <input
                    type="file"
                    name="profile_img"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      setProfileFileName(file ? file.name : '');  // Update file name
                      formik.setFieldValue('profile_img', file);
                    }}
                    className="w-full p-2 border rounded-md"
                  />
                  {profileFileName && (
                    <p className="text-sm text-white mt-1">Selected file: {profileFileName}</p>
                  )}
                </div>

                {/* Banner Image Input */}
                <div className="mb-4">
                  <label className="block  font-medium mb-4">Banner Image</label>
                  <input
                    type="file"
                    name="banner_img"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      setBannerFileName(file ? file.name : '');  // Update file name
                      formik.setFieldValue('banner_img', file);
                    }}
                    className="w-full p-2 border rounded-md"
                  />
                  {bannerFileName && (
                    <p className="text-sm text-white mt-1">Selected file: {bannerFileName}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-2 px-4 bgButton text-white rounded-md hover:bg-blue-700 transition-colors"
                disabled={formik.isSubmitting || loading}
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
              {error && <div className="text-red-500 text-sm mt-4">{error}</div>}
            </Form>
          )}
        </Formik>
      ) : (
        <h1 className='text-white font-bold'>Loading user details...</h1>
      )}
    </div>
  );
};

export default UpdateProfile;
