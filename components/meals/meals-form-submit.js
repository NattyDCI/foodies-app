"use client";

import { useFormStatus } from "react-dom";


export default function MealsFormSubmit() {
  // since the user needs information about the status of submission of the form, 
  // we can use useFormStatus for that to enhace the user experience

  const { pending } = useFormStatus();
  
  return (
    <button disabled={pending} >
        {pending ? 'Submitting...' : "Share Meal"}
    </button>
  );
}
