import MealItem from "./meal-item";
import classes from "./meals-grid.module.css";
export default async function MealsGrid({ meals }) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>{<MealItem {...meal} />}</li>
      ))}
    </ul>
  );
}
