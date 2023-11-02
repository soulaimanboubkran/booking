import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
const NewRoom = () => {
  const [info, setInfo] = useState({})
  const {data,loading,error}= useFetch(`/hotels`)
  const [id,setHotelId]=useState(undefined)
  const [rooms, setRooms] = useState([]);
  const handleChange = (e)=>{
    setInfo((prev)=> ({ ...prev,[e.target.id]: e.target.value}))
  }
  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    try {
      await axios.post(`/rooms/${id}`, { ...info, roomNumbers });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add new room</h1>
        </div>
        <div className="bottom">
          
          <div className="right">
            <form>
              

              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} type={input.type} onChange={handleChange} placeholder={input.placeholder} />
                </div>
              ))}
               <div className="formInput">
                  <label>Rooms</label>
                  <textarea   onChange={(e) => setRooms(e.target.value)} placeholder="give comma between room numbers"></textarea>
                </div>
               <div className="formInput">
                  <label>Chosse a hotel</label>
                  <select  id="hotelId"
                          onChange={e=>setHotelId(e.target.value)}

                  >
                    {loading ?"loading": data && data.map(hotel=>(
                      <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                    ))}
                  </select>
                </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
