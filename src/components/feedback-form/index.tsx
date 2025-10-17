"use client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod/v4";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export interface FeedbackFormProps {
	courseCode: string;
	courseTitle: string;
	courseFaculty: string;
}

export default function FeedbackForm(props: FeedbackFormProps) {
	const minValue = 1;
	const maxValue = 5;

	const LABELS: Record<number, string> = {
		0: "Strongly disagree",
		1: "Disagree",
		2: "Neutral",
		3: "Agree",
		4: "Strongly agree",
		5: "Excellent",
	};

	const options = Array.from(
		{ length: maxValue - minValue + 1 },
		(_, i) => minValue + i,
	);
	const questionsObject = [
		{
			name: "syllabusCoverage",
			question: "Does the teacher cover the syllabus on time?",
		},
		{
			name: "subjectOrganizationClarity",
			question:
				"Was the teacher’s overall organization and presentation of the subject clear?",
		},
		{
			name: "theoryToPracticeBridging",
			question:
				"Does the teacher effectively bridge theoretical concepts with real-world examples for practical understanding?",
		},
		{
			name: "studentParticipationEncouragement",
			question:
				"To what extent did the teacher encourage student participation, discussions, and clarification of doubts?",
		},
		{
			name: "communicationAbility",
			question: "How satisfactory was the teacher's communication ability?",
		},
		{
			name: "discussionEncouragement",
			question:
				"To what extent did the teacher encourage participation and discussion among students?",
		},
		{
			name: "courseMaterialAdequacy",
			question: "Was the course material handed out adequate?",
		},
		{
			name: "innovativeTeachingMethods",
			question:
				"To what extent were innovative teaching and learning methods (such as active learning, collaborative learning, peer learning, etc.) and modern teaching tools (like Google Classroom, Google Forms, etc.) implemented in the course?",
		},
		{
			name: "innovativeAssessmentMethods",
			question:
				"Was the teacher using any innovative assessment methods for this course (like mini projects, review reports, online coding, concept tests, MOOCs, etc.)?",
		},
		{
			name: "rubricBasedAssessment",
			question: "Does the teacher assess the answer scripts using rubrics?",
		},
	] as const;
	const ratingField = z
		.number({ error: "Answer the question" })
		.min(minValue, { message: `Value must be at least ${minValue}` })
		.max(maxValue, { message: `Value must be at most ${maxValue}` });

	const formSchema = z.object({
		syllabusCoverage: ratingField,
		subjectOrganizationClarity: ratingField,
		theoryToPracticeBridging: ratingField,
		studentParticipationEncouragement: ratingField,
		communicationAbility: ratingField,
		discussionEncouragement: ratingField,
		courseMaterialAdequacy: ratingField,
		innovativeTeachingMethods: ratingField,
		innovativeAssessmentMethods: ratingField,
		rubricBasedAssessment: ratingField,
	});
	const form = useForm({
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			console.log("Something");
			toast("You submitted successfully.", {
				description: (
					<pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
						<code>{JSON.stringify(value, null, 2)}</code>
					</pre>
				),
				position: "bottom-right",
				classNames: {
					content: "flex flex-col gap-2",
				},
				style: {
					"--border-radius": "calc(var(--radius)  + 4px)",
				} as React.CSSProperties,
			});
		},
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					Feedback Form for {props.courseCode} {props.courseTitle} taught by{" "}
					{props.courseFaculty}
				</CardTitle>
				<CardDescription>
					The ratings 5 is for excellent and 1 is for Not Satisfactory.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					id="feedbackForm"
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup className="flex flex-col gap-10 max-w-xl">
						{questionsObject.map(({ name, question }) => (
							<form.Field
								key={name}
								name={name}
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>{question}</FieldLabel>
											<RadioGroup
												// defaultValue={String(field.state.value ?? minValue)}
												onValueChange={(val: string) =>
													field.handleChange(Number(val))
												}
												onBlur={() => field.handleBlur()}
												aria-invalid={isInvalid}
												id={field.name}
											>
												<div className="flex flex-row gap-2 mt-2">
													{options.map((num) => {
														const id = `${field.name}-option-${num}`;
														const labelText = LABELS[num] ?? String(num);
														return (
															<div
																key={num}
																className="flex items-center gap-3"
															>
																<RadioGroupItem value={String(num)} id={id} />
																<Label htmlFor={id}>{labelText}</Label>
															</div>
														);
													})}
												</div>
											</RadioGroup>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>
						))}
					</FieldGroup>
				</form>
			</CardContent>
			<CardFooter>
				<Field orientation="horizontal">
					<Button type="submit" form="feedbackForm">
						Submit
					</Button>
				</Field>
			</CardFooter>
		</Card>
	);
}
