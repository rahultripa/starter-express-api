import React, {useContext, useState} from 'react'
import holidaysContext from '../Context/Holidays/HolidaysContext'

const Addholidays = () => {
    const context = useContext(holidaysContext);
    const {addschoolholiday} = context;

    const [holidays, setholidays] = useState({Announcement: "", HolidayDescription: "", StartDate: "",EndDate:""})

    const handleClick = (e)=>{
        e.preventDefault();

        addschoolholiday(holidays.Announcement, holidays.HolidayDescription, holidays.StartDate,holidays.EndDate);
       // setholidays({Announcement: "", HolidayDescription: "", StartDate: "",EndDate:""});
    }

    const onChange = (e)=>{
        setholidays(
            
            {...holidays, [e.target.name]: e.target.value
        })
    }
    return (
        <div className="container my-3">
            <h2>Add 2 a holidays</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="Announcement" className="form-label">Announcement</label>
                    <input type="text" className="form-control" id="Announcement" name="Announcement" aria-describedby="emailHelp" value={holidays.Announcement} onChange={onChange} minLength={5} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="HolidayDescription" className="form-label">Description</label>
                    <input type="text" className="form-control" id="HolidayDescription" name="HolidayDescription" value={holidays.HolidayDescription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="StartDate" className="form-label">StartDate</label>
                    <input type="date" className="form-control" id="tag" name="StartDate" value={holidays.StartDate} onChange={onChange}  required />
                </div>
                <div className="mb-3">
                    <label htmlFor="EndDate" className="form-label">EndDate</label>
                    <input type="date" className="form-control" id="tag" name="EndDate" value={holidays.EndDate} onChange={onChange} required />
                </div>
                <button disabled={holidays.Announcement.length<5 || holidays.HolidayDescription.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add holidays</button>
            </form>
        </div>
    )
}

export default Addholidays