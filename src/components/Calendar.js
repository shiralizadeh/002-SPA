import { memo } from "react"
import GitHubCalendar from "github-calendar"

const Calendar = ({ login }) => {
  return (
    <div
      key={login}
      ref={(node) => {
        if (!node) return
        new GitHubCalendar(node, login)
      }}
    />
  )
}

// Prevent the component from rerendering (unless the login changes) because it uses a third-party lib
export default memo(Calendar)
