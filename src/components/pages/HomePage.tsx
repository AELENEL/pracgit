import { FC, useEffect, useState } from "react";
import scss from "./HomePage.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/Store";
import axios from "axios";
import { setData } from "../../store/slice/productSlice";
import { useForm } from "react-hook-form";

const API = import.meta.env.VITE_API;
interface IProduct {
  _id: number;
  name: string;
  price: number;
  category: string;
  distraction: string;
  image: string;
}
interface IForm {
  name: string;
  price: number;
  category: string;
  distraction: string;
  image: string;
}

const HomePage: FC = () => {
  const { data } = useAppSelector((state) => state.data);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm<IForm>();
  const [isLoading, setIsLoading] = useState(false); // добавляем
  const [selectedDetailProduct, setSelectedDetailProduct] =
    useState<IProduct | null>(null);

  const fetchData = async () => {
    const { data } = await axios.get(API);
    dispatch(setData(data.data));
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`${API}/${id}`);
    fetchData();
  };
  //!
  const handleEdit = (product: IProduct) => {
    setSelectedProduct(product);
    setValue("name", product.name);
    setValue("price", product.price);
    setValue("category", product.category);
    setValue("distraction", product.distraction);
    setValue("image", product.image);
    setIsModalOpen(true);
  };

  console.log(data);
  //!
  const handleUpdate = async (data: IForm) => {
    if (!selectedProduct) return;

    const updatedProduct = {
      name: data.name,
      price: data.price,
      category: data.category,
      distraction: data.distraction,
      image: data.image,
    };

    try {
      setIsLoading(true); 
      await axios.patch(`${API}/${selectedProduct._id}`, updatedProduct);
      setIsModalOpen(false);
      fetchData();
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); 
    }
  };
  //!
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    reset();
  };

  //!
  const openDetailModal = (product: IProduct) => {
    setSelectedDetailProduct(product);
  };
  const closeDetailModal = () => {
    setSelectedDetailProduct(null);
  };

  //!

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className={scss.homePage}>
      <div className="container">
        <div className={scss.content}>
          {data.length === 0 ? (
            <p>No products available.</p>
          ) : (
            data.map((product, index) => (
              <div className={scss.cart} key={index}>
                <img
                  src={product.image}
                  alt={product.name}
                  onClick={() => openDetailModal(product)}
                  className={scss.productImage}
                />

                <h3>{product.name}</h3>
                <p>{product.price}</p>
                <button onClick={() => handleDelete(product._id)}>
                  delete
                </button>
                <button onClick={() => handleEdit(product)}>edit</button>
              </div>
            ))
          )}
        </div>
      </div>
      {isModalOpen && (
        <div className={scss.modalOverlay}>
          <div className={scss.modal}>
            <div className={scss.modalHeader}>
              <h2>Edit Product</h2>
              <button className={scss.closeBtn} onClick={closeModal}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit(handleUpdate)} action="">
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Name"
              />
              <input
                {...register("price", { required: true })}
                type="text"
                placeholder="Price"
              />
              <input
                {...register("category", { required: true })}
                type="text"
                placeholder="Category"
              />
              <input
                {...register("distraction", { required: true })}
                type="text"
                placeholder="Description"
              />
              <input
                {...register("image", { required: true })}
                type="text"
                placeholder="Image URL"
              />
              <button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    Updating
                    <span className={scss.spinner}></span>
                  </>
                ) : (
                  "Update"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
      {selectedDetailProduct && (
        <div className={scss.modalOverlay}>
          <div className={scss.modal}>
            <div className={scss.modalHeader}>
              <h2>{selectedDetailProduct.name}</h2>
              <button className={scss.closeBtn} onClick={closeDetailModal}>
                ×
              </button>
            </div>
            <div className={scss.detailContent}>
              <img
                src={selectedDetailProduct.image}
                alt={selectedDetailProduct.name}
              />
              <p>
                <strong>Price:</strong> ${selectedDetailProduct.price}
              </p>
              <p>
                <strong>Category:</strong> {selectedDetailProduct.category}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {selectedDetailProduct.distraction}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomePage;
