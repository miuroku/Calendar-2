import React, { useEffect, useState } from 'react';
// import './App.css';
import Header from '../Header/Header';
import Monitor from '../Monitor/Monitor';
import CalendarGrid from '../CalendarGrid/CalendarGrid';
import { DaysService } from '../../Services/DaysService';
import styled from 'styled-components';
import moment from 'moment';

const ShadowWrapper = styled.div`
    border-top: 1px solid #737374;
    border-left: 1px solid #464648;
    border-right: 1px solid #464648;
    border-bottom: 2px solid #464648;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 0 1px #1a1a1a, 0 8px 20px 6px #888;
`;

const FormWrapper = styled(ShadowWrapper)`
    width: 200px;
    //height: 300px;
    background-color: #1e1f21;
    color: #dddddd;
    box-shadow: unset;
`;

const FormPositionWrapper = styled('div')`
    position: absolute;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.35);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const EventTitle = styled('input')`
    padding: 4px 14px;
    font-size: 0.85rem;
    width: 100%;
    border: unset;
    background-color: #1e1f21;
    color: #dddddd;
    outline: unset;
    border-bottom: 1px solid #464648;
`;

const EventBody = styled('input')`
    padding: 4px 14px;
    font-size: 0.85rem;
    width: 100%;
    border: unset;
    background-color: #1e1f21;
    color: #dddddd;
    outline: unset;
    border-bottom: 1px solid #464648;
`;

const ButtonsWrapper = styled('div')`
    padding: 8px 14px;
    display: flex;
    justify-content: flex-end;
`;

const defaultEvent = {
    title: '',
    description: '',
    date: moment().format('X')
};
  

export default function App() {
    const daysService = new DaysService();

    const [events, setEvents] = useState([]);
    const [event, setEvent] = useState(Object.create({}));
    const [isShowForm, setShowForm] = useState(false);
    const [method, setMethod] = useState('');
    //const [today, setToday] = useState(daysService.getCurrentDay());
    const [today, setToday] = useState(moment());

    const startDay = today.clone().startOf('month').startOf('week');

    const startDayQuery = daysService.getStartMonthDay(startDay).format('X');
    const endDayQuery = daysService.getEndMonthDay(today).format('X');

    useEffect(() => {
        fetch(
            `${daysService.url}/events?date_gte=${startDayQuery}&date_lte=${endDayQuery}`,
        )
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
        setToday(daysService.getCurrentDay().clone());
        //setToday(moment());
    };

    const nextHandler = () => {
        setToday((prev) => prev.clone().add(1, 'month'));
    };

    const openFormHandler = (methodName: string, eventForUpdate = 'Create') => {
        console.log(`Someone clicked`, methodName);
        setEvent(eventForUpdate || defaultEvent);
        setShowForm(true);
        setMethod(methodName);
    };

    const cancelButtonHandler = () => {
        setShowForm(false);
        setEvent(null);
    };

    const changeEventHandler = (text, field) => {
        setEvent((prevState) => ({
            ...prevState,
            [field]: text,
        }));
    };

    return (
        <>
            {isShowForm ? (
                <FormPositionWrapper onClick={cancelButtonHandler}>
                    <FormWrapper onClick={(e) => e.stopPropagation()}>
                        <EventTitle value={event.title} onChange={(e) => changeEventHandler(e.target.value, 'title')}/>
                        <EventBody value={event.description} onChange={(e) => changeEventHandler(e.target.value, 'description')}/>
                        <ButtonsWrapper>
                            <button onClick={cancelButtonHandler}>
                                Cancel
                            </button>
                            <button>{method}</button>
                        </ButtonsWrapper>
                    </FormWrapper>
                </FormPositionWrapper>
            ) : null}
            <ShadowWrapper>
                <Header />
                <Monitor
                    today={today}
                    prevHandler={prevHandler}
                    todayHandler={todayHandler}
                    nextHandler={nextHandler}
                />
                <CalendarGrid
                    startDay={today}
                    today={today}
                    events={events}
                    openFormHandler={openFormHandler}
                />
            </ShadowWrapper>
        </>
    );
}
