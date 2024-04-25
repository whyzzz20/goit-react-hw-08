import {useSelector} from "react-redux"
import {selectIsLoggedIn} from "../../redux/auth/selectors"
import UserMenu from "../UserMenu/UserMenu"
import AuthNav from "../AuthNav/AuthNav"
import Navigation from "../Navigation/Navigation"

export default function AppBar() {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  return (
    <header>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  )
}
