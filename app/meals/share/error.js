"use client";

export default function ErrorPage({ error, reset }) {
  return (
    <div className="error">
      <h1>Something went wrong!</h1>
      <p>failed to create the meal!</p>
    </div>
  );
}