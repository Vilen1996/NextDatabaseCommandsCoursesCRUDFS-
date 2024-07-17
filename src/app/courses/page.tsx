import Link from "next/link";
import { getAllCourses } from "../lib/api";

export default function Page() {
  const courses = getAllCourses();

  return (
    <>
      <p className="is-size-3 p-6 m-6">Courses</p>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <Link href={`/courses/details/${course.id}`}>{course.name}</Link>
            <br />
            <Link href={`/courses/edit/${course.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
