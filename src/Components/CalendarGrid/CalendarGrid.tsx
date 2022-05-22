import moment, { Moment } from 'moment';
import React, { CSSProperties } from 'react';
import styled from 'styled-components';
import { DaysService } from '../../Services/DaysService';

export default function CalendarGrid({
    startDay,
}: {
    startDay: moment.Moment;
}) {
    const daysService = new DaysService();

    const daysOnPage = daysService.getMonthPageDays(startDay);

    return (
        <>
            {/* Day aliases*/}
            <GridWrapper isHeader>
                {[...Array(7)].map((_, i) => (
                    <CellWrapper isHeader>
                        <RowInCell justifyContent={'flex-end'} pr={1}>
                            {daysService.getDayAliasByDayNumber(i+1)}
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
                    >
                        <RowInCell justifyContent={'flex-end'}>
                            <DayWrapper>
                                {daysService.isCurrentDay(day) ? (
                                    <CurrentDay>
                                        <div>{day.format('D')}</div>
                                    </CurrentDay>
                                ) : (
                                    <div>{day.format('D')}</div>
                                )}
                            </DayWrapper>
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

const RowInCell = styled.div<{ justifyContent?: string, pr?:number }>`
    display: flex;
    flex-direction: column;
    justify-content: ${(props) =>
        props.justifyContent ? props.justifyContent : 'flex-start'};
    ${props => props.pr && `padding-right: ${props.pr * 8}px`}
`;

const CellWrapper = styled.div<{ isWeekend?: boolean; isHeader?: boolean }>`
    // padding: '12px',
    // margin: '12px',
    min-height: ${(props) => (props.isHeader ? 24 : 80)}px;
    min-width: 140px;
    text-align: center;
    background-color: ${(props) =>
        props.isWeekend ? 'rgb(178, 227, 247)' : 'skyblue'};
    text-align: center;
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
    ${props => !props.isHeader && `min-height: ${`${75 * 7 + 5}px`};`}
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
