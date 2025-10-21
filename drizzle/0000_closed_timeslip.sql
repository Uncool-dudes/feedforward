CREATE TYPE "public"."course-type" AS ENUM('Major', 'Minor', 'Core', 'Elective');--> statement-breakpoint
CREATE TYPE "public"."degree" AS ENUM('BTech', 'BCA');--> statement-breakpoint
CREATE TYPE "public"."schools" AS ENUM('SOB', 'SOCSE', 'SDI', 'SOL', 'SOEPP', 'SOFMCA', 'SOLAS');--> statement-breakpoint
CREATE TABLE "classes" (
	"course_id" text NOT NULL,
	"class_id" serial PRIMARY KEY NOT NULL,
	"class_section" text NOT NULL,
	"class_faculty" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"course_id" text PRIMARY KEY NOT NULL,
	"course_title" text NOT NULL,
	"course_type" "course-type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "enrollments" (
	"enrollment_id" serial PRIMARY KEY NOT NULL,
	"student_id" integer,
	"class_id" integer
);
--> statement-breakpoint
CREATE TABLE "faculty" (
	"faculty_id" serial PRIMARY KEY NOT NULL,
	"faculty_name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "students" (
	"student_id" serial PRIMARY KEY NOT NULL,
	"student_usn" text,
	"student_name" text NOT NULL,
	"student_email" text NOT NULL,
	"student_school" "schools" NOT NULL,
	"student_registered" boolean DEFAULT false NOT NULL,
	CONSTRAINT "students_studentEmail_unique" UNIQUE("student_email")
);
--> statement-breakpoint
ALTER TABLE "classes" ADD CONSTRAINT "classes_course_id_courses_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("course_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "classes" ADD CONSTRAINT "classes_class_faculty_faculty_faculty_id_fk" FOREIGN KEY ("class_faculty") REFERENCES "public"."faculty"("faculty_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_student_id_students_student_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("student_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_class_id_classes_class_id_fk" FOREIGN KEY ("class_id") REFERENCES "public"."classes"("class_id") ON DELETE no action ON UPDATE no action;