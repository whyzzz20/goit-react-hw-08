import {Navigate, Route, Routes} from "react-router-dom"
import {Suspense, lazy, useEffect} from "react"
import {selectIsError, selectIsLoading} from "./selectors/selectors"
import {useDispatch, useSelector} from "react-redux"
import {refreshUser} from "./redux/auth/operations"
import {selectIsRefreshing} from "./redux/auth/selectors"

import PrivateRoute from "./components/PrivateRoute/PrivateRoute"
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute"

const WelcomePage = lazy(() => import("./pages/WelcomePage"))
const HomePage = lazy(() => import("./pages/HomePage"))
const LoginPage = lazy(() => import("./pages/LoginPage"))
const RegistrationPage = lazy(() => import("./pages/RegistrationPage"))
const ContactsPage = lazy(() => import("./pages/ContactsPage"))
const Loader = lazy(() => import("./components/Loader/Loader"))
const Layout = lazy(() => import("./components/Layout/Layout"))

function App() {
  const dispatch = useDispatch()
  const isRefreshing = useSelector(selectIsRefreshing)
  const isLoading = useSelector(selectIsLoading)
  const isError = useSelector(selectIsError)

  useEffect(() => {
    dispatch(refreshUser())
  }, [dispatch])

  return isRefreshing ? (
    <b>Refreshing user ...</b>
  ) : (
    <Suspense fallback={isLoading && !isError && <Loader />}>
      <Layout>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute>
                <LoginPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute>
                <RegistrationPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute>
                <ContactsPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Suspense>
  )
}

export default App
