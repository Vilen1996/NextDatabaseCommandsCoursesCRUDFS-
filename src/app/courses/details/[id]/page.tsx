import { getCourseById } from "@/app/lib/api";
import Image from "next/image";
import { ICourse } from "@/app/lib/api";

interface IProps {
  params: { id: string };
}

const CoursePage = async ({ params }: IProps) => {
  const id = parseInt(params.id);
  const course: ICourse | null = await getCourseById(id);

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
    <>
      <h1>{course.name}</h1>
      <p>
        {course.duration
          ? `${course.duration} hours`
          : "Duration not available"}
      </p>
      <p>{course.price ? `$${course.price}` : "Price not available"}</p>
      <div className="box" style={{ width: 500, height: 500 }}>
        {course.cover ? (
          <Image src={coverPath} width={500} height={500} alt="Course cover" />
        ) : (
          <p>Cover image not available</p>
        )}
      </div>
    </>
  );
};

export default CoursePage;
