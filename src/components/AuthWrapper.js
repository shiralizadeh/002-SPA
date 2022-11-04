import { useEffect, useState } from "react"
import { Loading } from "gitstar-components"
import { setGithubToken } from "../clients/github"
import LoginScreen from "./LoginScreen"
import AppContainer from "./AppContainer"

const STATUS = {
  INITIAL: "initial",
  LOADING: "loading",
  FINISHED_LOADING: "finished_loading",
  AUTHENTICATED: "authenticated",
}

const GATEKEEPER_URI = process.env.REACT_APP_GATEKEEPER_URI

const AuthWrapper = () => {
  const [status, setStatus] = useState(STATUS.INITIAL)

  // Poor man’s auth handling
  useEffect(() => {
    const storedToken = localStorage.getItem("github_token")

    if (storedToken) {
      setGithubToken(storedToken)
      setStatus(STATUS.AUTHENTICATED)
      return
    }

    const code = new URL(window.location.href).searchParams.get("code")

    if (code) {
      setStatus(STATUS.LOADING)

      fetch(`${GATEKEEPER_URI}${code}`)
        .then((response) => response.json())
        .then(({ token, error }) => {
          if (error) throw new Error(error)

          localStorage.setItem("github_token", token)
          setGithubToken(token)
          setStatus(STATUS.FINISHED_LOADING)
        })
    }
  }, [])

  return (
    <section>
      {status === STATUS.AUTHENTICATED && <AppContainer />}

      <header>{status === STATUS.INITIAL && <LoginScreen />}</header>
      <Loading
        status={status}
        callback={() => {
          if (status !== STATUS.AUTHENTICATED) {
            setStatus(STATUS.AUTHENTICATED)
          }
        }}
      />
    </section>
  )
}

export default AuthWrapper
