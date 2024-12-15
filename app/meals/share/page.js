"use client";
import { submitMeals } from "@/lib/action";
import ImagePicker from "../imagepicker";
import classes from "./page.module.css";
import SubmitMealForm from "@/components/meals/SubmitMealForm";
import { useFormState } from "react-dom";

export default function ShareMealPage() {
  const [state, formAction] = useFormState(submitMeals, { errors: {} });
  console.log("ShareMealPage -> state", state.errors);
  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          {/* <div className={classes.container}>
            <p>
              <label htmlFor="image" className={classes.customFileUpload}>
                Choose Image
              </label>
              <input type="file" id="image" name="image" required />
            </p>
          </div> */}
          {/* the above is the easiest way ,  */}
          <div className={classes.pickerWithError}>
            <ImagePicker name="image" label="Your Image" />
            <div className={classes.errors}>
              {Object.keys(state.errors).map((key) => (
                <p key={key}>{state.errors[key]}</p>
              ))}
            </div>
          </div>

          <p className={classes.actions}>
            <SubmitMealForm />
          </p>
        </form>
      </main>
    </>
  );
}
