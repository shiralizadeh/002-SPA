import React from "react"
import styled from "styled-components/macro"
import useSWR from "swr"
import { fetchUser } from "../clients/github"
import LoadingIndicator from "./LoadingIndicator"
import ErrorComponent from "./ErrorComponent"

const UserAvatar = () => {
  const { data: user, error } = useSWR("user", fetchUser)

  const isLoading = !user && !error
  if (isLoading) return <LoadingIndicator />
  if (error) return <ErrorComponent error={error} />

  return <ProfilePic src={user.data.avatar_url} />
}

const ProfilePic = styled.img`
  border-radius: 3px;
  height: 20px;
  width: 20px;
  cursor: pointer;
  margin-right: 4px;
  margin-top: 8px;
`

export default UserAvatar
