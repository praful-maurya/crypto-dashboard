import React from 'react'
import Styled from 'styled-components'
import { LABEL } from '../Constant/constant';
import { COLORS } from '../Constant/colors';

const NotFound = ({error}) => {
    return (
        <Main>
            <h2>{LABEL.ERROR}: {error}</h2>
            <p>Due to too many attempts api fails often.</p>
        </Main>
    )
};

export default NotFound;

const Main = Styled.div`
    display: inline-block;
    text-align: center;
    width: 100%;

    h2{
    font-size: 25px;
    color: ${COLORS.danger};
    font-weight: 600;
    }
`;
