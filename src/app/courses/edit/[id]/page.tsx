import { getCourseById } from "@/app/lib/api";
import EditCourseForm from "@/app/lib/components/EditCourseForm";

interface IProps {
  params: { id: string };
}

const EditCoursePage = ({ params }: IProps) => {
  const id = parseInt(params.id);
  const course = getCourseById(id);

  if (!course) {
    return (
      <>
        <h1>Course not found</h1>
        <p>The course you are looking for does not exist.</p>
      </>
    );
  }
  const coverPath = course.cover.startsWith("/")
    ? course.cover
    : `/${course.cover}`;

  return (
    <div>
      <h1 className="is-size-5">Edit Course</h1>
      <div className="columns">
        <div className="is-two-fifth">
          <EditCourseForm id={id} course={course} coverPath={coverPath} />
        </div>
      </div>
    </div>
  );
};

export default EditCoursePage;
