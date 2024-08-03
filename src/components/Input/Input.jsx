import React from 'react';
import { Formik } from 'formik';

export const Input = ({ onSubmit }) => (
  <div>
    <Formik
      initialValues={{ name: '', email: '', age: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        else if (!values.name) {
          errors.name = 'Required';

        }
        else if (!values.age) {
          errors.age = 'Required';

        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        onSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={onSubmit} className='space-y-3'>

          <div>
            <input
              className='w-[200px]  p-2 h-[30px] rounded-lg border border-1 border-black'
              type="email"
              name="email"
              placeholder='Enter Email'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
          </div>
          <div>
            <input
              placeholder='Enter Full name'

              type="text"
              name="name"
              className='w-[200px] p-2 h-[30px] rounded-lg border border-1 border-black'

              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name && touched.name && errors.name}

          </div>
          <div>
            <input
              className='w-[200px]  p-2 h-[30px] rounded-lg border border-1 border-black'
              type="text"
              name="age"
              placeholder='Enter Age'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.age}
            />
            {errors.age && touched.age && errors.age}
          </div>

          <button className='bg-[#3498db] p-1 w-[100px] text-white rounded-lg' type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  </div>
);

