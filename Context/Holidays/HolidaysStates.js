import { useState } from "react";
import HolidaysContext from "./HolidaysContext";
const HolidaysState = (props) => {

//   
const holidaysInitial = [];
  const [holidays, setHolidays] = useState(holidaysInitial)
  const addschoolholiday =  async (Announcement,HolidayDescription,StartDate,EndDate )=>
  {

   const  holiday=  {
        "school": "6441221629d572277a6b42fgf86",
        "Announcement":Announcement,
        "HolidayDescription":HolidayDescription,
        "EndDate": StartDate,
        "StartDate":StartDate,
        "__v": 0
      }

      const response = await fetch(`${host}/api/HolidayList/AddHolidays`, {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')  },
        body: JSON.stringify({Announcement,HolidayDescription,StartDate,EndDate })
      });

      const note = await response.json();

      setHolidays(holidays.concat(note))

  }


  const updatechoolholiday =  async (Announcement,HolidayDescription,StartDate,EndDate,Id )=>
  {

       console.log(Id);
      const response = await fetch(`${host}/api/HolidayList/updateHolidays/${Id}`, {
        method: 'Put',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')   },
        body: JSON.stringify({Announcement,HolidayDescription,StartDate,EndDate })
      });

      
     let newNotes = JSON.parse(JSON.stringify(holidays))
     // Logic to edit in client
     for (let index = 0; index < newNotes.length; index++) {
       const element = newNotes[index];
       if (element._id === Id) {
         newNotes[index].Announcement = Announcement;
         newNotes[index].HolidayDescription = HolidayDescription;
         newNotes[index].StartDate = StartDate; 
         newNotes[index].EndDate = EndDate;
         break; 
       }
     }  
    
     setHolidays(newNotes)

  }

  const deleteholidays =async (Id)=>
  {
    const response = await fetch(`${host}/api/HolidayList/deleteHoldays/${Id}`, {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')    },
     //   body: JSON.stringify({Announcement,HolidayDescription,StartDate,EndDate })
      });

      const json = response.json(); 
      const newNotes = holidays.filter((note) => { return note._id !== Id })
      setHolidays(newNotes)
  }
//const holidaysInitial = []

    const host = "http://localhost:5000"
  // const holidaysInitial = []
 // const [state, setHolidays] = useState(holidaysInitial)
  
   // Get all holidays
   const getholidays = async () => {
     // API Call 
      const response = await fetch(`${host}/api/HolidayList/fetchallHolidays`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')    }
      });
   
      const json = await response.json() 
      console.log(json)
      setHolidays(json)
   }
    return (
<HolidaysContext.Provider value={{holidays,setHolidays,addschoolholiday,deleteholidays,getholidays,updatechoolholiday}}>
    {props.children}
</HolidaysContext.Provider>

    )

    
}
export default HolidaysState;