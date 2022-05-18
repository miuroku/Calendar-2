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

    const day = startDay.clone();
    //const daysOnPage = [...Array(maxAmountOfDaysOnPage)];
    const daysOnPage = daysService.getMonthPageDays();

    return (
        <div style={gridCalendarStyle}>
            {daysOnPage.map((day, i, arr) => (
                <CellWrapper key={i} isWeekend={daysService.isWeekend(day)}>
                    <RowInCell>
                        <DayWrapper>
                            {
                                daysService.isCurrentDay(day) ?
                                    <CurrentDay><div>{day.format('D')}</div></CurrentDay>
                                    :
                                    <div>{day.format('D')}</div>
                            }
                        </DayWrapper>
                    </RowInCell>
                </CellWrapper>
            ))}
        </div>
    );
}

// Styles ------------

// const rowInCell: CSSProperties = {
//     display: 'flex'
// };

// Question: why could i define styles below the function that use them ?

const RowInCell = styled.div<{ justifyContent?: string }>`
    display: flex;
    justify-content: ${(props) =>
        props.justifyContent ? props.justifyContent : 'flex-end'};
`;

const CellWrapper = styled.div<{ isWeekend?: boolean }>`
    // padding: '12px',
    // margin: '12px',
    min-width: 120px;
    min-height: 75px;
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

const gridCalendarStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gridTemplateRows: 'repeat(6, 1fr)',
    columnGap: '1px',
    rowGap: '1px',
};

const CurrentDay = styled('div')`
    height: 100%;
    width: 100%;
    background: #f00;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
