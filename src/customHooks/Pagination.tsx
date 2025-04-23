import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
// import './pagination.scss';
import { Link } from 'react-router-dom';
const Pagination = (props:any) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 3,
    currentPage,
    pageSize,
    className,
    link,
    hasCart
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if(!paginationRange) return null

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange!.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange![paginationRange!.length - 1];
  return (
    <ul
      className={classnames('pagination', { [className]: className })}
    >
       {/* Left navigation arrow */}
      
      <li
        className={classnames('page-item previous', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <Link to={'/'+ link + '/' + (currentPage-1) + '/' + pageSize + '/' + hasCart} className="page-link">
              <i className='previous'></i>
        </Link>
      </li>
      {paginationRange!.map((pageNumber, index) => {
         
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li className="page-item dots" key={"a"+index}>&#8230;</li>;
        }
		
        // Render our Page Pills
        
        return (
          <li
            className={classnames('page-item', {
              active: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
            key={"b"+index}
          >
            <Link to={'/'+ link + '/' + (pageNumber) + '/' + pageSize + '/' + hasCart} className="page-link">
              {pageNumber}
            </Link>
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={classnames('page-item next', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <Link to={'/'+ link + '/' + (currentPage+1) + '/' + pageSize + '/' + hasCart} className="page-link">
          <i className='next'></i>
        </Link>
      </li>
    </ul>
  );
};

export default Pagination;