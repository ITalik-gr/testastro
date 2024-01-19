import React, { useState } from 'react'
import { CityItem } from '../components/Dashboard/CityItem'
import { KeywordsItem } from '../components/Dashboard/KeywordsItem'
import { CompetitorItem } from '../components/Dashboard/CompetitorItem'
import { CityinStateItem } from '../components/Dashboard/CityinStateItem'

// dashboard data
import keywordsData from '../data/Keywords.json'
import competitorsData from '../data/competitor.json'


export const Dashboard = () => {
  // dashboard data
  const locationData = {
    "California": {
      state: true,
      cities: [
        "Los Angeles (City)",
        "San Diego",
        "San Francisco",
        "Anagaim"
      ]
    },
    "Washington (City)": {
      state: false,
    },
    "New York (State)": {
      state: true,
      cities: [
        "New York",
        "Yonkers",
        "Albany",
      ]
    },
    "Los Angeles": {
      state: false,
    },
    "Baida": {
      state: false,
    },
    "Chicago": {
      state: false,
    },
    "Houston": {
      state: false,
    },
    "Austin": {
      state: false,
    },
    "Columbus": {
      state: false,
    },
    "Denver": {
      state: false,
    },
  }
  const infoData = {
    "US": {
      traffic: "324K",
      value: "126K",
    },
    "California": {
      traffic: "118K",
      value: "32K",
    },
    "Los Angeles": {
      traffic: "222K",
      value: "43K",
    },
    "New York (State)": {
      traffic: "19K",
      value: "3K",
    },
    "Los Angeles (City)": {
      traffic: "89K",
      value: "11K",
    },
    "Yonkers": {
      traffic: "275K",
      value: "47K",
    },
  }

  const [currentLocation, setCurrentLocation] = useState({
    location: "US",
    state: "US",
    isState: false
  });

  const [filteredData, setFilteredData] = useState(locationData)
  const [activeKeyword, setActiveKeyword] = useState();
  const [mobileSearch, setMobileSearch] = useState();
  const [mobileInStateSearch, setMobileInStateSearch] = useState();
  const [filteredCityinState, setfFlteredCityinState] = useState()

  const filterData = (e) => {
    const term = e.target.value.toLowerCase();
    setMobileSearch(term)

    // Filter locationData based on the search term
    const filteredLocations = Object.keys(locationData).filter((location) =>
      location.toLowerCase().includes(term)
    );

    // Create filtered data based on the filtered locations
    const filteredData = {};
    filteredLocations.forEach((location) => {
      filteredData[location] = locationData[location];
    });

    setFilteredData(filteredData);
  };

  const filterCityinStateData = (e) => {
    const term = e.target.value.toLowerCase();
    
    setMobileInStateSearch(term)

    // Filter locationData based on the search term
    const filteredLocations = locationData[currentLocation.state].cities.filter((location) =>
      location.toLowerCase().includes(term)
    );

    // Create filtered data based on the filtered locations
    const filteredData = [];
    filteredLocations.forEach((location) => {
      filteredData.push(location)
    });
    console.log(filteredData)
    setfFlteredCityinState(filteredData);
  };

  const handleItemClick = (location, isActive) => {
    setActiveKeyword("")
    setMobileSearch("")
    setMobileInStateSearch("")
    // If clicking on the current location, set it to the state if available, otherwise set it to "US"
    if (isActive && location === currentLocation.location) {

      setCurrentLocation((prevLocation) => ({
        ...prevLocation,
        location: prevLocation.state == location ? "US" : prevLocation.state,
      }));
      if (location === currentLocation.state  ) {
        setCurrentLocation({
          location:  "US",
          state: "US",
          isState: false,
        });
        return;
      }
      return;
    }
    // If the selected location is a state, update the state
    if (locationData[location]) {
      setCurrentLocation({
        location: location,
        state: location,
        isState: true,
      });
    } else if (currentLocation.state && locationData[currentLocation.state]?.cities.includes(location)) {
      // If a state is already selected and the location is a city within that state, update the location
      setCurrentLocation((prevLocation) => ({
        ...prevLocation,
        location: location,
      }));
    } else {
      // If the selected location is neither a state nor a city, reset to default ("US")
      setCurrentLocation({
        location: "US",
        state: "",
        isState: false,
      });
    }
  };

  const toggleKeyword = (id) => {
    setActiveKeyword(id)
  }


  return (
    <section class="pb-7 lg:pb-[90px] lg:bg-gray-50 relative">
      <div class="container lg:max-w-[1296px]">

        <div class="bg-white rounded-2xl border-gray-100 h-full relative z-30 | lg:overflow-hidden lg:max-h-[658px] lg:border lg:-mt-[90px]">
        {/* Nav */}
          <div class="py-6 border-[#E5E5F9] text-black -tracking-[0.24px] text-xl font-bold leading-135 | lg:text-2xl lg:border-b lg:px-5">
            Dentist Niche breakdown in US <span className='lg:hidden'>{currentLocation.location != "US" ? `,${currentLocation.location}` : ""}</span>
          </div>

        {/* Body */}

          <div className="flex flex-col | lg:flex-row lg:items-start">

            {/* Sidebar | Search */}
            {/* descktop */}
            <div class="border-b hidden border-[#E5E5F9] h-full max-h-[576px] w-full overflow-y-auto | lg:border-b-0 lg:max-w-[267px] lg:pt-[17px] lg:block xl:px-5 lg:border-r lg:px-2">
              {/* search input */}
              <label htmlFor="search-state" className='dashboard-search relative block h-full mb-5'>
                <svg className='absolute ml-3 top-1/2 -translate-y-1/2' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M17.5 17.5L12.5001 12.5M14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333Z" stroke="#64647B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <input 
                  onInput={(e) => filterData(e)} 
                  placeholder='Search city or state' 
                  className='placeholder:text-gray-500 outline-none w-full font-medium text-black -tracking-[0.16px] p-3 pl-[38px] rounded-xl border border-gray-100 | lg:max-w-[227px]' type="search" name="search-state" id="search-state" />
              </label>

              {/* selected city or state */}
              {currentLocation.location !== "US" && (
                <label
                  class="cursor-pointer p-3 bg-white w-full rounded-lg border border-gray-100  mb-3 flex justify-between items-center  
                          checked:border-primary-500 | lg:max-w-[227px]"
                          onClick={() => handleItemClick(currentLocation.location, currentLocation.location !== "US")}>

                  <input type="radio" name="radio_group" class="hidden" />

                  <div className="flex items-center w-full">
                    <div className="border h-4 w-full max-w-[16px] border-primary-500 bg-primary-500 rounded-full mr-2 cursor-pointer flex justify-center
                        items-center">
                        <svg class="max-w-[13px]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M13.3327 4L5.99935 11.3333L2.66602 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div className="text-primary-500 font-bold leading-135 -tracking-[0.16px]">
                      {currentLocation.state ? currentLocation.state : currentLocation.location}
                    </div>
                  </div>
                  
                  <div className="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M12 4L4 12M4 4L12 12" stroke="#64647B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </label>
              )}  

              {/* list of cities if the state is selected */}
              {currentLocation.isState && locationData[currentLocation.state]?.cities && (
                <div className="relative hidden border border-gray-100 rounded-lg px-3 h-full max-h-[220px] overflow-y-auto mb-3 | lg:block">
                  <div className="uppercase text-xs text-gray-500 font-bold pt-3 pb-4 bg-white sticky top-0">
                    Cities in {currentLocation.state}
                  </div>

                  {/* list */}
                  <div className="">
                    {locationData[currentLocation.state]?.cities.map((city, i) => (
                      <CityinStateItem
                        isActive={currentLocation.location === city || currentLocation.state == city}
                        key={i} 
                        city={city}  // Pass the city string
                        onClick={() => handleItemClick(city, currentLocation.location === city || currentLocation.state == city)}
                      />
                    ))}
                  </div>
                </div>
              )}
  

              {/* Results */}
              <div className="hidden | lg:block">
                 {Object.keys(filteredData).map((location, i) => (
                    <CityItem
                      isActive={currentLocation.location === location || currentLocation.state == location}
                      key={i} 
                      value={location}  // Pass the location string instead of the object
                      onClick={() => handleItemClick(location)}
                      i={i}
                    />
                  ))}
              </div>
            </div>
            {/* mobile */}
            <div class="relative border-b border-[#E5E5F9] h-full w-full | lg:hidden">
              {/* search input state */}
              {currentLocation.location == "US" && currentLocation.state == "US" &&
                <label htmlFor="search-state" className='relative block h-full mb-5'>
                  <svg className='absolute ml-3 top-1/2 -translate-y-1/2' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M17.5 17.5L12.5001 12.5M14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333Z" stroke="#64647B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

                  <input 
                    onInput={(e) => filterData(e)} 
                    placeholder='Search city or state' 
                    className='placeholder:text-gray-500 outline-none w-full font-medium text-black -tracking-[0.16px] p-3 pl-[38px] rounded-xl border border-gray-100 focus:border-primary-500' type="search" name="search-state" id="search-state" />
                </label>
              } 

              {/* selected city or state */}
              {currentLocation.location !== "US" && (
                <label
                  class="cursor-pointer p-3 bg-white w-full rounded-lg border border-gray-100  mb-3 flex justify-between items-center  
                          checked:border-primary-500 | lg:max-w-[227px]"
                          onClick={() => handleItemClick(currentLocation.location, currentLocation.location !== "US")}>

                  <input type="radio" name="radio_group" class="hidden" />

                  <div className="flex items-center w-full">
                    <div className="border h-4 w-full max-w-[16px] border-primary-500 bg-primary-500 rounded-full mr-2 cursor-pointer flex justify-center
                        items-center">
                        <svg class="max-w-[13px]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M13.3327 4L5.99935 11.3333L2.66602 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div className="text-primary-500 font-bold leading-135 -tracking-[0.16px]">
                      {currentLocation.state ? currentLocation.state : currentLocation.location}
                    </div>
                  </div>
                  
                  <div className="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M12 4L4 12M4 4L12 12" stroke="#64647B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </label>
              )}  

              {/* searc in state */}
              {currentLocation.isState && filteredData[currentLocation.location] && filteredData[currentLocation.location].state && 
                <label htmlFor="search-state" className='relative block h-full mb-5'>
                  <svg className='absolute ml-3 top-1/2 -translate-y-1/2' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M17.5 17.5L12.5001 12.5M14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333Z" stroke="#64647B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

                  <input 
                    onInput={(e) => filterCityinStateData(e)} 
                    placeholder={`Search city in ${currentLocation.state}` }
                    className='placeholder:text-gray-500 outline-none w-full font-medium text-black -tracking-[0.16px] p-3 pl-[38px] rounded-xl border border-gray-100 focus:border-primary-500' type="search" name="search-state" id="search-state" />
                </label>
              } 
              {!filteredData[currentLocation.location] && currentLocation.location !== "US" &&
                <label
                  class="cursor-pointer p-3 bg-white w-full rounded-lg border border-gray-100  mb-3 flex justify-between items-center  
                          checked:border-primary-500 | lg:max-w-[227px]"
                          onClick={() => handleItemClick(currentLocation.location, currentLocation.location !== "US")}>

                  <input type="radio" name="radio_group" class="hidden" />

                  <div className="flex items-center w-full">
                    <div className="border h-4 w-full max-w-[16px] border-primary-500 bg-primary-500 rounded-full mr-2 cursor-pointer flex justify-center
                        items-center">
                        <svg class="max-w-[13px]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M13.3327 4L5.99935 11.3333L2.66602 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div className="text-primary-500 font-bold leading-135 -tracking-[0.16px]">
                      {currentLocation.location}
                    </div>
                  </div>
                  
                  <div className="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M12 4L4 12M4 4L12 12" stroke="#64647B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </label>
               }
              {/* list of cities if the state is selected */}
              {currentLocation.isState && locationData[currentLocation.state]?.cities && mobileInStateSearch?.length > 0 && filteredData[currentLocation.location] && (
                <div className="relative border border-gray-100 rounded-lg px-3 h-full max-h-[220px] overflow-y-auto mb-3 | lg:block">

                  {/* list */}
                  <div className="">
                    {filteredCityinState && 
                      filteredCityinState?.map((city, i) => (
                        <CityinStateItem
                        isActive={currentLocation.location === city || currentLocation.state == city}
                        key={i} 
                        city={city}  // Pass the city string
                        onClick={() => handleItemClick(city, currentLocation.location === city || currentLocation.state == city)} />
                      ))
                    } 
                  </div>
                </div>
              )}

  
              {/* Results */}
              <div className="absolute bg-white top-14 left-0 w-full last:mb-0 lg:hidden">
                {mobileSearch?.length > 0 && 
                 Object.keys(filteredData).map((location, i) => (
                    <CityItem
                      isActive={currentLocation.location === location || currentLocation.state == location}
                      key={i} 
                      value={location}  // Pass the location string instead of the object
                      onClick={() => handleItemClick(location)}
                      i={i}
                    />
                  ))
                 }
              </div>
            </div>


            {/* Stats */}
            <div class="w-full lg:px-5 py-6">

              {/*  Stats Info (top) */}
              <div className="w-full mb-6">
                  {/* nav */}
                  <div className="mb-4 lg:mb-5 lg:flex lg:justify-between lg:items-center">
                    <div className="font-bold text-xl text-gray-800 mb-2 lg:mb-0">Stats for {currentLocation.location}:</div>
                    <div className="text-sm text-gray-500 -tracking-[0.14px]">Last time updated: 12.12.23</div>
                  </div>
                  {/* cards */}
                  <div className="flex flex-col-center | lg:flex-row lg:justify-between">
                    {/* card */}

                    <div className="flex justify-between w-full items-center px-3 py-4 rounded-lg border border-gray-100 mb-2 | lg:mr-[17px] lg:max-w-[466px] lg:mb-0 lg:px-4 xl:py-6">
                      {/* Text, icon */}
                      <div className="flex items-center text-gray-700 text-sm font-semibold -tracking-[0.14px] leading-135 | md:text-base">
                        <svg className='max-w-[16px] mr-2 lg:mr-3 lg:max-w-none' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path opacity="0.4" d="M21 21H4.6C4.03995 21 3.75992 21 3.54601 20.891C3.35785 20.7951 3.20487 20.6422 3.10899 20.454C3 20.2401 3 19.9601 3 19.4V3" stroke="#8057FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M20 8L16.0811 12.1827C15.9326 12.3412 15.8584 12.4204 15.7688 12.4614C15.6897 12.4976 15.6026 12.5125 15.516 12.5047C15.4179 12.4958 15.3215 12.4458 15.1287 12.3457L11.8713 10.6543C11.6785 10.5542 11.5821 10.5042 11.484 10.4953C11.3974 10.4875 11.3103 10.5024 11.2312 10.5386C11.1416 10.5796 11.0674 10.6588 10.9189 10.8173L7 15" stroke="#8057FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Average Traffic
                      </div>
                      {/* nums */}
                      <div className="font-bold text-black text-xl | md:text-2xl xl:text-[28px]">
                        {infoData[currentLocation.location]?.traffic || "128K"}
                      </div>
                    </div>

                    {/* card */}
                    <div className="flex justify-between w-full items-center px-3 py-4 rounded-lg border border-gray-100      
                                    | lg:max-w-[466px] lg:px-4 xl:py-6">
                      
                      {/* Text, icon */}
                      <div className="flex items-center text-gray-700 text-sm font-semibold -tracking-[0.14px] leading-135 | 
                                      md:text-base">
    
                        <svg className='max-w-[16px] mr-2 lg:mr-3 lg:max-w-none' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path opacity="0.4" d="M10 3L8 9L12 20.5L16 9L14 3" stroke="#8057FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M2.49758 9H21.4976M12.6122 20.2625L21.5708 9.51215C21.7226 9.32995 21.7985 9.23885 21.8275 9.13717C21.8531 9.04751 21.8531 8.95249 21.8275 8.86283C21.7985 8.76114 21.7226 8.67005 21.5708 8.48785L17.2375 3.28785C17.1493 3.18204 17.1052 3.12914 17.0512 3.09111C17.0033 3.05741 16.9498 3.03238 16.8933 3.01717C16.8295 3 16.7606 3 16.6229 3H7.37228C7.23455 3 7.16569 3 7.10187 3.01717C7.04533 3.03238 6.99189 3.05741 6.94401 3.09111C6.88997 3.12914 6.84588 3.18204 6.75771 3.28785L2.42437 8.48785C2.27254 8.67004 2.19663 8.76114 2.16762 8.86283C2.14204 8.95249 2.14204 9.04751 2.16762 9.13716C2.19663 9.23885 2.27254 9.32995 2.42437 9.51215L11.383 20.2625C11.5941 20.5158 11.6996 20.6424 11.8259 20.6886C11.9368 20.7291 12.0584 20.7291 12.1692 20.6886C12.2956 20.6424 12.4011 20.5158 12.6122 20.2625Z" stroke="#8057FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Average Value
                      </div>

                      {/* nums */}
                      <div className="font-bold text-black text-xl | md:text-2xl xl:text-[28px]">
                        {infoData[currentLocation.location]?.value || "19K"}
                      </div>
                    </div>
                  </div>
              </div>

              {/* Keywords & Competitors */}
              <div className=" border-gray-100 rounded-xl lg:flex lg:h-[373px] | lg:border">
                {/* Keywords */}
                <div className=" border-gray-100 lg:border-r lg:w-1/2">
                  {/* Keywords nav */}
                  <div className="mb-4 lg:mb-2 lg:px-3 lg:py-4 lg:border-b lg:border-gray-100">
                    <div className="font-bold text-xl text-gray-800 ">Keywords</div>
                    <p className='text-gray-500 text-sm lg:hidden'>Select keyword to see competitors</p>
                  </div>
                 
                  {/* body */}
                  <div className="h-full max-h-[558px] overflow-x-clip overflow-y-auto relative lg:max-h-[302px]">

                    <div className="hidden px-4 justify-between items-center sticky top-0 bg-white pt-4 pb-3 lg:flex">
                      <div className="text-gray-500 text-xs uppercase font-bold">Keyword</div>
                      <div className="flex items-center">
                        <div className="text-gray-500 text-xs uppercase font-bold mr-9">Traffic</div>
                        <div className="text-gray-500 text-xs uppercase font-bold">CPC</div>
                      </div>  
                    </div>

                    {/* Keywords List */}
                    <div className="">
                      {Object.keys(keywordsData[currentLocation.location] || {}).map((keyword, i) => {
                        const item = keywordsData[currentLocation.location][keyword];
                        return (
                          <KeywordsItem key={item.id} id={item.id} isActive={activeKeyword == item.id} keyword={keyword} traffic={item.traffic} cpc={item.cpc} toggleKeyword={toggleKeyword} />
                        );
                      })}
                    </div>

                  </div>
                </div>

                {/* Competitors */}
                <div className={`lg:w-1/2 max-lg:competitor-wrap ${competitorsData[activeKeyword] ? "max-lg:competitor-wrap-active" : ""}`}>

                  <div className={`bg-white w-full z-40 rounded-lg h-max mt-10 lg:max-h-[555px]  lg:max-w-xl lg:rounded-none lg:mt-0`}>
                    {competitorsData[activeKeyword] ? (
                        <>
                        {/* competitor nav */}
                      <div className="px-4 pt-4 mb-[18px] flex flex-col | lg:flex-row lg:items-center lg:justify-between lg:mb-2 lg:border-b lg:border-gray-100 lg:py-3 lg:px-3">

                        <div className="flex justify-between items-center mb-6 | lg:mb-0">
                          <div className="font-bold flex items-center text-xl text-gray-800 ">
                              Competitor
                              {/* hover info */}
                            <div className="flex ml-1 cursor-pointer group relative">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <g clip-path="url(#clip0_1136_3124)">
                                  <path d="M7.9987 10.6666V7.99998M7.9987 5.33331H8.00536M14.6654 7.99998C14.6654 11.6819 11.6806 14.6666 7.9987 14.6666C4.3168 14.6666 1.33203 11.6819 1.33203 7.99998C1.33203 4.31808 4.3168 1.33331 7.9987 1.33331C11.6806 1.33331 14.6654 4.31808 14.6654 7.99998Z" stroke="#A2A2C1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </g>
                                <defs>
                                  <clipPath id="clip0_1136_3124">
                                    <rect width="16" height="16" fill="white"/>
                                  </clipPath>
                                </defs>
                              </svg>
                              {/* hover */}
                              <div style={{ boxShadow: '0px 6px 24px 0px rgba(0, 0, 0, 0.06)' }} className="hidden w-max rounded-lg absolute -top-[55px] -left-[160px] group-hover:flex items-center text-sm text-gray-800 -tracking-[0.14px] px-3 py-4 leading-none border border-gray-100 bg-white">
                                This page can rank for multiple keywords
                              </div>

                            </div>
                          </div>

                          <div className="cursor-pointer lg:hidden"
                               onClick={() => setActiveKeyword('')}>
                            <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path d="M15 5L5 15M5 5L15 15" stroke="#80809C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </div>
                        </div>

                        {/* active keyword */}
                        <div className=" flex items-center max-h-[36px] lg:border lg:border-gray-100 lg:rounded-md lg:p-[10px] ">
                          <svg className='order-2 ml-[6px] lg:ml-0 lg:mr-[6px] lg:order-1' xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M5.33203 5.83331H5.3387M1.33203 3.96665L1.33203 6.94966C1.33203 7.27578 1.33203 7.43884 1.36887 7.59229C1.40153 7.72834 1.45541 7.8584 1.52851 7.97769C1.61097 8.11225 1.72627 8.22755 1.95687 8.45815L7.06929 13.5706C7.86132 14.3626 8.25734 14.7586 8.714 14.907C9.11568 15.0375 9.54838 15.0375 9.95006 14.907C10.4067 14.7586 10.8027 14.3626 11.5948 13.5706L13.0693 12.0961C13.8613 11.304 14.2573 10.908 14.4057 10.4513C14.5362 10.0497 14.5362 9.61697 14.4057 9.21528C14.2573 8.75862 13.8613 8.3626 13.0693 7.57057L7.95687 2.45815C7.72627 2.22755 7.61097 2.11225 7.47641 2.02979C7.35711 1.95669 7.22705 1.90282 7.09101 1.87015C6.93756 1.83331 6.7745 1.83331 6.44837 1.83331L3.46536 1.83331C2.71863 1.83331 2.34526 1.83331 2.06004 1.97864C1.80916 2.10647 1.60519 2.31044 1.47736 2.56133C1.33203 2.84654 1.33203 3.21991 1.33203 3.96665ZM5.66537 5.83331C5.66537 6.01741 5.51613 6.16665 5.33203 6.16665C5.14794 6.16665 4.9987 6.01741 4.9987 5.83331C4.9987 5.64922 5.14794 5.49998 5.33203 5.49998C5.51613 5.49998 5.66537 5.64922 5.66537 5.83331Z" stroke="#525266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>  
                          
                          <div className="order-1 text-sm -tracking-[0.14px] max-w-[300px] font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis | lg:text-gray-600 lg:order-2 xl:max-w-[220px]">
                            {Object.entries(keywordsData[currentLocation.location] || {}).map(([keyword, item]) => {
                              if (activeKeyword === item.id) {
                                return (keyword);
                              }
                            })}
                          </div>
                        </div>
                      </div>

                          {/* competitor body */}
                          <div className="px-4 overflow-y-auto relative h-full max-h-[448px] lg:max-h-[302px]">

                            <div className="hidden justify-between items-center sticky top-0 bg-white pt-4 pb-3 lg:flex">
                              <div className="text-gray-500 text-xs uppercase font-bold">
                                  Page
                                </div>
                              <div className="flex items-center">
                                <div className="text-gray-500 text-xs uppercase font-bold mr-9">Traffic</div>
                                <div className="text-gray-500 text-xs uppercase font-bold">Value</div>
                              </div>  
                            </div>

                            {/* List */}
                            <div className="">
                              {competitorsData[activeKeyword]?.map((item, i) => {
                                return (
                                  <CompetitorItem key={i} link={item.link} traffic={item.traffic} value={item.value} />
                                )
                              })}
                            </div>

                          </div> 
                        </>
                      ) : (
                        
                        <div className="flex justify-center items-center h-full">
                          <div className="text-gray-500 font-semibold">Select keyword to see competitors</div>
                        </div>
                      )}

                  </div>
                </div>
              </div>  
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
