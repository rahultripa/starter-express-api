import React, { useContext, useEffect, useRef, useState } from 'react'
import holidaysContext from '../Context/Holidays/HolidaysContext'

const HolidaysItems = (props) => {
    const context = useContext(holidaysContext);
    const { deleteholidays } = context;
    //    const updateHolidays = (currentHolidays) => {
    const {holidays,updateHolidays} = props;
    return (
        <div >
       
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{holidays.Announcement}</h5>
                        <i className="far fa-trash-alt mx-2" onClick={()=>(deleteholidays(holidays._id))} ></i>
                        <i className="far fa-edit mx-2" onClick={()=>{updateHolidays(holidays)}}></i>
                               </div>
                    <p className="card-text">{holidays.HolidayDescription}</p>
                    <p className="card-text">{holidays.StartDate}</p>
                    <p className="card-text">{holidays.EndDate}</p>

                </div>
            </div>
        </div>
    )
}

export default HolidaysItems