import styled from "styled-components"

const Button = styled.button`
    background-color: ${({ disabled }) => disabled ? "transparent" : "purple"};
    color: ${({ disabled }) => disabled ? "#444" : "white"};
    border: ${({ disabled }) => disabled ? "1px solid purple" : "none"};
    border-radius: 15px;
    outline: none;
    margin: 7px;
    text-align: center;
    padding: 8px;
`

export default Button
