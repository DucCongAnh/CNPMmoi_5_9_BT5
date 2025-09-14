import React from 'react';
import './Pagination.css';

const Pagination = ({ 
    currentPage, 
    totalPages, 
    onPageChange, 
    showFirstLast = false,
    maxVisiblePages = 3 
}) => {
    // Tính toán các trang hiển thị
    const getVisiblePages = () => {
        const pages = [];
        const halfVisible = Math.floor(maxVisiblePages / 2);
        
        let startPage = Math.max(1, currentPage - halfVisible);
        let endPage = Math.min(totalPages, currentPage + halfVisible);
        
        // Điều chỉnh nếu gần đầu hoặc cuối
        if (endPage - startPage + 1 < maxVisiblePages) {
            if (startPage === 1) {
                endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
            } else {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        
        return pages;
    };

    const visiblePages = getVisiblePages();
    const showEllipsisStart = visiblePages[0] > 2;
    const showEllipsisEnd = visiblePages[visiblePages.length - 1] < totalPages - 1;

    if (totalPages <= 1) return null;

    return (
        <div className="pagination-container">
            <div className="pagination">
                {/* Nút First */}
                {showFirstLast && currentPage > 1 && (
                    <button
                        className="pagination-btn first"
                        onClick={() => onPageChange(1)}
                        title="Trang đầu"
                    >
                        ««
                    </button>
                )}

                {/* Nút Previous */}
                <button
                    className={`pagination-btn prev ${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    title="Trang trước"
                >
                    ← Trước
                </button>

                {/* Trang đầu với ellipsis */}
                {showEllipsisStart && (
                    <>
                        <button
                            className="pagination-btn"
                            onClick={() => onPageChange(1)}
                        >
                            1
                        </button>
                        {visiblePages[0] > 2 && (
                            <span className="pagination-ellipsis">...</span>
                        )}
                    </>
                )}

                {/* Các trang hiển thị */}
                {visiblePages.map(page => (
                    <button
                        key={page}
                        className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}

                {/* Trang cuối với ellipsis */}
                {showEllipsisEnd && (
                    <>
                        {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                            <span className="pagination-ellipsis">...</span>
                        )}
                        <button
                            className="pagination-btn"
                            onClick={() => onPageChange(totalPages)}
                        >
                            {totalPages}
                        </button>
                    </>
                )}

                {/* Nút Next */}
                <button
                    className={`pagination-btn next ${currentPage === totalPages ? 'disabled' : ''}`}
                    onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    title="Trang sau"
                >
                    Sau →
                </button>

                {/* Nút Last */}
                {showFirstLast && currentPage < totalPages && (
                    <button
                        className="pagination-btn last"
                        onClick={() => onPageChange(totalPages)}
                        title="Trang cuối"
                    >
                        »»
                    </button>
                )}
            </div>

            {/* Thông tin phân trang */}
            <div className="pagination-info">
                <span>
                    Trang {currentPage} / {totalPages}
                </span>
            </div>
        </div>
    );
};

export default Pagination;
