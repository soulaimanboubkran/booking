import React, { useContext, useState } from 'react'
import Navbar from '../../components/navbar/Navbar.jsx'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';
import './hotel.css';
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../context/Searchontext.jsx';
import { AuthContext } from '../../context/authContext.jsx';

import Reserve from "../../components/reserve/Reserve.jsx";


const Hotel=()=> {
  const {user} =useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate();

  const id = location.pathname.split("/")[2]
  const { data, loading, error} = useFetch(
    `http://localhost:8800/api/hotels/find/${id}`);
    

    const {dates,options}=useContext(SearchContext)
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
      const timeDiff = Math.abs(date2.getTime() - date1.getTime());
      const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
      return diffDays;
    }
   const days=dayDifference(dates[0].endDate, dates[0].startDate);

    const [slideNumber,setSlideNumber]=useState(0)
    const [open,setOpen]=useState(false)
    const [openModal, setOpenModal] = useState(false);

    const handleOpen = (i)=>{
        setSlideNumber(i);
        setOpen(true)
    }  
    const handleMove = (direction) => {
        let newSlideNumber;
    
        if (direction === "l") {
          newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
        } else {
          newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
        }
    
        setSlideNumber(newSlideNumber)
      };
      const handleClick = () => {
        if (user) {
          setOpenModal(true);
        } else {
          navigate("/login");
        }
      };
  return (
    <div>
    <Navbar />
    <Header type="list" /> 
    {loading ?("loading"):(
    <div className="hotelContainer">
        {open &&(
     <div className='slider'>
        <span  className="close" onClick={()=>setOpen(false)}>x</span>
        <span className="arrow"  onClick={() =>handleMove("l")}>left</span>
        <div className="sliderWrapper">
            <img className='sliderImg' src={data.photos[slideNumber]} alt="" />
        </div>
        <span className="arrow" onClick={() => handleMove("r")}>right</span>
     </div>)}
       
      
      <div className="hotelWrapper">
        <button className="bookNow">Reserve or Book Now!</button>
        <h1 className="hotelTitle">{data.name}</h1>
        <div className="hotelAddress">

      

          <span>{data.address}</span>
        </div>
        <span className="hotelDistance">
          Excellent location – {data.distance}m from center 
        </span>
        <span className="hotelPriceHighlight">
          Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
        </span>
        <div className="hotelImages">
         {data.photos?.map((photo,i)=>(
            <div className="hotelImgWrapper" >
              <img
              onClick={()=>handleOpen(i)}
              src={photo}
                alt=""
                className="hotelImg"
              />
            </div>
        ))}
        </div>
        <div className="hotelDetails">
          <div className="hotelDetailsTexts">
            <h1 className="hotelTitle">{data.title}</h1>
            <p className="hotelDesc">
             {data.desc}
            </p>
          </div>
          <div className="hotelDetailsPrice">
            <h1>Perfect for a {days}-night stay!</h1>
            <span>
              Located in the real heart of Krakow, this property has an
              excellent location score of 9.8!
            </span>
            <h2>
              <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
            </h2>
            <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
    </div>
  )
}

export default Hotel