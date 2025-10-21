import { eq } from "drizzle-orm";
import { db } from ".";
import { classes, courses, enrollments, faculty, students } from "./schema";
import type {
	insertClass,
	insertCourse,
	insertEnrollment,
	insertFaculty,
	insertStudent,
} from "./types";

export const studentInsert = async (s: insertStudent[]) =>
	db.insert(students).values(s).returning();

export const facultyInsert = async (f: insertFaculty[]) =>
	db.insert(faculty).values(f).returning();

export const courseInsert = async (c: insertCourse[]) =>
	db.insert(courses).values(c).returning();

export const classeInsert = async (c: insertClass[]) =>
	db.insert(classes).values(c).returning();

export const enrollmentInsert = async (e: insertEnrollment[]) =>
	db.insert(enrollments).values(e).returning();

export const specificStudentSelect = async (email: string) =>
	db
		.select()
		.from(students)
		.innerJoin(enrollments, eq(students.studentId, enrollments.studentId))
		.innerJoin(classes, eq(enrollments.classId, classes.classId))
		.innerJoin(courses, eq(classes.courseId, courses.courseId))
		.where(eq(students.studentEmail, email));
