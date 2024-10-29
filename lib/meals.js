import sql from "better-sqlite3";
import fs from "node:fs";
import slugify from 'slugify';
import xss from 'xss';


// we can establish a connection by executing sql as a function and passing the name of the database as a string
const db = sql("meals.db")

// we can work on the db object to perform actions on that database

export async function getMeals() {

    await new Promise((response) => setTimeout(response, 3000));
    // throw new Error("something ocurred")

    // so we use the db object and write a statement that should be executed. 
    // In this case I want to select all columns from the meals table and all is used to fetch the data.
    // if you wanted a single row you should use get instead. we are not working with promises here.. but we can use
    // it inside the component with ease. you can not do that on client components in react but you can do it in server components
   
    return db.prepare("SELECT * FROM meals").all(); 
}

export function getMeal(slug){
    return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
    // you have to add dynamic values into your statements to get protected against sql injections. 
    // and you do that by using the get method. under the hood the sql package you imported will protect you.
    
    // this for example is prone to sql injections(following code)
    // return db.prepare("SELECT * FROM meals WHERE slug =" + slug);
}

// in my database I wanna save a slug for everymeal and I am not getting that from my form, instead i want to generate it from the title
// I am passing meal as an argument since that is the object i am getting from the form



// for that i will install `npm install slugify and xss`

// This last package protects us against crossite scripting  attacks

// in the meal detail page we are using dangerously setInnerHTML 

// in this segment...

// dangerouslySetInnerHTML={{
//     __html: meal.instructions,
//   }}

// and so we are vulnerable for crossite scripting attacks
// therefore we need xss package


export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, {lower: true});
    // this following code removes any harmful content from the instructions, so we sanitize and clean those instructions
    meal.instructions = xss(meal.instructions);
    // and we simply overrite the properties inside the meal object, instead of saving it inside variables or something

    // the image we dont want to save it in the Database, we want to save it in the filesystem inside the public folder. 
    // the images should not be saved in the database only for performance issues

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
        if(error) {
            throw new Error("Saving image failed!")
        }
    })

    meal.image = `/images/${fileName}`

    db.prepare(`
        INSERT INTO meals
            (slug, title, image, summary, instructions, creator, creator_email)
        VALUES (
            @slug, 
            @title, 
            @image, 
            @summary, 
            @instructions, 
            @creator, 
            @creator_email
            )
        `).run(meal);
}
