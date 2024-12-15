import Image from "next/image";
import classes from "./page.module.css";
import { meal } from "@/lib/dbmeals";

import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const mealSlug = params.mealSlug;
  let mealss = await meal(mealSlug);

  if (!mealss) {
    return notFound();
  }

  return {
    title: mealss.title,
    description: mealss.summary,
  };
}

export default async function Meals({ params }) {
  const mealSlug = params.mealSlug;
  let mealss = {};
  await meal(mealSlug).then((data) => (mealss = data));

  if (!mealss) {
    return notFound();
  }
  mealss.instructions = mealss.instructions.replace(/(?:\r\n|\r|\n)/g, "<br>");
  return (
    <>
      {mealss && (
        <div className={classes.container} key={mealss.id}>
          <main className={classes.details}>
            <div className={classes.imageWithDetails}>
              <div className={classes.frame}>
                <Image
                  src={mealss.image}
                  alt={mealss.summary}
                  fill
                  className={classes.image}
                />
              </div>
              <div className={classes.detailedDesc}>
                <h1>{mealss.title}</h1>
                <p className={classes.creator}>
                  by{" "}
                  <span>
                    <a href={`mailto:${mealss.email}`}>{mealss.creator}</a>
                  </span>
                </p>
                <p>{mealss.summary}</p>
              </div>
            </div>
            <div className={classes.procedureContainer}>
              <div className={classes.procedure}>
                <p dangerouslySetInnerHTML={{ __html: mealss.instructions }} />

                {/* <FormatProcedure instructions={mealss.instructions} /> */}
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
