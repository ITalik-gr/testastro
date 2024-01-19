

export const CityinStateItem = ({city, isActive, onClick}) => {
  return (
    <div className={`mb-[10px] flex items-center justify-between cursor-pointer ${isActive ? "checked" : ""}`}
      onClick={onClick}>
      <div className="text-gray-700 font-medium leading-135 -tracking-[0.16px] flex items-center w-full">
        
        <div class="checkbox flex justify-center items-center h-4 w-full max-w-[16px] rounded-full border border-gray-100 mr-2 cursor-pointer">
          <svg class="checkbox-image hidden" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13.3327 4L5.99935 11.3333L2.66602 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        {city}
      </div>

      {/* close */}
      {isActive && 
        <div className="cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="#64647B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      }
      
    </div>
  )
}
