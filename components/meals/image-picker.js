"use client";

import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const [ pickedImage, setPickedImage ] = useState();

  const imageInput = useRef();

  function handlePickClick() {
    imageInput.current.click();
    console.log("is this working?");
  }

  function handleImageChange(event) {
    // the files input field will have such a files property
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }
    // i want to create a data url wich can be used as a src for an image element.
    // i acchieve it with a class built in Javascript. filereader

    const fileReader = new FileReader();

    // we store a function inside the onload property of the filereader and it gets activated as soon as the method bellow is finished executing

    fileReader.onload = () => {
      // and this function doesnt return anything, I can access the url by saving the value of the filereader.result
      setPickedImage(fileReader.result);
      console.log("reaching")
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
         
            {pickedImage ? <Image src={pickedImage} alt="The image selected by user" fill/> : <p>No image picked yet.</p>}
        </div>
       
        <input
          ref={imageInput}
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          onChange={handleImageChange}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an image
        </button>
      </div>
    </div>
  );
}
