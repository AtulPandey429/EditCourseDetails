import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CourseEdit from './components/course/CourseEdit';
import CourseEditForm from './components/course/CourseForm';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<CourseEdit />} />
        <Route path="/edit-course/:courseId" element={<CourseEditForm />} />
      </Routes>
    </>
  );
};

export default App;
