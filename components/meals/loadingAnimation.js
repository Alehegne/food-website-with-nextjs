import classes from "./loadingAnimation.module.css";
export default function LoadingAnimation() {
  return (
    <div className={classes.loading}>
      <span>
        <h1>Loading Meals</h1>
      </span>
      <span className={classes.loadingbox}>
        <span className={classes.firstDot}></span>
        <span className={classes.secondDot}></span>
        <span className={classes.thirdDot}></span>
      </span>
    </div>
  );
}
