import { eq } from "drizzle-orm";
import FeedbackForm from "@/components/feedback-form";
import { db } from "@/db";
import { students } from "@/db/schema";

export default async function Home() {
	// await studentInsert(studentsValues);
	// await facultyInsert(facultyValues);
	// await courseInsert(coursesValues);
	// await classeInsert(classesValues);
	console.dir(
		await db.query.students.findFirst({
			where: eq(students.studentEmail, "ananthp.btech23@rvu.edu.in"),
			with: {
				enrollments: {
					with: {
						class: {
							with: {
								course: true,
							},
						},
					},
				},
			},
		}),
	);
	return (
		<FeedbackForm
			courseCode="CS3911"
			courseTitle="Start Up Practicum 3"
			courseFaculty="Mr. Suresh N"
		/>
	);
}
