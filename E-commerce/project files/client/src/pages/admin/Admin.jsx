import React, { useEffect, useState } from 'react';
import '../../styles/Admin.css';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const Admin = () => {
  const navigate = useNavigate();

  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
  }, [navigate]);

  useEffect(() => {
    if (localStorage.getItem('userType') === 'admin') {
      navigate('/admin');
    }
  }, [navigate]);

  useEffect(() => {
    fetchCountData();
  }, []);

  const fetchCountData = async () => {
    try {
      const usersRes = await api.get('/api/users/fetch-users');
      setUserCount(Array.isArray(usersRes.data) ? Math.max(0, usersRes.data.length - 1) : 0);
    } catch (err) {
      console.error('Failed to fetch users count', err);
      setUserCount(0);
    }

    try {
      const productsRes = await api.get('/api/products/fetch-products');
      setProductCount(Array.isArray(productsRes.data) ? productsRes.data.length : 0);
    } catch (err) {
      console.error('Failed to fetch products count', err);
      setProductCount(0);
    }

    try {
      const ordersRes = await api.get('/api/orders/fetch-orders');
      setOrdersCount(Array.isArray(ordersRes.data) ? ordersRes.data.length : 0);
    } catch (err) {
      console.error('Failed to fetch orders count', err);
      setOrdersCount(0);
    }
  };

  const [banner, setBanner] = useState('');
  const updateBanner = async () => {
    try {
      // keep the same path your server expects; using `api` adds auth header
      await api.post('/update-banner', { banner });
      alert('Banner updated');
      setBanner('');
    } catch (err) {
      console.error('Failed to update banner', err);
      alert('Failed to update banner');
    }
  };

  return (
    <div className="admin-page">
      <div>
        <div className="admin-home-card">
          <h5>Total users</h5>
          <p>{userCount}</p>
          <button onClick={() => navigate('/all-users')}>View all</button>
        </div>
      </div>

      <div>
        <div className="admin-home-card">
          <h5>All Products</h5>
          <p>{productCount}</p>
          <button onClick={() => navigate('/all-products')}>View all</button>
        </div>
      </div>

      <div>
        <div className="admin-home-card">
          <h5>All Orders</h5>
          <p>{ordersCount}</p>
          <button onClick={() => navigate('/all-orders')}>View all</button>
        </div>
      </div>

      <div>
        <div className="admin-home-card">
          <h5>Add Product</h5>
          <p>(new)</p>
          <button onClick={() => navigate('/new-product')}>Add now</button>
        </div>
      </div>

      <div>
        <div className="admin-banner-input admin-home-card">
          <h5>Update banner</h5>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingURLInput"
              value={banner}
              onChange={(e) => setBanner(e.target.value)}
            />
            <label htmlFor="floatingURLInput">Banner url</label>
          </div>
          <button onClick={updateBanner}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default Admin;