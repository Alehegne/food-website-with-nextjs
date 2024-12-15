"use server";
import slugify from "slugify";
import { saveMeal } from "./dbmeals";
import { redirect } from "next/navigation";
import showmealformError from "./showmealformError";
import { revalidatePath } from "next/cache";

/**
 * Submits meal data to the server.
 *
 * @param {FormData} formData - The form data containing meal information.
 * @throws {Error} Throws an error if the formData parameter is null, undefined, or invalid.
 * @returns {Promise<Object|Error>} Resolves to an object containing the server response or rejects with an error.
 */

export async function submitMeals(prevState, formData) {
  //submitMeals function
  if (!formData) {
    throw new Error("Form data is required");
  }
  function isInvalidInput(data) {
    return !data || data === " ";
  }

  const meals = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };
  //validating data
  if (
    isInvalidInput(meals.title) ||
    isInvalidInput(meals.summary) ||
    isInvalidInput(meals.instructions) ||
    isInvalidInput(meals.image) ||
    isInvalidInput(meals.creator) ||
    isInvalidInput(meals.creator_email) ||
    !meals.creator_email.includes("@") ||
    !meals.creator_email.includes(".") ||
    !meals.image ||
    meals.image.size === 0
  ) {
    return showmealformError(isInvalidInput, meals);
  }

  //save meal
  await saveMeal(meals);
  //redirect to the home page
  revalidatePath("/meals");
  redirect("/meals");
}
