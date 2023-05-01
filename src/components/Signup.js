import React,{useState}  from 'react'

import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const [schoolinfo, setschoolinfo] = useState({SchoolName: "", password: "",Description:"",
    AboutUs:"",
    SortName:"",
    Email:"",
    UserName:"",
    MobileNo:"",
    Address:"",
    City:"",
    State:""

}) 
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(schoolinfo);
        const response = await fetch('http://localhost:5000/api/OxySchool_info/createschool', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({SchoolName: schoolinfo.SchoolName,
                 Password: schoolinfo.password,
                 Description:schoolinfo.Description,
                 AboutUs:schoolinfo.AboutUs,
                 SortName:schoolinfo.SortName,
                 UserName:schoolinfo.UserName,
                 Email:schoolinfo.email,
                 MobileNo:schoolinfo.MobileNo,
                 Address:schoolinfo.Address,
                 City:schoolinfo.City,
                 State:schoolinfo.State
              
            
            
            })
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
              
           // localStorage.setItem('token', json.authtoken); 
            history.push("/");

        }
        else{
            alert("Invalid schoolinfo");
        }
    }

    const onChange = (e)=>{
        setschoolinfo({...schoolinfo, [e.target.name]: e.target.value})
    }

    return (
        <div>
              <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={schoolinfo.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                 <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={schoolinfo.password} onChange={onChange} name="password" id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="cpassword" className="form-control" value={schoolinfo.password} onChange={onChange} name="cpassword" id="cpassword" />
                </div>
                <div className="mb-3">
                    <label htmlFor="SchoolName" className="form-label">SchoolName</label>
                    <input type="text" className="form-control" value={schoolinfo.SchoolName} onChange={onChange} id="SchoolName" name="SchoolName" aria-describedby="SchoolNameHelp" />
                              </div>

                <div className="mb-3">
                    <label htmlFor="Description" className="form-label">Description</label>
                    <input type="text" className="form-control" value={schoolinfo.Description} onChange={onChange} id="Description" name="Description"  />
                   </div>

                <div className="mb-3">
                <label htmlFor="AboutUs" className="form-label">AboutUs</label>
                    <input type="text" className="form-control" value={schoolinfo.AboutUs} onChange={onChange} id="AboutUs" name="AboutUs"  />
                  </div>

                <div className="mb-3">
                <label htmlFor="Description" className="form-label">SortName</label>
                    <input type="text" className="form-control" value={schoolinfo.SortName} onChange={onChange} id="SortName" name="SortName"  />
                     </div>

                <div className="mb-3">
                <label htmlFor="MobileNo" className="form-label">MobileNo</label>
                    <input type="text" className="form-control" value={schoolinfo.MobileNo} onChange={onChange} id="MobileNo" name="MobileNo"  />
                  </div>


                

                
                  <div className="mb-3">
                <label htmlFor="Address" className="form-label">Address</label>
                    <input type="text" className="form-control" value={schoolinfo.Address} onChange={onChange} id="Address" name="Address"  />
                  </div>

                  <div className="mb-3">
                <label htmlFor="City" className="form-label">City</label>
                    <input type="text" className="form-control" value={schoolinfo.City} onChange={onChange} id="City" name="City"  />
                  </div>

                  <div className="mb-3">
                <label htmlFor="State" className="form-label">State</label>
                    <input type="text" className="form-control" value={schoolinfo.State} onChange={onChange} id="State" name="State"  />
                  </div>


                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup