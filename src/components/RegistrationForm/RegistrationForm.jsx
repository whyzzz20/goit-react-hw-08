import css from "./RegistrationForm.module.css"
import {ErrorMessage, Field, Form, Formik} from "formik"
import {useDispatch} from "react-redux"
import * as Yup from "yup"
import {userRegister} from "../../redux/auth/operations"
import toast, {Toaster} from "react-hot-toast"
// import {useDispatch} from "react-redux"

export default function RegistrationForm() {
  const dispatch = useDispatch()
  const InitialData = {
    name: "",
    email: "",
    password: "",
  }
  const hundleSubmit = (userInfo, formActions) => {
    dispatch(userRegister(userInfo))
      .then(() => {
        toast.success("Registration sucssess")
      })
      .catch(() => {
        toast.error("Sorry, Registration error.")
      })
    formActions.resetForm()
  }

  const formValidSchema = Yup.object().shape({
    name: Yup.string()
      .required("User name is required!")
      .min(2, "User name must be at least 2 characters!")
      .max(50, "User name must be less than 50 characters!"),
    email: Yup.string().required("Email is required!").email("Must be a valid email!"),
    password: Yup.string()
      .required("Password is required!")
      .min(8, "Password must be at least 8 characters!"),
  })

  return (
    <>
      <Formik
        initialValues={InitialData}
        onSubmit={hundleSubmit}
        validationSchema={formValidSchema}
      >
        <Form className={css.form}>
          <h1>Registration</h1>
          <label className={css.lable}>
            Name
            <span className={css.text}></span>
            <Field
              className={css.input}
              id="name"
              type="text"
              name="name"
              placeholder="User name"
            />
            <ErrorMessage className={css.errorMess} name="name" component="span" />
          </label>

          <label className={css.lable}>
            Email
            <span className={css.text}></span>
            <Field
              className={css.input}
              id="email"
              type="text"
              name="email"
              placeholder="enter your email"
            />
            <ErrorMessage className={css.errorMess} name="email" component="span" />
          </label>
          <label className={css.lable}>
            Password
            <span className={css.text}></span>
            <Field
              className={css.input}
              id="password"
              type="password"
              name="password"
              placeholder="enter you password"
            />
            <ErrorMessage className={css.errorMess} name="password" component="span" />
          </label>
          <button
            className={css.btnSubmit}
            type="submit"
            aria-label="Register"
            title="click to Register"
          >
            Sign up
          </button>
        </Form>
      </Formik>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}
