import React from 'react';
// import './App.css';
import Header from '../Header/Header';
import Monitor from '../Monitor/Monitor';
import CalendarGrid from '../CalendarGrid/CalendarGrid';
import { DaysService } from '../../Services/DaysService';

function App() {
    
    const daysService = new DaysService();
    const startDay = daysService.getStartMonthDay();    

    return (
        <div>
            <Header/>
            <Monitor/>
            <CalendarGrid startDay={startDay}/>
        </div>
    );
}

export default App;
