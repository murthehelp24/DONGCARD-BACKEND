
const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const maxPageButtons = 5
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2))
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1)

  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1)
  }
  
  const visiblePages = Array.from(
    { length: Math.max(0, endPage - startPage + 1) }, 
    (_, i) => startPage + i
  )

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum)
    window.scrollTo(0, 0)
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center mt-10 mb-6">
      <div className="join border border-gray-700">
        <button
          className={`join-item btn btn-sm ${currentPage === 1 ? 'btn-disabled' : ''}`}
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
        >
          «
        </button>

        {visiblePages.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`join-item btn btn-sm ${currentPage === pageNum ? 'btn-primary' : ''}`}
          >
            {pageNum}
          </button>
        ))}

        <button
          className={`join-item btn btn-sm ${currentPage === totalPages ? 'btn-disabled' : ''}`}
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
        >
          »
        </button>
      </div>
    </div>
  )
}

export default Pagination