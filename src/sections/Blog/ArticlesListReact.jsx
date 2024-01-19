import React, { useEffect, useState } from 'react';
import {BlogCard} from '../../components/Cards/BlogCard.jsx';

import items from '../../data/blog.json';

export const ArticlesListReact = () => {
  const [data, setData] = useState(items);
  const [selectedTags, setSelectedTags] = useState(['Show All']);

  const itemsPerPage = window.innerWidth >= 768 ? 12 : 6;
  const totalItems = data.length;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredItems = selectedTags.includes('Show All') ? data : data.filter(item => item.tags.some(tag => selectedTags.includes(tag)));
  const visibleItems = filteredItems.slice(startIndex, endIndex);

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pageNumbers.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pageNumbers.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pageNumbers;
  };

  const handleTagClick = (tag) => {
    const updatedTags = tag === 'Show All' ? ['Show All'] : [tag];
    setSelectedTags(updatedTags);
  };


  return (
    <section className="mb-[155px]">

        {/* Filter block */}
        <div className="filter bg-white mb-6 | sm:bg-opacity-0">
          <div className="container xl:max-w-[1296px]">
          {/* Filter Wrap */}
            <div className="wrap flex flex-col py-4 | sm:bg-white sm:flex-row sm:justify-between sm:items-center sm:px-6 sm:py-5 sm:rounded-2xl">
              <div className="-tracking-[0.6px] text-xl font-bold mb-4 | sm:mb-0">Filter by:</div>

              <div className="child:mr-[6px] child:cursor-pointer overflow-x-auto last:mr-0 flex items-center | md:child:mr-3">
                {['Show All', 'Strategy', 'Marketing', 'Tools'].map(tag => (
                  <div
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`leading-135 font-bold min-w-max -tracking-[0.48px] p-3 border rounded-lg border-gray-100 ${
                      selectedTags.includes(tag) ? 'active-filter' : ''
                    }`}
                  >
                    {tag}
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>


      <div className="container xl:max-w-[1296px]">

        <div key={currentPage} className="content flex flex-wrap justify-center child:mb-4 mb-9 | sm:justify-between xl:child:mb-6">
          {visibleItems.map((item, i) => (
            <BlogCard key={i} image={item.image} title={item.title} date={item.date} readTime={item.readTime} tags={item.tags} link="/blog/article-1" />
          ))}
        </div>

        <div className="pagination flex justify-between items-center">
          <div
            className={`prev cursor-pointer font-semibold w-[44px] h-[44px] rounded-lg bg-white flex justify-center items-center | md:h-[40px] md:w-auto md:px-[14px] ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handlePrevPage}
          >
            <svg
              className="md:mr-2"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M15.8327 9.99996H4.16602M4.16602 9.99996L9.99935 15.8333M4.16602 9.99996L9.99935 4.16663"
                stroke="#64647B"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className='hidden md:flex'>Previous</span>
          </div>

          <div className="child:mr-[6px] last:mr-0 hidden md:flex">
            {generatePageNumbers().map((pageNumber, index) => (
              <span
                key={index}
                className={`cursor-pointer w-[40px] h-[40px] font-semibold text-gray-500 flex flex-col-center rounded-full ${
                  currentPage === pageNumber ? 'text-black bg-white' : ''
                }`}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </span>
            ))}
          </div>
          <div className="flex text-gray-500 font-semibold md:hidden">
                Page {currentPage} of {totalPages}
          </div>

          <div
            className={`next cursor-pointer font-semibold w-[44px] h-[44px] rounded-lg bg-white flex justify-center items-center | md:h-[40px] md:w-auto md:px-[14px] ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleNextPage}
          >
            <span className='hidden md:flex'>Next</span>
            <svg
              className="md:ml-2"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M4.16602 9.99996H15.8327M15.8327 9.99996L9.99935 4.16663M15.8327 9.99996L9.99935 15.8333"
                stroke="#64647B"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
};
