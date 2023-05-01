import React, { useContext, useEffect, useRef, useState } from 'react'
import holidaysContext from '../Context/Holidays/HolidaysContext'

import HolidayitemP from './HolidaysItems';
import Addholiday from './AddHolidays';
import { useNavigate } from 'react-router-dom'


const Holidayslist = (props) => {
   

        console.log(props.showAlert)
       //props.showAlert("Holoi" , "denger");
        const context = useContext(holidaysContext);
        const { holidays,setHolidays ,addschoolholiday,getholidays,updatechoolholiday} = context;
        const navigate = useNavigate();
   
        useEffect(() => {

               
          //  props.showAlert("Holoi" , "denger");
               console.log(localStorage.getItem('token'));
            if(localStorage.getItem('token'))
            {
            //    navigate("/Login");
               getholidays()
            }else
            {
                navigate("/Login");
            }
            // eslint-disable-next-line
        }, [])
        const ref = useRef(null)
        const refClose = useRef(null)
        const [holiday, setHoliday] = useState({id: "", eAnnouncement: "", eHolidayDescription: "", eEndDate: new Date(),eStartDate:new Date() });
    
        const updateHolidays = (currentHolidays) => {
            ref.current.click();
          console.log('HHHH');

          console.log(currentHolidays);
          setHoliday({id: currentHolidays._id, eAnnouncement: currentHolidays.Announcement,eHolidayDescription: currentHolidays.HolidayDescription,eStartDate:currentHolidays.StartDate, eEndDate: currentHolidays.eEndDate});
        }
    
        const handleClick = (e)=>{ 

            console.log(holiday);
            updatechoolholiday(holiday.eAnnouncement, holiday.eHolidayDescription, holiday.eStartDate,holiday.eEndDate, holiday.id );
            refClose.current.click();
        }
    
        const onChange = (e)=>{
              setHoliday({...holiday, [e.target.name]: e.target.value})
        }
    return (
        <>
            <Addholiday />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal  
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                            <div className="mb-3">
                    <label htmlFor="Announcement" className="form-label">Announcement  </label>
                    <input type="text" className="form-control" id="Announcement" name="eAnnouncement" aria-describedby="emailHelp" value={holiday.eAnnouncement} onChange={onChange} minLength={5} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="HolidayDescription" className="form-label">Description</label>
                    <input type="text" className="form-control" id="HolidayDescription" name="eHolidayDescription" value={holiday.eHolidayDescription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="StartDate" className="form-label">StartDate</label>
                    <input type="date" className="form-control" id="tag" name="eStartDate" value={holiday.eStartDate} onChange={onChange}  required />
                </div>
                <div className="mb-3">
                    <label htmlFor="eEndDate" className="form-label">EndDate</label>
                    <input type="date" className="form-control" id="EndDate" name="eEndDate" value={holiday.eEndDate} onChange={onChange} required />
                </div>
 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button  onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>You holidays   </h2>
                <div className="container mx-2"> 
                {holidays.length===0 && 'No holidays to display'}
                </div>
                {holidays.map((note) => {
                      return <HolidayitemP Key={note._id }  updateHolidays={updateHolidays} holidays={note}  />
                    })}
            </div>
        </>
    )
}

export default Holidayslist
