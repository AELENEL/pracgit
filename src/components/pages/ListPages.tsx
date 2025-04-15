import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/Store";
import { deleteProduct, fetchProducts } from "../../store/slice/productSlice";
import "./ListPage.module.scss"; // Make sure this file exists in the same directory

const ListPages: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id))
        .unwrap()
        .then(() => {
          // Success notification could be added here
        })
        .catch((err: any) => {
          console.error("Failed to delete product:", err);
        });
    }
  };

  if (status === "loading") {
    return <div className="loading">Loading products...</div>;
  }

  if (status === "failed") {
    return (
      <div className="error-message">
        Error: {error?.message || "Failed to fetch products"}
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="product-header">
        <h1>Products</h1>
        <Link to="/products/add" className="add-button">
          <span>+</span> Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h2>No Products Found</h2>
          <p>Get started by adding your first product</p>
          <Link to="/products/add" className="primary-button">
            Add Your First Product
          </Link>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="card-content">
                {product.imageUrl && (
                  <div className="product-image">
                    <img src={product.imageUrl} alt={product.name} />
                  </div>
                )}
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  <div className="product-category">{product.category}</div>
                  <div className="product-price">${product.price}</div>
                  <div className="product-stock">
                    <span
                      className={
                        product.stock > 0 ? "in-stock" : "out-of-stock"
                      }
                    >
                      {product.stock > 0
                        ? `In Stock (${product.stock})`
                        : "Out of Stock"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="product-description">
                <p>{product.description}</p>
              </div>

              <div className="card-actions">
                <Link
                  to={`/products/edit/${product.id}`}
                  className="edit-button"
                >
                  Edit
                </Link>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListPages;
