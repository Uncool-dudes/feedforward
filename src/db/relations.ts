// relations.ts
import { relations } from "drizzle-orm";
import { classes, courses, enrollments, faculty, students } from "./schema";

// courses 1—* classes
export const coursesRelations = relations(courses, ({ many }) => ({
	classes: many(classes),
}));

// faculty 1—* classes
export const facultyRelations = relations(faculty, ({ many }) => ({
	classes: many(classes),
}));

// classes *—1 courses, *—1 faculty, 1—* enrollments
export const classesRelations = relations(classes, ({ one, many }) => ({
	course: one(courses, {
		fields: [classes.courseId],
		references: [courses.courseId],
	}),
	faculty: one(faculty, {
		fields: [classes.classFaculty],
		references: [faculty.facultyId],
	}),
	enrollments: many(enrollments),
}));

// students 1—* enrollments
export const studentsRelations = relations(students, ({ many }) => ({
	enrollments: many(enrollments),
}));

// enrollments *—1 students, *—1 classes
export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
	student: one(students, {
		fields: [enrollments.studentId],
		references: [students.studentId],
	}),
	klass: one(classes, {
		fields: [enrollments.classId],
		references: [classes.classId],
	}),
}));
