import React, { Suspense } from "react"
import styled from "styled-components/macro"
import { Route } from "react-router-dom"

import Nav from "./Nav"
import ProfileMenu from "./ProfileMenu"
import useSWR from "swr"
import { fetchUser } from "../clients/github"
import LoadingIndicator from "./LoadingIndicator"
import ErrorComponent from "./ErrorComponent"

const Profile = React.lazy(() => import("./Profile"))
const Overview = React.lazy(() => import("./Overview"))
const Repositories = React.lazy(() => import("./Repositories"))
const Stars = React.lazy(() => import("./Stars"))

const AppContainer = () => {
  const { data: user, error } = useSWR("user", fetchUser)

  const isLoading = !user && !error
  if (isLoading) return <LoadingIndicator />
  if (error) return <ErrorComponent error={error} />

  const avatarUrl = user ? user.data.avatar_url : ""
  const userFullName = user ? user.data.name : ""
  const username = user ? user.data.login : ""
  const location = user ? user.data.location : ""
  const company = user ? user.data.company : ""
  const bio = user ? user.data.bio : ""

  return (
    <section>
      <Nav avatarUrl={avatarUrl} username={username} />
      <ProfileContainer>
        <ProfileWrapper>
          <Suspense fallback={<LoadingIndicator />}>
            <Profile
              avatarUrl={avatarUrl}
              userFullName={userFullName}
              username={username}
              location={location}
              company={company}
              bio={bio}
            />
          </Suspense>
        </ProfileWrapper>

        <MainPane>
          <ProfileMenu />
          <InformationContainer>
            <Suspense fallback={<LoadingIndicator />}>
              <Route exact path={`${process.env.PUBLIC_URL}/`} component={(props) => <Overview {...props} />} />
              <Route
                path={`${process.env.PUBLIC_URL}/repositories`}
                component={(props) => <Repositories {...props} />}
              />
              <Route path={`${process.env.PUBLIC_URL}/stars`} component={(props) => <Stars {...props} />} />
            </Suspense>
          </InformationContainer>
        </MainPane>
      </ProfileContainer>
    </section>
  )
}

const ProfileWrapper = styled.div``

const ProfileContainer = styled.section`
  display: flex;
  max-width: 1000px;
  margin: 0 auto;
  gap: 20px;
`

const InformationContainer = styled.section`
  margin-top: 24px;
`

const MainPane = styled.div`
  flex: 1;
`

export default AppContainer
