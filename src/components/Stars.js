import React, { useMemo, useState } from "react"
import gql from "graphql-tag"
import styled from "styled-components/macro"
import LoadingIndicator from "./LoadingIndicator"
import { fetchStarredRepositories } from "../clients/github"
import useSWR from "swr"
import Repository from "./Repository"

const Stars = () => {
  const { data: starredRepositories, error: repositoriesError } = useSWR("starredRepositories", () =>
    fetchStarredRepositories({ per_page: 100 }),
  )

  const [filterText, setFilterText] = useState("")

  const filteredRepositories = useMemo(
    () =>
      starredRepositories?.data
        .filter((repo) => {
          return filterText ? repo.name.indexOf(filterText) > -1 : true
        })
        .sort((a, b) => b.stargazers_count - a.stargazers_count),
    [starredRepositories?.data, filterText],
  )

  const isLoading = !starredRepositories && !repositoriesError

  if (isLoading) return <LoadingIndicator />
  if (repositoriesError) return <ErrorComponent error={repositoriesError} />

  return (
    <section>
      <SearchContainer>
        <SearchBox
          type="text"
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Search starred repositories..."
        />
      </SearchContainer>
      {filteredRepositories.map((repo) => (
        <Repository key={repo.id} repo={repo} />
      ))}
    </section>
  )
}

const SearchContainer = styled.div`
  border-bottom: 1px solid #d1d5da;
  padding-bottom: 16px;
`

const SearchBox = styled.input`
  min-height: 34px;
  width: 300px;
  font-size: 14px;
  padding: 6px 8px;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid #d1d5da;
  border-radius: 3px;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
`

export default Stars
