type Props = {
  img: string;
  text: string;
  num: number;
};
const CarBrandCard = ({ img, text, num } : Props) => {
  return <div className="flex flex-col items-center bg-white rounded-md p-5 px-10 shadow">
    <div className="w-14 h-14 mb-2 flex justify-center">
    <img src={img} alt="car brand image" />
    </div>
    <p className="text-xl">{text}</p>
    <p className="text-primary font-semibold text-xl">+{num}</p>
    </div>;
};

export default CarBrandCard;
