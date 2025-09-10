import CarBrandCard from "@/components/carsBrand/CarBrandCard";
import SubTitle from "@/components/common/SubTitle";
import car1 from "../../assets/BMW.png";
const CarBookingPage = () => {
  return (
    <div>
      <SubTitle title="Brands" />
      <div className="flex justify-between items-center">
        <CarBrandCard img={car1} text="BMW" num={12} />
        <CarBrandCard img={car1} text="BMW" num={12} />
        <CarBrandCard img={car1} text="BMW" num={12} />
        <CarBrandCard img={car1} text="BMW" num={12} />
        <CarBrandCard img={car1} text="BMW" num={12} />
        <CarBrandCard img={car1} text="BMW" num={12} />
        <CarBrandCard img={car1} text="BMW" num={12} />
      </div>
      <SubTitle title="popular Cars" />
    </div>
  );
};

export default CarBookingPage;
