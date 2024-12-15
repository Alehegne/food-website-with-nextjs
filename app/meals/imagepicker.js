// Purpose: This file is used to create a component that allows the user to pick an image from their device.
"use client";
import { useEffect, useRef, useState } from "react";
import classes from "./imagepicker.module.css";
import Image from "next/image";

export default function ImagePicker({ name, label }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const inputref = useRef(null);

  //when the button is clicked, the input element will be clicked
  function handleClick() {
    inputref.current.click();
  }

  //when the input element changes, this function will be called
  function handleChange(event) {
    const file = event.target.files[0];

    //if there is no file selected, return
    if (!file) {
      return;
    }

    //allowed file types
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setError("Please select an image file (png, jpeg, gif)");
      setImageUrl(null);
      return;
    }

    //file size should be less than 1MB
    if (file.size > 1024 * 1024) {
      setError("File size should be less than 1MB");
      setImageUrl(null);
      return;
    }

    //create a new file reader
    const reader = new FileReader();

    //when the file is read, the reader.onload function will be called
    reader.onload = () => {
      setImageUrl(reader.result);
      setError(null);
    };
    //if there is an error in reading the file, the reader.onerror function will be called
    reader.onerror = () => {
      setError("Error reading the file");
      setImageUrl(null);
      console.error("Error reading the file");
    };

    //read the file as a data URL
    reader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label className={classes.label} htmlFor={name}>
        {label}
      </label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!imageUrl && !error && <p>no image picked!</p>}
          {imageUrl && <Image src={imageUrl} alt="preview" fill />}
          {error && <p>{error}</p>}
        </div>

        <input
          className={classes.input}
          type="file"
          id={name}
          name={name}
          ref={inputref}
          required
          onChange={handleChange}
        />
        <button className={classes.button} type="button" onClick={handleClick}>
          Pick An Image
        </button>
      </div>
    </div>
  );
}
// useEffect(() => {
//   //when ever there is a change in the input element, the eventHandler function will be called
//   function eventHandler() {
//     if (inputref.current) {
//       const file = inputref.current.files[0];
//       if (file) {
//         setImage(file.name);
//       }
//     }
//   }
//   //inputElement is the input element
//   const inputElement = inputref.current;
//   if (inputElement) {
//     inputElement.addEventListener("change", eventHandler);
//   }

//   return () => {
//     //clean up function in the start, and when the component unmounts
//     if (inputElement) {
//       console.log("removing event listener");
//       inputElement.removeEventListener("change", eventHandler);
//     }
//   };
// }, []);
