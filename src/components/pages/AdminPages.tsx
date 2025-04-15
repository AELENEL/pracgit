// src/components/products/AdminPage.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { ProductFormData } from "../../type/product.type";
import { addProduct, resetStatus } from "../../store/slice/productSlice";
import { AppDispatch, RootState } from "../../store/Store";
import styles from "./AdminPages.module.scss";

const AdminPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.products);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>();

  const onSubmit: SubmitHandler<ProductFormData> = (data) => {
    dispatch(addProduct(data))
      .unwrap()
      .then(() => {
        reset(); // Reset form on success
      })
      .catch((err: any) => {
        console.error("Failed to add product:", err);
      });
  };

  // Reset form and status when component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetStatus());
    };
  }, [dispatch]);

  return (
    <div className={styles.addProductContainer}>
      <h2>Add New Product</h2>

      {status === "succeeded" && (
        <div className={styles.successMessage}>Product added successfully!</div>
      )}

      {status === "failed" && error && (
        <div className={styles.errorMessage}>
          {error.message || "Failed to add product"}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Product Name</label>
          <input
            id="name"
            type="text"
            {...register("name", {
              required: "Product name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
          />
          {errors.name && (
            <span className={styles.error}>{errors.name.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters",
              },
            })}
          />
          {errors.description && (
            <span className={styles.error}>{errors.description.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            step="0.01"
            {...register("price", {
              required: "Price is required",
              min: { value: 0.01, message: "Price must be greater than 0" },
              valueAsNumber: true,
            })}
          />
          {errors.price && (
            <span className={styles.error}>{errors.price.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            {...register("category", { required: "Category is required" })}
          >
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
            <option value="home">Home & Kitchen</option>
            <option value="other">Other</option>
          </select>
          {errors.category && (
            <span className={styles.error}>{errors.category.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="imageUrl">Image URL</label>
          <input id="imageUrl" type="text" {...register("imageUrl")} />
          {errors.imageUrl && (
            <span className={styles.error}>{errors.imageUrl.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="stock">Stock Quantity</label>
          <input
            id="stock"
            type="number"
            {...register("stock", {
              required: "Stock quantity is required",
              min: { value: 0, message: "Stock cannot be negative" },
              valueAsNumber: true,
            })}
          />
          {errors.stock && (
            <span className={styles.error}>{errors.stock.message}</span>
          )}
        </div>

        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
