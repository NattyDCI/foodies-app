import MealItem from "./meal-item";
import classes from "./meals-grid.module.css";


export default function MealsGrid({ meals }) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          {/* i am using the spread operator to pass all the properties from the meal object that I am receiving, since the meal array will eventually have all those properties  */}
          <MealItem {...meal}/>
        </li>
      ))}
    </ul>
  );
}
