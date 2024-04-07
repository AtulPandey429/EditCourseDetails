/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState, ChangeEvent } from 'react';
import { CircularProgress, Container, Button, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { fetchCourse, fetchStudents, fetchTags, Course, Tag, Student } from '../api';

interface FormData {
  courseName: string;
  instructorName: string;
  tags: Tag[];
  students: Student[];
}

const CourseEditForm: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    courseName: '',
    instructorName: '',
    tags: [],
    students: []
  });
  const [tagSuggestions, setTagSuggestions] = useState<Tag[]>([]);
  const [studentSuggestions, setStudentSuggestions] = useState<Student[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseData = await fetchCourse();
        const tagData = await fetchTags();
        const studentData = await fetchStudents();

        const course = courseData.courses.find((c: Course) => c.courseId === courseId);

        if (course) {
          setFormData({
            courseName: course.courseName || '',
            instructorName: course.instructorName || '',
            tags: course.tags || [],
            students: course.students || []
          });
        }
        setTagSuggestions(tagData.tags);
        setStudentSuggestions(studentData.enrolledList);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [courseId]);
  
  const handleChange = (e: ChangeEvent<any>, newValue: any, fieldName: keyof FormData) => {
   e.preventDefault()
    setFormData(prevState => ({
      ...prevState,
      [fieldName]: newValue
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Edited course data:', formData);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Typography variant="h2" gutterBottom>Edit Course Details</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="courseName"
          label="Course Name"
          value={formData.courseName}
          onChange={(e) => handleChange(e, e.target.value, 'courseName')}
          fullWidth
          margin="normal"
        />
        <TextField
          name="instructorName"
          label="Instructor Name"
          value={formData.instructorName}
          onChange={(e) => handleChange(e, e.target.value, 'instructorName')}
          fullWidth
          margin="normal"
        />
        <Autocomplete
          multiple
          id="tags"
          options={[{ label: "Press to add tags", value: "" }, ...tagSuggestions]}
          value={formData.tags}
          onChange={(e, newValue) => handleChange(e, newValue, 'tags')}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Tags" fullWidth margin="normal" />
          )}
        />
       
        <Autocomplete
          multiple
          id="students"
          options={studentSuggestions}
          getOptionLabel={(option) => option.name}
          value={formData.students}
          onChange={(e, newValue) => handleChange(e, newValue, 'students')}
          isOptionEqualToValue={(option, value) => option.name === value.name} 
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Students" fullWidth margin="normal" />
          )}
        />
      
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
    </Container>
  );
};

export default CourseEditForm;
