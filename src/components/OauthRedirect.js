import { useEffect } from "react"

// Poor man’s OAuth redirect
const OauthRedirect = () => {
  useEffect(() => {
    const url = new URL(window.location.href)
    const redirectTo = url.searchParams.get("redirectTo")
    const code = url.searchParams.get("code")

    window.location.href = redirectTo + "?code=" + code
  })

  return null
}

export default OauthRedirect
