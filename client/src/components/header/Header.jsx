
  import { useContext, useState } from 'react';
import './header.css'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
  import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import {  useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/Searchontext';


  const Header = ({type}) => {
    const navigate = useNavigate()
  const [destination,setDestination]= useState("")
  const [openDate,setOpenDate]=useState(false)  
  const [openOptions,setOpenOptions]=useState(false)  
  const [options,setOptions]=useState({
    adult:1,
    children:0,
    room:1,
  })
  const handleOption=(name,operation)=>{
    setOptions(prev=>{return{
        ...prev,
        [name]:operation === "i" ?options[name]+1:options[name]-1,
    }})
  }
  const [dates,setDates] = useState([
    {
        startDate:new Date(),
        endDate:new Date(),
        key:"selection",

    },
  ])


  const {dispatch}= useContext(SearchContext)
  const handleSearch=()=>{
    dispatch({type:"NEW_SEARCH",payload:{destination,dates,options}})
    navigate('/hotels',{state:{destination,dates,options}})
  }

  return (
    <>
    
    <div className="header">
        <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
      <div className="headerList">

        <div className="headerListItem active">
                  <span>Stays</span>
        </div> 
        <div className="headerListItem">
         
          <span>Flights</span>
        </div>
        <div className="headerListItem">
                  <span>Car rentals</span>
        </div>
        <div className="headerListItem">
                  <span>Attractions</span>
        </div>
        <div className="headerListItem">
                   <span>Airport taxis</span>
        </div>
</div>

{ type !== "list" &&(
    <>
            <h1 className="headerTitle">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="headerDesc">
              Get rewarded for your travels  unlock instant savings of 10% or
              more with a free Lamabooking account
            </p>
            <button className="headerBtn">Sign in / Register</button>
            <div className="headerSearch">
              <div className="headerSearchItem">
               
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput text-black   "
                  onChange={e=>setDestination(e.target.value)}
                />
              </div>

              <div className="headerSearchItem">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokewidth="1.5" stroke="currentColor" className="w-6 text-black  h-6">
                    <path strokelinecap="round" strokelinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                    </svg>
                    <span onClick={()=>setOpenDate(!openDate)} className='headerSearchText'>{`${format(dates[0].startDate,"MM/dd/yyyy")} to ${format(dates[0].endDate,"MM/dd/yyyy")}`}</span>
                   {openDate &&
                    <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    
                  /> }
              </div>

              <div className="headerSearchItem">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokewidth="1.5" stroke="currentColor" className="w-6 text-black h-6">
                 <path strokelinecap="round" strokelinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg> 
                <span
                onClick={()=>setOpenOptions(!openOptions)}
                  className="headerSearchText">
                
                   {`${options.adult} adult . ${options.children} children . ${options.room} room`}

                </span>
                {openOptions &&
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                        onClick={()=>handleOption("adult","d")}
                          className="optionCounterButton"
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                        {options.adult}
                        </span>
                        <button
                          onClick={()=>handleOption("adult","i")}
                          className="optionCounterButton"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          onClick={()=>handleOption("children","d")}
                          className="optionCounterButton"
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">{options.children}
                        </span>
                        <button
                          onClick={()=>handleOption("children","i")}
                          className="optionCounterButton"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          onClick={()=>handleOption("room","d")}
                          className="optionCounterButton"
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">{options.room}
                        </span>
                        <button
                          onClick={()=>handleOption("room","i")}
                          className="optionCounterButton"
                        >
                          +
                        </button>
                      </div>
                    </div>
                     
              </div>
                }
              </div>
              <div className="headerSearchItem">
                <button onClick={handleSearch} className="headerBtn">
                  Search
                </button>

                </div>
              </div>
              </>)}
    </div>
  </div>
  </>
  )
}

export default Header