import React, { useEffect, useState } from 'react';
import { CircularProgress, Container, Button, Typography, Grid, Card, CardContent, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchCourse, Course } from '../api'; // Assuming fetchCourse function returns a Course[]

const CourseEdit: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetchCourse();
        setCourses(res.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Container>
      <Typography variant="h2" gutterBottom>Courses</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {courses.map((course: Course) => (
            <Grid item xs={12} sm={6} md={4} key={course.courseId}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {course.courseName}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Instructor: {course.instructorName}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Tags: {course.tags.join(', ')}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Students: {course.students.map(student => student.name).join(', ')}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    to={`/edit-course/${course.courseId}`}
                    variant="contained"
                    color="primary"
                  >
                    Update
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default CourseEdit;
