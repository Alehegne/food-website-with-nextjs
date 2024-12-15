"use server";
import prisma from "./db";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

export default async function meals() {
  const allmeals = await prisma.recipe.findMany();
  return allmeals;
}

meals()
  .then(async () => await prisma.$disconnect)
  .catch(async (e) => {
    await prisma.$disconnect;
  });

export async function meal(slugs) {
  const meal = await prisma.recipe.findUnique({
    where: {
      slug: slugs,
    },
  });
  return meal;
}

/**
 *
 * @param {Data} data-the form data containing meal informations
 * @returns {Promise <Object | Error} resolves to an object containg server response or ejects an error
 */
export async function saveMeal(data) {
  if (!data) {
    throw new Error("Data is required");
  }

  //slugify the title
  (data.slug = slugify(
    `${data.title} ${Date.now()} ${Math.round(Math.random() * 1e9)}`,
    { lower: true }
  )),
    //sanitize the data
    (data.instructions = xss(data.instructions));
  const imagefile = data.image;

  //buffered data
  const bufferedImage = await imagefile.arrayBuffer();

  //extractig the file extension
  const extension = imagefile.name.split(".").pop();
  //image path
  const imagepath = `public/images/${data.slug}.${extension}`;
  //create a write stream
  const writeStream = fs.createWriteStream(imagepath);
  writeStream.write(Buffer.from(bufferedImage), (err) => {
    if (err) {
      throw new Error("error saving image");
    }
  });
  writeStream.end();

  data.image = `/images/${data.slug}.${extension}`;

  const meal = await prisma.recipe.create({
    data: {
      title: data.title,
      slug: data.slug,
      image: data.image,
      summary: data.summary,
      instructions: data.instructions,
      creator: data.creator,
      creator_email: data.creator_email,
    },
  });
}

// name: formData.get("name"),

// title: formData.get("title"),
// summary: formData.get("summary"),
// instructions: formData.get("instructions"),
// image: formData.get("image"),
// creator: formData.get("email"),
// creator_email: formData.get("name"),
