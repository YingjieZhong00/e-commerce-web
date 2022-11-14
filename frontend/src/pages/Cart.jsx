import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components/macro";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import StripeCheckout from 'react-stripe-checkout';
import { useState, useEffect } from "react";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import { removeProduct, clearCart } from "../redux/cartRedux";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div`

`
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: "10px" })}
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`
const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props => props.type === "filled" && "none"};
    background-color: ${props => props.type === "filled" ? "black" : "transparent"};
    color: ${props => props.type === "filled" && "white"};
`

const TopTexts = styled.div`
    ${mobile({ display: "none" })}
`

const TopText = styled.span`
    text-decoration: underline;
    margin: 0px 10px;
`

const Botton = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`

const Info = styled.div`
    flex: 3;
`
const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`
const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 40vh;
`
const SummaryTitle = styled.h1`
    font-weight: 200;
`
const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === "total" && "500"};
    font-size: ${props => props.type === "total" && "24px"};
`
const SummaryItemText = styled.span`

`
const SummaryItemPrice = styled.span`

`
const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
`
const Product = styled.div`
    display: flex;
    justify-content: space-between;
`
const ProductDetail = styled.div`
    display: flex;
    flex: 2;
`
const Image = styled.img`
    width: 200px;
    margin: 30px 0px;
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductName = styled.span`

`
const ProductId = styled.span`

`
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #${props => props.color};
    /* background-color: #013A6B;
    background-image: -webkit-linear-gradient(30deg, #013A6B 50%, #004E95 50%); */
`
const ProductSize = styled.span`

`
const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
`
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 350;
    letter-spacing: 1px;
`
const StyledLink = styled(Link)`
    color: black;
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const RemoveButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
`

const Cart = () => {
    const cart = useSelector(state => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log("logging ", cart.products)

    const onToken = (token) => {
        setStripeToken(token);
    };

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post("/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: 500,
                });
                navigate("/success", { data: res.data });
            } catch (err) {
                //To be added
            }
        }
        if (stripeToken) {
            makeRequest();
        }
    }, [stripeToken, cart.total, navigate]);

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>YOUR CART</Title>
                <Top>
                    <TopButton><StyledLink to='/'>CONTINUE SHOPPING</StyledLink></TopButton>
                    <TopTexts>
                        <TopText>Shopping Cart</TopText>
                        <TopText>Your Wishlist</TopText>
                    </TopTexts>
                    <StripeCheckout
                            name="ANSHOP"
                            image="https://i.postimg.cc/kXHGPc0m/IMG-0155.jpg"
                            billingAddress
                            shippingAddress
                            description={`Your total is $${cart.total}`}
                            amount={cart.total * 100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                            <TopButton type="filled">CHECKOUT NOW</TopButton>
                        </StripeCheckout>
                </Top>
                <Botton>
                    <Info>
                        {cart.products?.map(product => (
                            <Product>
                                <ProductDetail>
                                    <Image src={product.img} />
                                    <Details>
                                        <ProductName><b>Product:</b>{product.title}</ProductName>
                                        <ProductId><b>ID:</b>{product._id}</ProductId>
                                        <ProductColor color={product.color} />
                                        <ProductSize><b>SIZE:</b>{product.size}</ProductSize>
                                        <RemoveButton type="filled" onClick={()=>
                                            dispatch(removeProduct(product._id))
                                        }>REMOVE</RemoveButton>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductAmountContainer>
                                        <Remove />
                                        <ProductAmount>{product.quantity}</ProductAmount>
                                        <Add />
                                    </ProductAmountContainer>
                                    <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                                </PriceDetail>
                            </Product>
                        ))}
                        {cart.products ? <TopButton onClick={()=> dispatch(clearCart())}>EMPTY CART</TopButton> : null}
                        <Hr />

                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>$5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$-5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <StripeCheckout
                            name="ANSHOP"
                            image="https://i.postimg.cc/kXHGPc0m/IMG-0155.jpg"
                            billingAddress
                            shippingAddress
                            description={`Your total is $${cart.total}`}
                            amount={cart.total * 100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                            <Button>CHECKOUT NOW</Button>
                        </StripeCheckout>
                    </Summary>
                </Botton>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart