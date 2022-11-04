import React, { useMemo, useState } from "react"
import styled from "styled-components/macro"
import LoadingIndicator from "./LoadingIndicator"
import useSWR from "swr"
import { fetchRepositories } from "../clients/github"
import Repository from "./Repository"

const Repo = () => {
  const { data: repositories, error: repositoriesError } = useSWR("repositories", () =>
    fetchRepositories({
      per_page: 100,
      sort: "stargazers_count",
    }),
  )

  const [filterText, setFilterText] = useState("")

  const filteredRepositories = useMemo(
    () =>
      repositories?.data
        .filter((repo) => {
          return filterText ? repo.name.indexOf(filterText) > -1 : true
        })
        .sort((a, b) => b.stargazers_count - a.stargazers_count),
    [repositories?.data, filterText],
  )

  const isLoading = !repositories && !repositoriesError

  if (isLoading) return <LoadingIndicator />
  if (repositoriesError) return <ErrorComponent error={repositoriesError} />

  return (
    <div>
      <SearchContainer>
        <SearchBox type="text" onChange={(e) => setFilterText(e.target.value)} placeholder="Search repositories..." />
      </SearchContainer>
      {filteredRepositories.map((repo) => (
        <Repository key={repo.id} repo={repo}></Repository>
      ))}
    </div>
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

export default Repo
