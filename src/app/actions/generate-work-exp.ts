"use server";
import openai from "@/lib/openai";
import { canUseAITools } from "@/lib/permissions";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import {
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
  WorkExperience,
} from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";

export async function generateWorkExperience(
  input: GenerateWorkExperienceInput,
) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);
  if (!canUseAITools(subscriptionLevel)) {
    throw new Error("AI tools are not available for this subscription level");
  }

  const { description } = generateWorkExperienceSchema.parse(input);

  const systemMessage = `
  You are a job resume generator AI. Your task is to generate a single work experience entry based on the user input.
  You must adhare to the following structure. You can omit fields if they can't be infered from the provided data, but don't add any new ones.

  Job title: <job title>
  Company: <company name>
  Start date: <start date, format: YYY-MM-DD (only if provided)>
  End date: <end date, format: YYY-MM-DD (only if provided)>
  Description: <an optimized description in bullet format, might be infered from the job title>
  `;

  const useMessage = `
  Please provide a work experience entry from this description:
  ${description}
  `;

  console.log({ systemMessage });
  console.log({ useMessage });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: useMessage },
    ],
  });

  const aiResponse = completion.choices[0].message.content;
  if (!aiResponse) {
    throw new Error("Failed to generate AI response");
  }

  console.log({ aiResponse });
  // these regexes created by chatGPT.
  // all they do is for example in positon: find "Job title:" and paste the text after it.
  return {
    position: aiResponse.match(/Job title: (.*)/)?.[1] || "",
    company: aiResponse.match(/Company: (.*)/)?.[1] || "",
    description: (aiResponse.match(/Description:([\s\S]*)/)?.[1] || "").trim(),
    startDate: aiResponse.match(/Start date: (\d{4}-\d{2}-\d{2})/)?.[1],
    endDate: aiResponse.match(/End date: (\d{4}-\d{2}-\d{2})/)?.[1],
  } satisfies WorkExperience;
}
