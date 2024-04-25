import {useDispatch} from "react-redux"
import RegistrationForm from "../components/RegistrationForm/RegistrationForm"
import {userRegister} from "../redux/auth/operations"

export default function RegistrationPage() {
  const dispatch = useDispatch()

  const onRegister = (formData) => {
    dispatch(userRegister(formData))
  }

  return (
    <div>
      <RegistrationForm onRegister={onRegister} />
    </div>
  )
}
