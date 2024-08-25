import React from 'react'

const Input = ({label,name,type,placeholder,formik}) => {
  return (
    <div className='mb-4'>
        <label className='font-medium mb-4'>{label}</label>
        <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        className="w-full p-2 border rounded-md mt-2 text-blue-700"

        />
        {
            formik.touched[name] && formik.errors[name] ? (
            <div className='text-red-600 text-sm'>
            {formik.errors[name]}
            </div>
                ):null
        }
    </div>
  )
}

export default Input