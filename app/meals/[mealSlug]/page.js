import Image from "next/image";
import classes from "./page.module.css";
import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";


export default function MealContent({params}) {
  const meal = getMeal(params.mealSlug);
  
  if (!meal) {
    notFound();
    console.log("reaches this guy")
  }
  
  // i am using the regular expression wich is used for line breakes /\n/g to replace the line breakes for br tags 
    meal.instructions = meal.instructions.replace(/\n/g, "<br />");
 
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
        </header>
        <main>
          {/* we can output html by setting the dangerouslySetInnerHTML prop to a
          parragram  */}
          <p
            className={classes.instructions}
            dangerouslySetInnerHTML={{
              __html: meal.instructions,
            }}
          ></p>
        </main>
      
    </>
  );
}
