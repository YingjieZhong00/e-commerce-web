import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components/macro"
import { login, getCartItems } from "../redux/apiCalls"
import { mobile } from "../responsive"

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),
     url("https://tinyurl.com/876nr9n8");
     background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: #fff;
    ${mobile({width: "75%"})}
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0px;
    padding: 10px;
`

const Button = styled.button`
    width: 30%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    &:disabled{
        color: green;
        cursor: not-allowed;
    }
`

const Error = styled.span`
    color:red;
`

const Link = styled.a`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const {isFetching, error} = useSelector((state)=> state.user)

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, {username, password});
        getCartItems(dispatch)
    }

    return (
        <Container>
            <Wrapper>
                <Title>Sign In</Title>
                <Form>
                    <Input placeholder="username" onChange={(e) => setUsername(e.target.value)}></Input>
                    <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}></Input>
                    <Button onClick={handleClick} disabled={isFetching}>Login</Button>
                    {error && <Error>{error}</Error>}
                    <Link>Don't remember your password?</Link>
                    <Link>Create a new account</Link>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login