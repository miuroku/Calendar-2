import moment, { Moment } from 'moment';
import React, { CSSProperties } from 'react';
import styled from 'styled-components';
import { DaysService } from '../../Services/DaysService';

export default function CalendarGrid({ startDay }: {startDay: moment.Moment}) {
    
    const daysService = new DaysService();

    const day = startDay.clone();
    //const daysOnPage = [...Array(maxAmountOfDaysOnPage)];
    const daysOnPage = daysService.getMonthPageDays();    

    return (
        <div style={gridCalendarStyle}>
            {daysOnPage.map((day, i, arr) => (
                <div key={i} style={itemDayStyle}>
                    <RowInCell>
                        <div style={dayWrapper}>{day.format('D')}</div>
                    </RowInCell>
                </div>
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
    justify-content: ${(props) => props.justifyContent ? props.justifyContent : 'flex-start'};
`;

const dayWrapper: CSSProperties = {
    display: 'flex',
    height: '33px',
    width: '33px',
    alignItems: 'center', // align-items — controls alignment of all items on the cross axis. (horizontal line)
    justifyContent: 'center', // justify-content - controls alignment of all items on the main axis. (vertical line)
};

const gridCalendarStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gridTemplateRows: 'repeat(6, 1fr)',
    columnGap: '1px',
    rowGap: '1px',
};

// Cell style.
const itemDayStyle: CSSProperties = {
    // padding: '12px',
    // margin: '12px',
    backgroundColor: 'skyblue',
    textAlign: 'center',
    minWidth: '120px',
    minHeight: '75px',
};
