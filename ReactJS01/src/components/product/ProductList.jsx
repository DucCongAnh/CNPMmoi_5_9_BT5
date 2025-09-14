import React, { useState, useEffect, useCallback } from 'react';
import ProductCard from './ProductCard';
import LoadingSpinner from '../common/LoadingSpinner';
import Pagination from '../common/Pagination';
import { getProductsApi, filterProductsApi } from '../../utils/api';
import './ProductList.css';

const ProductList = ({ 
    category = null, 
    searchTerm = null, 
    showFilters = true,
    itemsPerPage = 6,
    searchResults = null,
    filters = {}
}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(category || 'all');
    const [search, setSearch] = useState(searchTerm || '');

    // Hàm chuyển đổi tên danh mục sang tiếng Việt
    const getCategoryDisplayName = (category) => {
        const categoryNames = {
            'electronics': 'Điện tử',
            'clothing': 'Thời trang',
            'books': 'Sách',
            'home': 'Gia dụng',
            'sports': 'Thể thao',
            'beauty': 'Làm đẹp',
            'toys': 'Đồ chơi',
            'food': 'Thực phẩm'
        };
        return categoryNames[category] || category;
    };

    // Fetch products
    const fetchProducts = useCallback(async (page = 1) => {
        try {
            setLoading(true);
            setError(null);

            const paramsObj = {
                page: page.toString(),
                limit: itemsPerPage.toString()
            };

            if (selectedCategory && selectedCategory !== 'all') {
                paramsObj.category = selectedCategory;
            }

            if (search) {
                paramsObj.search = search;
            }

            const response = await getProductsApi(paramsObj);

            if (response.EC === 0) {
                setProducts(response.DT.products);
                setCurrentPage(response.DT.pagination.currentPage);
                setTotalPages(response.DT.pagination.totalPages);
                setTotalProducts(response.DT.pagination.totalProducts);
            } else {
                setError(response.EM);
            }
        } catch (err) {
            setError('Lỗi khi tải sản phẩm');
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    }, [selectedCategory, search, itemsPerPage]);

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:8080/v1/api/products/categories');
            const data = await response.json();
            
            if (data.EC === 0) {
                setCategories(data.DT);
            }
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    };

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchProducts(page);
    };

    // Handle category change
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
        fetchProducts(1);
    };

    // Handle search
    const handleSearch = (searchTerm) => {
        setSearch(searchTerm);
        setCurrentPage(1);
        fetchProducts(1);
    };

    // Apply filters from AdvancedSearch
    const applyFilters = async (page = 1) => {
        try {
            setLoading(true);
            setError(null);

            // Build params and clean empty values
            const paramsObj = {
                page: page,
                limit: itemsPerPage.toString(),
                ...filters,
            };
            Object.keys(paramsObj).forEach((key) => {
                const val = paramsObj[key];
                if (val === '' || val === undefined || val === null) {
                    delete paramsObj[key];
                }
            });
            if (paramsObj.minPrice !== undefined) paramsObj.minPrice = Number(paramsObj.minPrice);
            if (paramsObj.maxPrice !== undefined) paramsObj.maxPrice = Number(paramsObj.maxPrice);
            if (paramsObj.minRating !== undefined) paramsObj.minRating = Number(paramsObj.minRating);
            if (paramsObj.minDiscount !== undefined) paramsObj.minDiscount = Number(paramsObj.minDiscount);

            const response = await filterProductsApi(paramsObj);

            if (response.EC === 0) {
                setProducts(response.DT.products);
                setCurrentPage(response.DT.pagination.currentPage);
                setTotalPages(response.DT.pagination.totalPages);
                setTotalProducts(response.DT.pagination.totalProducts);
            } else {
                setError(response.EM);
            }
        } catch (err) {
            setError('Lỗi khi áp dụng bộ lọc');
            console.error('Error applying filters:', err);
        } finally {
            setLoading(false);
        }
    };

    // Handle page change for filters
    const handleFilterPageChange = (page) => {
        setCurrentPage(page);
        applyFilters(page);
    };

    // Handle search results from AdvancedSearch
    useEffect(() => {
        if (searchResults) {
            setProducts(searchResults.products);
            setCurrentPage(searchResults.pagination.currentPage);
            setTotalPages(searchResults.pagination.totalPages);
            setTotalProducts(searchResults.pagination.totalProducts);
            setLoading(false);
        }
    }, [searchResults]);

    // Handle filters from AdvancedSearch
    useEffect(() => {
        if (filters && Object.keys(filters).length > 0) {
            // Apply filters and search
            applyFilters(1);
        }
    }, [filters]);

    // Initial load
    useEffect(() => {
        if (!searchResults) {
            fetchProducts(1);
            fetchCategories();
        }
    }, [searchResults]);

    // Reset when category or search changes
    useEffect(() => {
        if (category !== selectedCategory || searchTerm !== search) {
            setSelectedCategory(category || 'all');
            setSearch(searchTerm || '');
            setCurrentPage(1);
            fetchProducts(1);
        }
    }, [category, searchTerm]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="error-container">
                <h3>Lỗi khi tải sản phẩm</h3>
                <p>{error}</p>
                <button onClick={() => fetchProducts(1)} className="retry-btn">
                    Thử lại
                </button>
            </div>
        );
    }

    return (
        <div className="product-list-container">
            {showFilters && (
                <div className="product-filters">
                    
                    <div className="category-filters">
                        <button
                            className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                            onClick={() => handleCategoryChange('all')}
                        >
                            Tất cả
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => handleCategoryChange(cat)}
                            >
                                {getCategoryDisplayName(cat)}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="product-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <div className="no-products">
                        <h3>Không tìm thấy sản phẩm nào</h3>
                        <p>Hãy thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {products.length > 0 && totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={filters && Object.keys(filters).length > 0 ? handleFilterPageChange : handlePageChange}
                />
            )}

            {/* Products info */}
            {products.length > 0 && (
                <div className="products-info">
                    <p>
                        Hiển thị {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, totalProducts)} 
                        trong tổng số {totalProducts} sản phẩm
                    </p>
                </div>
            )}
        </div>
    );
};

export default ProductList;
