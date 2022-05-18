import moment from 'moment';
import React from 'react';
import styled from 'styled-components';

export default function Monitor({ today }: { today: moment.Moment }) {
    return (
        <DivWrapper>
            <div>
                <TitleWrapper>{ today.format('MMMM') }</TitleWrapper>
                <TextWrapper>{ today.format('YYYY') }</TextWrapper>
            </div>
            <ButtonsWrapper>
                <ButtonWrapper>&lt;</ButtonWrapper>
                <TodayButton>today</TodayButton>
                <ButtonWrapper>&gt;</ButtonWrapper>
            </ButtonsWrapper>
        </DivWrapper>
    );
}

const DivWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #1e1f21;
    color: #dcdddd;
    padding: 16px;
`;

const TextWrapper = styled.span`
    font-size: 32px;
`;

const TitleWrapper = styled(TextWrapper)`
    font-weight: bold;
    margin-right: 5px;
`;

const ButtonWrapper = styled.button`
    border: unset;
    background-color: #565759;
    height: 20px;
    margin-right: 2px;
    border-radius: 4px;
    color: #e6e6e6;
    outline: unset;
    cursor: pointer;
`;

const TodayButton = styled(ButtonWrapper)`
    padding-right: 16px;
    padding-left: 16px;
    font-weight: bold;
`;

const ButtonsWrapper = styled('div')`
    display: flex;
    align-items: center;
`;
