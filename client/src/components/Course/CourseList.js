import { useState, useEffect } from 'react';
import CourseItem from './CourseItem';

export default function CourseList({ isAdmin, courses }) {
  const [courseList, setCourseList] = useState(courses ?? []);

  useEffect(() => {
    setCourseList(courses ?? []);
  }, [courses]);

  return courseList?.map((course) => (
    <CourseItem key={course.id} isAdmin={isAdmin} courses={courseList} course={course} onChangeCourse={setCourseList} />
  ));
}
