import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import '../styles/Products.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get('/api/products/fetch-products');
        if (!mounted) return;
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('fetch products', err);
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    setVisibleProducts(products);
  }, [products]);

  if (loading) return <div className="products-loading">Loading products…</div>;
  if (error) return <div className="products-error">Error loading products</div>;

  return (
    <div className="products-container">
      {visibleProducts.length === 0 ? (
        <div className="no-products">No products found</div>
      ) : (
        visibleProducts.map((p) => (
          <div className="product-card" key={p._id}>
            <img src={p.mainImg || '/placeholder.png'} alt={p.title || 'product'} />
            <div className="product-info">
              <h4>{p.title}</h4>
              <p>{p.description?.slice(0, 80)}</p>
              <div className="product-price">₹{p.price}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}