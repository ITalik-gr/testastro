

export const KeywordsItem = ({keyword, traffic, cpc, isActive, toggleKeyword, id}) => {
  return (
    <div className={`keyword py-4 px-3 mb-3 flex justify-between items-center cursor-pointer border-gray-100 rounded-lg border
                  ${isActive && "bg-gray-25"} | lg:rounded-none lg:border-none lg:mb-0 lg:px-4 lg:py-3`}
          onClick={() => toggleKeyword(id)}>
      <div className="flex flex-col items-start lg:flex-row lg:justify-between lg:items-center lg:w-full">
        {/* name, toggle */}
        <div className="flex items-center mb-4 | lg:mb-0">

          <div className={`round border-gray-200 border rounded-full flex-col-center hidden w-4 h-4 ${isActive && 'bg-primary-500 checked'} | lg:flex`}>
            {isActive && <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M8.33464 2.5L3.7513 7.08333L1.66797 5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            }
          </div>
            <div className="keyword-text text-black text-sm font-bold -tracking-[0.14px] max-w-[180px] overflow-hidden whitespace-nowrap overflow-ellipsis lg:text-gray-600 | lg:font-semibold lg:ml-2 lg:max-w-[185px] xl:max-w-[260px]">
              {keyword}
            </div>
        </div>

        {/* Traffic, cpc */}
        <div className="lg:flex">

          <div className="text-primary-500 flex items-center font-bold -tracking-[0.16px] mb-3 lg:mb-0 lg:mr-[31px]">
            <div className="text-gray-500 font-bold text-xs mr-1 lg:hidden">Traffic</div>
            {traffic}
          </div>

          <div className="text-gray-800 flex items-center font-bold -tracking-[0.16px]">
            <div className="text-gray-500 font-bold text-xs mr-1 lg:hidden">CPC</div>
            ${cpc}
          </div>

        </div>
      </div>

      <svg className='lg:hidden' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4.16797 10H15.8346M15.8346 10L10.0013 4.16669M15.8346 10L10.0013 15.8334" stroke="#80809C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  )
}
