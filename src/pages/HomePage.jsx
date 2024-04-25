import css from "../App.module.css"

export default function HomePage() {
  return (
    <div className={css.containerHome}>
      <h1>This is your home page!</h1>
      <p>The page is empty, you haven&apos;t published anything yet!</p>
      <p>
        Check out your <b>contacts page</b> to create a new contact!
      </p>
    </div>
  )
}
