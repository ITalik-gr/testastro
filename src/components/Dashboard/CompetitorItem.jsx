
export const CompetitorItem = ({link, traffic, value}) => {
  return (
    <div className='py-4 mb-4 border-b border-[#E5E5F9] cursor-pointer lg:border-none lg:flex lg:justify-between lg:items-center lg:mb-0 lg:py-3 lg:pr-1'>
      {/* name, toggle */}
      <div className="flex items-center mb-4 | lg:mb-0">
        <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path opacity="0.4" d="M5.66797 10.3333L10.3346 5.6666" stroke="#64647B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8.4691 12.2427L7.52629 13.1855C6.22455 14.4872 4.114 14.4872 2.81225 13.1855C1.5105 11.8838 1.5105 9.7732 2.81225 8.47145L3.75506 7.52864M12.2403 8.47145L13.1831 7.52864C14.4849 6.2269 14.4849 4.11635 13.1831 2.8146C11.8814 1.51285 9.77085 1.51285 8.4691 2.8146L7.52629 3.75741" stroke="#64647B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div className="text-black text-sm font-semibold -tracking-[0.14px] max-w-[200px] overflow-hidden whitespace-nowrap overflow-ellipsis md:text-gray-600 | lg:max-w-[220px] xl:max-w-[260px]">
          {link}
        </div>
      </div>

      {/* Traffic, cpc */}
      <div className="lg:flex lg:items-center">

        <div className="flex items-center justify-between mb-4 | lg:mb-0 lg:mr-[31px]">
          <div className="text-gray-500 font-bold text-xs mr-1 lg:hidden">Traffic</div>
          <div className="text-primary-500 font-bold -tracking-[0.16px]">{traffic}</div>
        </div>
        <div className="flex items-center justify-between ">
          <div className="text-gray-500 font-bold text-xs mr-1 lg:hidden">Value</div>
          <div className="text-gray-800 font-bold -tracking-[0.16px]">${value}</div>
        </div>

      </div>
    </div>
  )
}
