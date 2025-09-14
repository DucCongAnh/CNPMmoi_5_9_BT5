# Hướng dẫn sử dụng tính năng phân trang

## Tổng quan
Tính năng phân trang đã được tích hợp vào ứng dụng để thay thế việc load tất cả sản phẩm cùng lúc. Thay vào đó, sản phẩm sẽ được hiển thị theo từng trang với số lượng cố định.

## Các thay đổi chính

### 1. Component Pagination mới
- **File**: `ReactJS01/src/components/common/Pagination.jsx`
- **Chức năng**: Hiển thị các nút phân trang với các tính năng:
  - Nút First/Last (trang đầu/cuối)
  - Nút Previous/Next (trang trước/sau)
  - Hiển thị số trang với ellipsis (...)
  - Responsive design
  - Dark mode support

### 2. Cập nhật ProductList
- **File**: `ReactJS01/src/components/product/ProductList.jsx`
- **Thay đổi**:
  - Loại bỏ infinite scroll
  - Thêm state cho phân trang: `totalPages`, `totalProducts`
  - Thêm component Pagination
  - Thêm thông tin hiển thị sản phẩm
  - Hỗ trợ phân trang cho cả tìm kiếm và lọc

### 3. CSS cho Pagination
- **File**: `ReactJS01/src/components/common/Pagination.css`
- **Tính năng**:
  - Design hiện đại với hover effects
  - Responsive cho mobile
  - Dark mode support
  - Animation mượt mà

## Cách sử dụng

### 1. Trang sản phẩm (`/products`)
- Mặc định hiển thị 6 sản phẩm mỗi trang
- Có thể thay đổi số lượng sản phẩm qua prop `itemsPerPage`
- Phân trang tự động cập nhật khi:
  - Thay đổi danh mục
  - Tìm kiếm
  - Áp dụng bộ lọc

### 2. Tìm kiếm nâng cao
- Hỗ trợ phân trang cho kết quả tìm kiếm
- Kết quả tìm kiếm sẽ hiển thị với phân trang riêng
- Có thể kết hợp với các bộ lọc khác

### 3. Lọc sản phẩm
- Tất cả các bộ lọc đều hỗ trợ phân trang
- Phân trang sẽ reset về trang 1 khi áp dụng bộ lọc mới

## API Backend
Backend đã có sẵn hỗ trợ phân trang với các tham số:
- `page`: Số trang (mặc định: 1)
- `limit`: Số sản phẩm mỗi trang (mặc định: 10)
- `category`: Lọc theo danh mục
- `search`: Tìm kiếm theo từ khóa

## Cấu trúc dữ liệu trả về
```json
{
  "EC": 0,
  "EM": "Success",
  "DT": {
    "products": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalProducts": 50,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

## Tùy chỉnh

### Thay đổi số sản phẩm mỗi trang
```jsx
<ProductList itemsPerPage={20} />
```

### Tùy chỉnh số trang hiển thị
```jsx
<Pagination 
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
  maxVisiblePages={7} // Hiển thị tối đa 7 trang
/>
```

## Lợi ích
1. **Performance**: Giảm tải cho server và client
2. **UX**: Người dùng dễ dàng điều hướng
3. **SEO**: Tốt hơn cho SEO với URL có thể chứa tham số trang
4. **Responsive**: Hoạt động tốt trên mọi thiết bị
5. **Accessibility**: Hỗ trợ keyboard navigation

## Lưu ý
- Phân trang sẽ tự động reset về trang 1 khi thay đổi bộ lọc hoặc tìm kiếm
- Khi không có sản phẩm nào, phân trang sẽ không hiển thị
- Thông tin sản phẩm hiển thị sẽ cập nhật theo trang hiện tại