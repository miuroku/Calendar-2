import moment, { Moment } from 'moment';
import React, { CSSProperties, useEffect } from 'react';
import styled from 'styled-components';
import { DaysService } from '../../Services/DaysService';

export default function CalendarGrid({
    startDay,
    today,
    events,
}: {
    startDay: moment.Moment;
    today: moment.Moment;
    events: Array<any>;
}) {
    const daysService = new DaysService();

    const daysOnPage = daysService.getMonthPageDays(startDay);

    useEffect(() => {
        daysOnPage.map((day) => {
            events.filter(
                (event) =>{
                    console.log(`Res is = ${event.date >= day.format('X') &&
                    event.date <= day.clone().endOf('day').format('X')}`);
                    return event.date >= day.format('X') &&
                    event.date <= day.clone().endOf('day').format('X')
                }
            );
        });
    }, []);

    return (
        <>
            {/* Day aliases*/}
            <GridWrapper isHeader>
                {[...Array(7)].map((_, i) => (
                    <CellWrapper isHeader isSelectedMonth>
                        <RowInCell justifyContent={'flex-end'} pr={1}>
                            {daysService.getDayAliasByDayNumber(i + 1)}
                        </RowInCell>
                    </CellWrapper>
                ))}
            </GridWrapper>

            {/* Grid days*/}
            <GridWrapper>
                {daysOnPage.map((day, i, arr) => (
                    <CellWrapper
                        key={day.unix()}
                        isWeekend={daysService.isWeekend(day)}
                        isSelectedMonth={daysService.isSelectedMonth(
                            day,
                            today,
                        )}
                    >
                        <RowInCell justifyContent={'flex-end'}>
                            <ShowDayWrapper>
                                <DayWrapper>
                                    {daysService.isCurrentDay(day) ? (
                                        <CurrentDay>
                                            <div>{day.format('D')}</div>
                                        </CurrentDay>
                                    ) : (
                                        <div>{day.format('D')}</div>
                                    )}
                                </DayWrapper>
                            </ShowDayWrapper>
                            <EventListWrapper>
                                {/* <div>S : {day.format('X')}</div> */}
                                {events
                                    .filter(
                                        (event) =>
                                            event.date >= day.format('X') &&
                                            event.date <=
                                                day
                                                    .clone()
                                                    .endOf('day')
                                                    .format('X')
                                    )
                                    .map((event) => (
                                        <li key={event.id}>{event.date}</li>
                                    ))}
                                {/* <div>
                                    E : {day.clone().endOf('day').format('X')}
                                </div> */}
                            </EventListWrapper>
                        </RowInCell>
                    </CellWrapper>
                ))}
            </GridWrapper>
        </>
    );
}

// Styles ------------

// const rowInCell: CSSProperties = {
//     display: 'flex'
// };

// Question: why could i define styles below the function that use them ?

const EventItemWrapper = styled('button')`
	position: relative;
	left: -14px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	width: 114px;
	border: unset;
	background: unset;
	color: #DDDDDD;
	cursor: pointer;
	margin: 0;
	padding: 0;
	text-align: left;
`;


const EventListWrapper = styled('ul')`
	margin: unset;
	list-style-position: inside;
	padding-left: 4px;
`;


const ShowDayWrapper = styled('div')`
    display: flex;
    justify-content: flex-end;
`;

const RowInCell = styled.div<{ justifyContent?: string; pr?: number }>`
    display: flex;
    flex-direction: column;
    justify-content: ${(props) =>
        props.justifyContent ? props.justifyContent : 'flex-start'};
    ${(props) => props.pr && `padding-right: ${props.pr * 8}px`}
`;

const CellWrapper = styled.div<{
    isWeekend?: boolean;
    isHeader?: boolean;
    isSelectedMonth?: boolean;
}>`
    // padding: '12px',
    // margin: '12px',
    min-height: ${(props) => (props.isHeader ? 24 : 80)}px;
    min-width: 140px;
    text-align: center;
    background-color: ${(props) =>
        props.isWeekend ? 'rgb(66, 147, 179)' : '#0b5b76'};
    text-align: center;
    color: ${(props) => (props.isSelectedMonth ? '#dadada' : 'black')};
`;

const DayWrapper = styled.div`
    height: 31px;
    width: 31px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2px;
    cursor: pointer;
`;

const GridWrapper = styled.div<{ isHeader?: boolean }>`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 1px;
    ${(props) => !props.isHeader && `min-height: ${`${75 * 7 + 5}px`};`}
    /* min-height: ${`${75 * 7 + 5}px`}; */
    background-color: ${(props) => (props.isHeader ? '#1E1F21' : '#4D4C4D')};
    ${(props) => props.isHeader && `border-bottom: 1px solid #4D4C4D`}
`;

const CurrentDay = styled('div')`
    height: 100%;
    width: 100%;
    background: #f00;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
