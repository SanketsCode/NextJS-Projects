import Link from 'next/link';
import React from 'react'
const PER_PAGE = 3;

export default function Pagination({total,page}) {
    const lastPage = Math.ceil(total/PER_PAGE);
  return (
    <>
         {
        page > 1 && (
          <Link href={`/events?page=${page - 1}`} className="btn-secondary">Prev</Link>
        )
      }
      {
        page < lastPage && (
          <Link href={`/events?page=${page + 1}`} className="btn-secondary">Next</Link>
        )
      }
    </>
  )
}
