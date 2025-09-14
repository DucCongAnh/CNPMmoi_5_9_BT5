import React, { useState, useEffect } from 'react';
import ProductList from '../components/product/ProductList';
import AdvancedSearch from '../components/search/AdvancedSearch';
import './Products.css';

const Products = () => {
    const [searchResults, setSearchResults] = useState(null);
    const [filters, setFilters] = useState({});
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:8080/v1/api/products/categories');
                const data = await response.json();
                if (data.EC === 0) {
                    setCategories(data.DT);
                }
            } catch (err) {
                // silent fail
            }
        };
        fetchCategories();
    }, []);

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

    return (
        <div className="products-page">
            <div className="page-header">
                <h1>Danh sách sản phẩm</h1>
                <p>Khám phá các sản phẩm chất lượng cao với giá cả hợp lý</p>
            </div>

            <div className="products-layout">
                <aside className="products-sidebar">
                    <AdvancedSearch 
                        onSearchResults={handleSearchResults}
                        onFilterChange={handleFilterChange}
                        isSidebar={true}
                    />

                    <div className="sidebar-categories">
                        <h3>Danh mục</h3>
                        <button 
                            className={`sidebar-category ${selectedCategory === 'all' ? 'active' : ''}`}
                            onClick={() => setSelectedCategory('all')}
                        >
                            Tất cả
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`sidebar-category ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {getCategoryDisplayName(cat)}
                            </button>
                        ))}
                    </div>
                </aside>

                <main className="products-content">
                    <ProductList 
                        category={selectedCategory}
                        showFilters={false}
                        searchResults={searchResults}
                        filters={filters}
                        itemsPerPage={6}
                    />
                </main>
            </div>
        </div>
    );
};

export default Products;
