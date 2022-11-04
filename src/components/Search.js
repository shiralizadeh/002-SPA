import React, { Component } from "react"
import styled from "styled-components"

export class Search extends Component {
  render() {
    return (
      <SearchContainer>
        <SearchBar type="text" placeholder="Search Github" />
      </SearchContainer>
    )
  }
}

const SearchContainer = styled.div``

const SearchBar = styled.input`
  background: rgb(64, 68, 72);
  padding: 6px 8px;
  border-radius: 3px;
  width: 300px;
  border: none;
  margin-left: 15px;
  font-size: 16px;
  color: #fff;
  font-size: 12px;

  &:focus {
    outline: none;
  }
`

export default Search
