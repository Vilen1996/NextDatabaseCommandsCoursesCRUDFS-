import Database from "better-sqlite3";

export interface ICourse {
  id: number;
  name: string;
  price: number;
  cover: string;
  duration: number;
}

export type InputCourse = Omit<ICourse, "id">;

const db = new Database("courses.db");

export const addCourse = async (course: InputCourse) => {
  await db
    .prepare(
      `INSERT INTO courses(name, price, cover, duration) VALUES(@name, @price, @cover, @duration)`
    )
    .run(course);
};

export const getAllCourses = (): ICourse[] => {
  return db.prepare(`SELECT * FROM courses`).all() as ICourse[];
};

export const getCourseById = (id: number): ICourse | null => {
  const course = db.prepare(`SELECT * FROM courses WHERE id = ?`).get(id) as
    | ICourse
    | undefined;
  return course || null;
};

export const updateCourse = async (course: ICourse) => {
  const { id, name, price, cover, duration } = course;
  await db
    .prepare(
      `UPDATE courses SET name = @name, price = @price, cover = @cover, duration = @duration WHERE id = @id`
    )
    .run({ id, name, price, cover, duration });
};
