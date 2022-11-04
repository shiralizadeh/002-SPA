import { Octokit } from "@octokit/rest"

/** @type Octokit */
let octokit

// Poor man’s architecture. Ideally, we’d create the GitHub client in the App component
// and pass it down to the components that need it.
// This will ensure that it’s impossible to use the client before it’s initialized.
// For now, due to a lack of time, we’ll check that with runtime errors.
export function setGithubToken(token) {
  octokit = new Octokit({
    auth: token,
  })
}

export function fetchUser() {
  ensureGithubClientInitialized()

  return octokit.users.getAuthenticated()
}

export function fetchOrganizations() {
  ensureGithubClientInitialized()

  return octokit.orgs.listForAuthenticatedUser()
}

export function fetchRepositories(params) {
  ensureGithubClientInitialized()

  return octokit.repos.listForAuthenticatedUser(params)
}

export function fetchStarredRepositories(params) {
  ensureGithubClientInitialized()

  return octokit.activity.listReposStarredByAuthenticatedUser(params)
}

function ensureGithubClientInitialized() {
  if (!octokit) {
    throw new Error("Please call setGithubToken() before using any API methods")
  }
}
