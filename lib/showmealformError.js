export default function showmealformError(isInvalidInput, meals) {
  const errors = {};
  if (isInvalidInput(meals.title)) {
    errors.title = "Title is invalid or missing, check!";
  }
  if (isInvalidInput(meals.summary)) {
    errors.summary = "Summary is invalid or missing, check!";
  }
  if (isInvalidInput(meals.instructions)) {
    errors.instructions = "Instructions are invalid or missing, check!";
  }
  if (isInvalidInput(meals.creator)) {
    errors.creator = "Creator name is invalid or missing, check!";
  }
  if (
    isInvalidInput(meals.creator_email) ||
    !meals.creator_email.includes("@") ||
    !meals.creator_email.includes(".")
  ) {
    errors.creator_email = "Creator email is invalid or missing, check!";
  }
  if (!meals.image || meals.image.size === 0) {
    errors.image = "Image is invalid or missing, check!";
  }
  return { errors };
}
