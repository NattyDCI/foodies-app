import sql from "better-sqlite3";


// we can establish a connection by executing sql as a function and passing the name of the database as a string
const db = sql("meals.db")

// we can work on the db object to perform actions on that database

export async function getMeals() {

    await new Promise((response) => setTimeout(response, 3000));

    // so we use the db object and write a statement that should be executed. 
    // In this case I want to select all columns from the meals table and all is used to fetch the data.
    // if you wanted a single row you should use get instead. we are not working with promises here.. but we can use
    // it inside the component with ease. you can not do that on client components in react but you can do it in server components
   
    return db.prepare("SELECT * FROM meals").all(); 
}