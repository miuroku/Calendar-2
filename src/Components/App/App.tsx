import React from 'react';
// import './App.css';
import Header from '../Header/Header';
import Monitor from '../Monitor/Monitor';
import CalendarGrid from '../CalendarGrid/CalendarGrid';
import { DaysService } from '../../Services/DaysService';
import styled from 'styled-components';
import moment from 'moment';

export default function App() {
    const daysService = new DaysService();
    const today = moment();
    const startDay = daysService.getStartMonthDay();

    return (
        <ShadowWrapper>
            <Header />
            <Monitor today={today} />
            <CalendarGrid startDay={startDay} />
        </ShadowWrapper>
    );
}

const ShadowWrapper = styled.div`
    border-top: 1px solid #737374;
    border-left: 1px solid #464648;
    border-right: 1px solid #464648;
    border-bottom: 2px solid #464648;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 0 1px #1a1a1a, 0 8px 20px 6px #888;
`;
