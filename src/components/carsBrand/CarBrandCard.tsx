import axios from "axios";
import { useEffect } from "react";

type Props = {
  img: string;
  text: string;
  num: number;
};
const CarBrandCard = ({ img, text, num } : Props) => {
  const get = async() => {
    const res = await axios.get(
      "http://round5-safarnia.huma-volve.com/api/cars"
    );
    console.log(res.data);
  }

  useEffect(() => {
    get();
  }, []);



  return <div className="flex flex-col items-center bg-white rounded-md p-5 px-10 shadow">
    <div className="w-14 h-14 mb-2 flex justify-center">
    <img src={img} alt="car brand image" />
    </div>
    <p className="text-xl">{text}</p>
    <p className="text-primary">+{num}</p>
    </div>;
};

export default CarBrandCard;
