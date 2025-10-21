import type {
	insertClass,
	insertCourse,
	insertFaculty,
	insertStudent,
} from "./types";

export const studentsValues: insertStudent[] = [
	{
		studentName: "Ananth Pullur",
		studentEmail: "ananthp.btech23@rvu.edu.in",
		studentSchool: "SOCSE",
		studentUSN: "1RVU23CSE049",
	},
	{
		studentName: "Apoorv Gadiya",
		studentEmail: "apoorvg.btech23@rvu.edu.in",
		studentSchool: "SOCSE",
		studentUSN: "1RVU23CSE072",
	},
];

export const coursesValues: insertCourse[] = [
	{
		courseId: "CS3703",
		courseTitle: "Theory of Computation",
		courseType: "Core",
	},
	{
		courseId: "CS3100",
		courseTitle: "IoT and Edge Computing",
		courseType: "Core",
	},
	{
		courseId: "CS3232",
		courseTitle: "Fundamentals of Deep Learning",
		courseType: "Major",
	},
	{
		courseId: "CS3330",
		courseTitle: "Introduction to Full Stack Development",
		courseType: "Major",
	},
	{
		courseId: "CS3531",
		courseTitle: "Advanced AWS Cloud computing",
		courseType: "Major",
	},
];

export const facultyValues: insertFaculty[] = [
	{
		facultyName: "Aparna R",
	},
	{
		facultyName: "Thiruselvan S",
	},
	{
		facultyName: "Deepika S",
	},
	{
		facultyName: "Ashwini Kumar Mathur",
	},
	{
		facultyName: "Monesh N",
	},
	{
		facultyName: "Shilpa A Hiremath",
	},
];

export const classesValues: insertClass[] = [
	{
		courseId: "CS3703",
		classSection: "A",
		classFaculty: 4,
	},
	{
		courseId: "CS3703",
		classSection: "H",
		classFaculty: 3,
	},
	{
		courseId: "CS3100",
		classSection: "A",
		classFaculty: 6,
	},
	{
		courseId: "CS3100",
		classSection: "H",
		classFaculty: 5,
	},
	{
		courseId: "CS3531",
		classFaculty: 1,
		classSection: "H",
	},
];
