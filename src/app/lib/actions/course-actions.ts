"use server";

import { createWriteStream } from "fs";
import { InputCourse, addCourse, getCourseById, updateCourse } from "../api";
import { redirect } from "next/navigation";

export const handleAdd = async (data: FormData) => {
  const photo = data.get("cover") as File;
  if (photo) {
    let extension = photo.type.split("/").at(-1);
    const filename = Date.now() + "." + extension;

    const stream = createWriteStream("public/images/" + filename);

    const bufferedImage = await photo.arrayBuffer();

    stream.write(Buffer.from(bufferedImage));

    let course: InputCourse = {
      name: data.get("name") as string,
      price: +(data.get("price") as string),
      duration: +(data.get("duration") as string),
      cover: "images/" + filename,
    };

    addCourse(course);
    redirect("/courses");
  }
};

export const handleEdit = async (id: string, data: FormData) => {
  const course = await getCourseById(+id);

  if (!course) {
    console.error(`Course with id ${id} not found.`);
    return { message: "Course not found." };
  }

  const name = data.get("name") as string;
  const price = +(data.get("price") as string);
  const duration = +(data.get("duration") as string);

  course.name = name;
  course.price = price;
  course.duration = duration;

  const photo = data.get("cover") as File;
  if (photo) {
    let extension = photo.type.split("/").at(-1);
    const filename = Date.now() + "." + extension;
    const stream = createWriteStream("public/images/" + filename);
    const bufferedImage = await photo.arrayBuffer();
    stream.write(Buffer.from(bufferedImage));
    course.cover = "images/" + filename;
  }

  updateCourse(course);
  redirect("/courses");
};
