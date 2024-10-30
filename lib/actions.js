"use server";

//in server actions you are not limited to throw errors or redirect, 
// instead you can also return objects and you can access those objects in your components.


import {redirect} from "next/navigation";

import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

// server validation is important, therefore we create a function that checks those fields.


function isInvalidText(text) {
//check if its falsy or if its an empty string after trimming it
  return !text || text.trim() === "";

}

export async function shareMeal(prevState, formData) {

    const meal = {
      title: formData.get("title"),
      summary: formData.get('summary'),
      instructions: formData.get('instructions'),
      image: formData.get('image'),
      creator: formData.get('name'),
      creator_email: formData.get('email')
    };

    if (
      isInvalidText(meal.title) || 
      isInvalidText(meal.summary) ||
      isInvalidText(meal.instructions) ||
      isInvalidText(meal.image) ||
      isInvalidText(meal.creator) ||
      isInvalidText(meal.creator_email) ||
      !meal.creator_email.includes('@') ||
      !meal.image || meal.image.size === 0
    ){
      // you can return objects and have access to them in your components, 
      // they can not be serialized values like a method, because the content of the 
      // method would get lost. but you can return simple strings, nested objects or nested arrays.

      return {
      message: "Invalid Input"
    } 
  }

    await saveMeal(meal);
    // in production it performs aggresive caching meaning that all pages are pre-rendered 
    // wich results in great user experience, except when you add a new meal, it doesnt fetch the new data.
    // Instead the re-rendered page is the one being shown

    // when you also need to revalidate the subpages dependent on the meals you can use a second argument layout 
    // like this revalidatePath("/meals", "layout"); but we dont need it
   
    revalidatePath("/meals", "layout");
    redirect("/meals");

  }