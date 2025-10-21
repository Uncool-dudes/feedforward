import type {
	classes,
	courses,
	enrollments,
	faculty,
	students,
} from "@/db/schema";

export type insertStudent = typeof students.$inferInsert;
export type insertCourse = typeof courses.$inferInsert;
export type insertFaculty = typeof faculty.$inferInsert;
export type insertClass = typeof classes.$inferInsert;
export type insertEnrollment = typeof enrollments.$inferInsert;

export type selectStudent = typeof students.$inferSelect;
export type selectCourse = typeof courses.$inferSelect;
export type selectFaculty = typeof faculty.$inferSelect;
export type selectClass = typeof classes.$inferSelect;
export type selectEnrollment = typeof enrollments.$inferSelect;
