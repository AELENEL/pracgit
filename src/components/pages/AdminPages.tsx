import axios from "axios";
import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { setData } from "../../store/slice/productSlice";
import scss from "./AdminPages.module.scss";
import { FaApple } from "react-icons/fa";
interface IForm {
  name: string;
  price: number;
  category: string;
  distraction: string;
  image: string;
}

const API = import.meta.env.VITE_API;

const AdminPage: FC = () => {
  const { register, handleSubmit, reset } = useForm();
  //!
  const addProduct: SubmitHandler<IForm> = async (data) => {
    const newObj = {
      name: data.name,
      price: data.price,
      category: data.category,
      distraction: data.distraction,
      image: data.image,
    };
    try {
      await axios.post(API, newObj);
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setData;
  }, []);
  return (
    <section className={scss.AdminPages}>
      <div className="container">
        <div className={scss.content}>
          <form onSubmit={handleSubmit(addProduct)} action="">
            <FaApple />

            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Name"
            />
            <input
              {...register("price", { required: true })}
              type="text"
              placeholder="price"
            />
            <input
              {...register("category", { required: true })}
              type="text"
              placeholder="category"
            />
            <input
              {...register("distraction", { required: true })}
              type="text"
              placeholder="distraction"
            />
            <input
              {...register("image", { required: true })}
              type="text"
              placeholder="image"
            />
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
