// src/components/AilmentLog.jsx

import React from 'react';
import { useFormik } from 'formik';
import { createAilment } from '../api';

const AilmentLog = () => {
  const formik = useFormik({
    initialValues: {
      full_name: '',
      department: '',
      ailment: '',
      age: '',
      date: '',
      description: '',
      upload: null
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach(key => formData.append(key, values[key]));

      try {
        await createAilment(formData);
        alert('Ailment logged successfully');
      } catch (error) {
        console.error('Logging ailment failed', error);
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name="full_name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.full_name}
      />
      <input
        name="department"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.department}
      />
      <input
        name="ailment"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.ailment}
      />
      <input
        name="age"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.age}
      />
      <input
        name="date"
        type="date"
        onChange={formik.handleChange}
        value={formik.values.date}
      />
      <textarea
        name="description"
        onChange={formik.handleChange}
        value={formik.values.description}
      />
      <input
        name="upload"
        type="file"
        onChange={(event) => formik.setFieldValue('upload', event.currentTarget.files[0])}
      />
      <button type="submit">Log Ailment</button>
    </form>
  );
};

export default AilmentLog;
