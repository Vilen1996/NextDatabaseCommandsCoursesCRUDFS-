"use client";

import { handleEdit } from "@/app/lib/actions/course-actions";
import { ImagePicker } from "@/app/lib/components/image-picker";
import { ICourse } from "../api";

interface IProps {
  id: number;
  course: ICourse;
  coverPath: string;
}

const EditCourseForm = ({ id, course, coverPath }: IProps) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await handleEdit(id.toString(), formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field my-4">
        <input
          type="text"
          className="input is-primary"
          name="name"
          defaultValue={course.name}
          placeholder="Enter a name"
        />
      </div>
      <div className="field my-4">
        <input
          type="text"
          className="input is-primary"
          name="price"
          defaultValue={course.price}
          placeholder="Enter a price"
        />
      </div>
      <div className="field my-4">
        <input
          type="text"
          className="input is-primary"
          name="duration"
          defaultValue={course.duration}
          placeholder="Enter a duration"
        />
      </div>
      <div className="field my-4">
        <ImagePicker defaultImage={coverPath} />
      </div>
      <div className="field my-4">
        <button type="submit" className="button is-danger">
          Submit
        </button>
      </div>
    </form>
  );
};

export default EditCourseForm;
