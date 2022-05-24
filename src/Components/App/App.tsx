import React, { useEffect, useState } from 'react';
// import './App.css';
import Header from '../Header/Header';
import Monitor from '../Monitor/Monitor';
import CalendarGrid from '../CalendarGrid/CalendarGrid';
import { DaysService } from '../../Services/DaysService';
import styled from 'styled-components';
import moment from 'moment';

export default function App() {

    const [events, setEvents] = useState([]);

    const daysService = new DaysService();

    const [today, setToday] = useState(daysService.getCurrentDay());

    const startDay = today.clone().startOf('month').startOf('week');

    const startDayQuery = daysService.getStartMonthDay(startDay).format('X');
    const endDayQuery = daysService.getEndMonthDay(startDay).format('X');

    useEffect(() => {
        fetch(`${daysService.url}/events?date_gte=${startDayQuery}&date_lte=${endDayQuery}`)
            .then((res) => res.json())
            .then((res) => {
                setEvents(res);
                console.log(`Result `, res);
                console.log(`Star : ${startDayQuery}`);
                console.log(`End : ${endDayQuery}`);
            });
    }, [today]);    

    const prevHandler = () => {
        setToday((prev) => prev.clone().subtract(1, 'month'));
    };

    const todayHandler = () => {
        setToday(daysService.getCurrentDay());
    };

    const nextHandler = () => {
        setToday((prev) => prev.clone().add(1, 'month'));
    };

    return (
        <ShadowWrapper>
            <Header />
            <Monitor
                today={today}
                prevHandler={prevHandler}
                todayHandler={todayHandler}
                nextHandler={nextHandler}
            />
            <CalendarGrid startDay={today} today={today} events={events}/>
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
