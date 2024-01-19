

export const BlogCard = ({image, title, date, readTime, cdnImage, tags, link}) => {

  return (
  <div className={`p-4 bg-white rounded-xl w-full h-full min-w-[240px] max-w-[405px] max-h-[409px] | sm:max-w-[48.5%] | lg:max-w-[32.5%] | xl:max-w-[405px]`}>
      <img loading="lazy" decoding="async" className="rounded-xl w-full mb-4 max-h-[211px] max-w-[381px] | md:mb-5" src={image} alt={title} />

      {/* <!-- Info block (date, read time) --> */}
      <div className="flex justify-between items-center w-full mb-2 | md:mb-4 | lg:mb-6">
        <div className="text-xs leading-117 text-gray-500 font-semibold -tracking-[0.18px]">{date}</div>
        <div className="text-xs leading-117 text-gray-500 font-semibold -tracking-[0.18px]">{readTime}</div>
      </div>
      {/* <!-- Title --> */}
      <div className="blog-card-title leading-135 text-black -tracking-[0.48px] font-bold mb-6 | md:max-w-[277px] md:text-lg md:mb-8 | lg:text-xl">{title}</div>
      {/* <!-- Link --> */}
      <a href={link} target='_blank' className="text-hover text-primary-500 font-extrabold leading-135 -tracking-[0.16px] ">Read Now</a>
  </div>
  )
}