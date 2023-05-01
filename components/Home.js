import React, {useContext, useEffect}  from 'react'
import holidaysContext from '../Context/Holidays/HolidaysContext'

const Home = (props) => { 

    const a=  useContext(holidaysContext);
    useEffect(()=>
    {

      
       // a.update();
    },[])
    return (
        <div>
             
             <h1>Home Component 
             </h1>
            <div className="cart-wrapper">
                <div className="img-wrapper item">
                    <img src="https://www.fdfproject.com/wp-content/uploads/2018/12/iphone-png.png" />
                </div>
                <div className="btn-wrapper item">
                    <button 
                    onClick={
                        ()=>{props.subToCartHandler({pice:1000,name:'i phone 11'})}
                        }>
                        Subtract To Cart</button>
                </div>
            
                <div className="text-wrapper item">
                    <span>
                        I-Phone
                    </span>
                    <span>
                        Price: $1000.00
                    </span>
                </div>
                <div className="btn-wrapper item">
                    <button 
                    onClick={
                        ()=>{props.addToCartHandler({pice:1000,name:'i phone 11'})}
                        }>
                        Add To Cart</button>
                </div>
            
        </div>

        </div>
    )
}

export default Home