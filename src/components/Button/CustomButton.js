import React from "react";
import styled from "styled-components";

const CustomButton = ({ label, onClick }) => {
    return (
        <Main onClick={onClick} className="custom-button">
            <button>{label}</button>
        </Main>
    );
};

export default CustomButton;

const Main = styled.div`
    display: inline-block;
    text-align: center;
    width: 100%;

    button{
        color: #fff;
        background-color: #007bff;
        border-color: #007bff;
        display: inline-block;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        user-select: none;
        border: 1px solid transparent;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        line-height: 1.5;
        border-radius: 0.25rem;
        cursor: pointer;
    &:hover {
        background-color: #0056b3;
        border-color: #004085;
    }
`