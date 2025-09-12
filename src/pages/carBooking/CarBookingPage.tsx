import CarBrandCard from "@/components/carsBrand/CarBrandCard";
import SubTitle from "@/components/common/SubTitle";
import car1 from "../../assets/BMW.png";
import BackButton from "@/components/common/BackButton";

const CarBookingPage = () => {
  return (
    <div>
      <BackButton router="/" />
      <SubTitle title="Brands" />
      <div className="flex justify-start items-center flex-wrap gap-6 ">
        <CarBrandCard img={car1} text="BMW" num={32} />
        <CarBrandCard img={car1} text="BMW" num={32} />
        <CarBrandCard img={car1} text="BMW" num={32} />
        <CarBrandCard img={car1} text="BMW" num={32} />
        <CarBrandCard img={car1} text="BMW" num={32} />
        <CarBrandCard img={car1} text="BMW" num={32} />
        <CarBrandCard img={car1} text="BMW" num={32} />
      </div>
      <SubTitle title="popular Cars" />
    </div>
  );
};

export default CarBookingPage;
