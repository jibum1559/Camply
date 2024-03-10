

import React, { useState } from 'react';
import '../css/ShopSell/SellEdit.css';


const productsData = [
    { id: 1, image: 'image_url_1', name: 'Product 1', price: '$100', category: 'Category 1', status: 'Active', stock: 50, date: '2024-01-18' },
    
];

const SellList = () => {
    const [filter, setFilter] = useState('');
    const [products, setProducts] = useState(productsData);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(filter.toLowerCase())
    );

    const handleEdit = (productId) => {
        console.log(`Edit product with ID ${productId}`);
    };

    const handleDelete = (productId) => {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
        console.log(`Delete product with ID ${productId}`);
    };

    return (
        <div className="sell-list">
            <h2>상품조회</h2>

            <div className="filter-section">
                <label>
                    검색:
                    <input type="text" value={filter} onChange={handleFilterChange} />
                </label>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>상품ID</th>
                        <th>상품이미지</th>
                        <th>상품명</th>
                        <th>판매가</th>
                        <th>카테고리</th>
                        <th>상태</th>
                        <th>재고</th>
                        <th>등록일</th>
                        <th>수정/삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td><img src={product.image} alt={product.name} style={{ width: '50px', height: '50px' }} /></td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.status}</td>
                            <td>{product.stock}</td>
                            <td>{product.date}</td>
                            <td>
                                <button onClick={() => handleEdit(product.id)}>수정</button>
                                <button onClick={() => handleDelete(product.id)}>삭제</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SellList;
