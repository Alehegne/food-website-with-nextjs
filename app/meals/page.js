import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import burgerImg from "@/assets/burger.jpg";
import meals from "@/lib/dbmeals";
import { Suspense } from "react";
import LoadingAnimation from "@/components/meals/loadingAnimation.js";

export const metadata = {
  title: "All Meals",
  description: "Explore all meals shared by the community.",
};

export default async function MealsPage() {
  console.log("fetching meals");
  const mealss = [];
  await meals().then((data) => {
    mealss.push(...data);
  });

  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals ,created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          choose your favorite recipe and cook it yourself.it&apos;s is easy and
          fun
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">share Your favorite Recipe</Link>
        </p>
      </header>

      <Suspense fallback={<LoadingAnimation />}>
        {" "}
        <main className={classes.main}>
          <MealsGrid meals={mealss} />
        </main>
      </Suspense>
    </>
  );
}
