const ErrorComponent = ({ error }) => {
  return <div>Failed to load: {error.stack ?? error.message ?? error}</div>
}

export default ErrorComponent
