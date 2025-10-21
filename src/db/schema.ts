import { relations } from "drizzle-orm";
import {
	boolean,
	integer,
	pgEnum,
	pgTable,
	serial,
	text,
} from "drizzle-orm/pg-core";

export const CourseType = pgEnum("course-type", [
	"Major",
	"Minor",
	"Core",
	"Elective",
]);

export const Schools = pgEnum("schools", [
	"SOB",
	"SOCSE",
	"SDI",
	"SOL",
	"SOEPP",
	"SOFMCA",
	"SOLAS",
]);

export const Degee = pgEnum("degree", ["BTech", "BCA"]);

export const courses = pgTable(
	"courses",
	{
		courseId: text().primaryKey(),
		courseTitle: text().notNull(),
		courseType: CourseType().notNull(),
	},
	// (table) => [index("course_type_grouping").on(table.courseType)],
);

export const faculty = pgTable("faculty", {
	facultyId: serial().primaryKey(),
	facultyName: text().notNull(),
});

export const classes = pgTable("classes", {
	courseId: text()
		.references(() => courses.courseId)
		.notNull(),
	classId: serial().primaryKey(),
	classSection: text().notNull(),
	classFaculty: integer()
		.references(() => faculty.facultyId)
		.notNull(),
});

export const enrollments = pgTable("enrollments", {
	enrollmentId: serial().primaryKey(),
	studentId: integer().references(() => students.studentId),
	classId: integer().references(() => classes.classId),
});

export const students = pgTable("students", {
	studentId: serial().primaryKey(),
	studentUSN: text(),
	studentName: text().notNull(),
	studentEmail: text().notNull().unique(),
	studentSchool: Schools().notNull(),
	studentRegistered: boolean().notNull().default(false),
});

export const coursesRelations = relations(courses, ({ many }) => ({
	classes: many(classes),
}));

export const facultyRelations = relations(faculty, ({ many }) => ({
	classes: many(classes),
}));

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

export const studentsRelations = relations(students, ({ many }) => ({
	enrollments: many(enrollments),
}));

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
	student: one(students, {
		fields: [enrollments.studentId],
		references: [students.studentId],
	}),
	class: one(classes, {
		fields: [enrollments.classId],
		references: [classes.classId],
	}),
}));
