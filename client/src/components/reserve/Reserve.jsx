import { useContext, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import './reserve.css'
import { SearchContext } from '../../context/Searchontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Reserve = ({setOpen,hotelId}) => {
  const {data,loading,error}= useFetch( `http://localhost:8800/api/hotels/room/${hotelId}`)
  const [selectedRooms,setSelectedRooms]= useState([])
  const {dates} = useContext(SearchContext)



  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };
  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable =(roomNumber)=>{
    const isFound = roomNumber.unavailableDates.some((date)=>
      alldates.includes(new Date(date).getTime())
    )
    return !isFound
  }


  const handleSelect=(e)=>{
    const checked= e.target.checked
    const value = e.target.value

    setSelectedRooms(checked ? [...selectedRooms ,value]
      : selectedRooms.filter((item)=> item !== value))

  }
  const navigate =useNavigate()
  const handleClick= async()=>{
    try {
      await Promise.all(
        selectedRooms.map((roomId)=>{
          const res = axios.put(`http://localhost:8800/api/rooms/availability/${roomId}`,{
            dates:alldates,
          })
          return res.data
        })
      )
      setOpen(false)
      navigate("/")
    } catch (err) {
      
    }
  }
  console.log(selectedRooms)

  return (
    <div className="reserve">
      <div className="rContainer">
        <button className='text-red-600 font-bold  bg-red-200 rounded-full px-2 mx-1' onClick={()=>setOpen(false)}>X</button>
         
        
        <span>Select your rooms:</span>
        {data.map((item)=>(

       
          <div className="rItem" >
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">${item.price}</div>
            </div>
            <div className="rSelectRooms">
             {item.roomNumbers.map((roomNumber)=>(
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                     value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
          ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button> 
      </div>
    </div>
  );
}

export default Reserve