import css from "../App.module.css"

export default function WelcomePage() {
  return (
    <div className={css.containerHome}>
      <h1>Welcome to Phonebook organizer!</h1>
      <p>
        Please <b>log in</b> to see your contacts!
      </p>
      <p>
        Or <b>register</b> if you are new!
      </p>
    </div>
  )
}
