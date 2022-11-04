import React from "react"
import styled from "styled-components/macro"
import LoadingIndicator from "./LoadingIndicator"
import useSWR from "swr"
import { fetchRepositories, fetchUser } from "../clients/github"
import Calendar from "./Calendar"

const Overview = () => {
  const { data: user, error: userError } = useSWR("user", fetchUser)
  const { data: repositories, error: repositoriesError } = useSWR("repositories", () =>
    fetchRepositories({
      per_page: 100,
    }),
  )

  if ((!user && !userError) || (!repositories && !repositoriesError)) return <LoadingIndicator />
  if (userError || repositoriesError) return <ErrorComponent error={userError || repositoriesError} />

  const repos = repositories.data
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6)
    .map((repo) => {
      return (
        <RepoCard key={repo.name}>
          <RepoLink href={repo.html_url}>{repo.name}</RepoLink>
          <RepoDescription>{repo.description}</RepoDescription>
          <RepoInfoContainer>
            <Circle />
            <RepoDetails>
              {repo.language} <Icon className="fa fa-star" aria-hidden="true" /> {repo.stargazers_count}{" "}
              <Icon className="fa fa-code-fork" aria-hidden="true" /> {repo.forks_count}
            </RepoDetails>
          </RepoInfoContainer>
        </RepoCard>
      )
    })

  return (
    <div>
      {repos.length > 1 && <OverviewTitle>Popular Repositories</OverviewTitle>}
      <RepoContainer>{repos}</RepoContainer>

      <CalendarContainer>
        <Calendar login={user.data.login} />
      </CalendarContainer>
    </div>
  )
}

const RepoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const RepoCard = styled.div`
  border: 1px #d1d5da solid;
  padding: 16px;
  width: 362px;
  margin-bottom: 16px;
`

const RepoDescription = styled.p`
  font-size: 12px;
  color: #586069;
  margin: 4px 0 10px 0;
`

const RepoInfoContainer = styled.div`
  display: flex;
`

const Circle = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background: #f1e05a;
  margin-right: 5px;
  top: 2px;
  position: relative;
`

const OverviewTitle = styled.p`
  color: #24292e;
  font-size: 16px;
  margin-bottom: 8px;
`

const RepoLink = styled.a`
  font-weight: 600;
  font-size: 14px;
  color: #0366d6;
  cursor: pointer;
`

const RepoDetails = styled.p`
  color: #586069;
  font-size: 12px;
  margin: 0;
`

const Icon = styled.i`
  margin-left: 16px;
`

const CalendarContainer = styled.div`
  position: relative;
`

export default Overview
