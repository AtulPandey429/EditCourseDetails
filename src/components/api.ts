import axios, { AxiosResponse } from 'axios';

const baseURL = 'https://raw.githubusercontent.com/thedevelopers-co-in/dummy-api/main/';

const api = axios.create({
  baseURL,
});

interface Course {
  courseId: string;
  courseName: string;
  instructorName: string;
  tags: string[];
  students: { name: string }[];
}

interface Tag {
  label: string;
  value: string;
}

interface Student {
  name: string;
}

const fetchCourse = async (): Promise<Course[]> => {
  try {
    const response: AxiosResponse<Course[]> = await api.get('course.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw new Error('Error fetching courses');
  }
};

const fetchStudents = async (): Promise<{ enrolledList: Student[] }> => {
  try {
    const response: AxiosResponse<{ enrolledList: Student[] }> = await api.get('students.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw new Error('Error fetching students');
  }
};

const fetchTags = async (): Promise<{ tags: Tag[] }> => {
  try {
    const response: AxiosResponse<{ tags: Tag[] }> = await api.get('tags.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw new Error('Error fetching tags');
  }
};

export { fetchCourse, fetchStudents, fetchTags, type Course, type Student, type Tag };
