import React, { useEffect, useState } from "react"
import styled from "styled-components/macro"
import useSWR from "swr"
import { fetchOrganizations } from "../clients/github"
import ErrorComponent from "./ErrorComponent"
import LoadingIndicator from "./LoadingIndicator"
import ProgressiveImage from "./ProgressiveImage"

const Profile = ({ avatarUrl, userFullName, username, company, location, bio }) => {
  const { data: organizations, error } = useSWR("organizations", fetchOrganizations)

  const isLoading = !organizations && !error
  if (isLoading) return <LoadingIndicator />
  if (error) return <ErrorComponent error={error} />

  const organizationList =
    organizations && organizations.data && organizations.data.length > 0
      ? organizations.data.map((org) => {
          return <Avatar key={org.id} src={org.avatar_url} />
        })
      : []

  return (
    <>
      {avatarUrl === "" ? <Placeholder /> : <ProfilePic src={avatarUrl} />}
      <NameSection>
        <UsersFullName>{userFullName}</UsersFullName>
        <UsersName>{username}</UsersName>
      </NameSection>

      <BioContainer>{bio ? bio : ""}</BioContainer>

      <ProfileDivider />

      <LocationSection>
        {company && (
          <div>
            <Icon className="fa fa-user" aria-hidden="true" />
            <Organisation>{company}</Organisation>
          </div>
        )}
        {location && (
          <div>
            <Icon className="fa fa-map-marker" aria-hidden="true" />
            <Location>{location}</Location>
          </div>
        )}
      </LocationSection>

      {organizationList.length > 0 && (
        <div>
          <ProfileDivider />
          <Organization>Organizations</Organization>
          {organizationList}
        </div>
      )}
    </>
  )
}

const NameSection = styled.div`
  padding: 16px 0;
`

const LocationSection = styled.div`
  padding: 16px 0;
`

const ProfileDivider = styled.div`
  height: 1px;
  margin: 8px 1px;
  background-color: #e1e4e8;
`

const Organization = styled.p`
  margin: 0;
  font-weight: 600;
  font-size: 16px;
`

const Avatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 3px;
  margin-top: 2px;
`

const UsersFullName = styled.p`
  font-weight: 600;
  font-size: 26px;
  line-height: 30px;
  margin: 0;
`

const UsersName = styled.p`
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: 24px;
  color: #666;
  margin: 0;
`

const ProfilePic = styled(ProgressiveImage)`
  border-radius: 6px;
  height: 230px;
  width: 230px;
`

const Placeholder = styled.div`
  border-radius: 6px;
  height: 230px;
  width: 230px;
  background: #fff;
`

const Organisation = styled.p`
  font-weight: 600;
  font-size: 14px;
  margin: 0;
`

const Location = styled.p`
  font-size: 14px;
  margin: 0;
`

const Icon = styled.i`
  float: left;
  margin-right: 6px;
  margin-top: 3px;
`

const BioContainer = styled.div`
  margin-bottom: 12px;
  max-width: 230px;
  font-size: 14px;
  color: #6a737d;
`
export default Profile
