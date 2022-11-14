import { Search, ShoppingCartOutlined } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components/macro'
import { Badge } from '@mui/material'
import { mobile } from '../responsive'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import {logout} from '../redux/userRedux'

const Container = styled.div`
    width: 100%;
    height: 60px;
    ${mobile({ height: "50px" })}
`

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 25px;
  padding: 5px;
`

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`

const Center = styled.div`
  flex: 1;
  text-align: center;
`
const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ justifyContent: "center", flex: 2 })}
`

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`

const StyledLink = styled(Link)`
    color: black;
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const Navbar = () => {
  const quantity = useSelector(state => state.cart.quantity);
  const isUser = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();

  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(logout())
  }


  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder='Search' />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center><Logo><StyledLink to='/'>ANSHOP</StyledLink></Logo></Center>
        <Right>
          {isUser ? null : <StyledLink to='/register'><MenuItem>Register</MenuItem></StyledLink>}
          {isUser ? <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            : <StyledLink to='/login'><MenuItem>Sign In</MenuItem></StyledLink>}
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar