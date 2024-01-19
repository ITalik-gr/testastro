import React from 'react'

export const CityItem = ({i, value, isActive, onClick}) => {



  return (
    <label for={`radio_${i}`}
          onClick={onClick}
          class={`input-wrap cursor-pointer p-3 bg-white rounded-lg border border-gray-100 mb-3 flex items-center  
                checked:border-primary-500 | ${isActive ? "hidden" : ""} | lg:max-w-[227px]`}>

      <input type="radio" name="radio_group" class="hidden" id={`radio_${i}`} />
        {/* Radio Circle */}
        <div class="checkbox flex justify-center items-center h-4 w-full max-w-[16px] rounded-full border border-gray-100 mr-2 cursor-pointer">
          <svg class="checkbox-image hidden" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13.3327 4L5.99935 11.3333L2.66602 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <div className="text-black font-medium leading-135 -tracking-[0.16px]">
          {value}
        </div>
        

    </label>
  )
}
