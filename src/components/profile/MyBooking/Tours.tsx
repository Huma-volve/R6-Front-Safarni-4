import BorderedContainer from "../../common/BorderedContainer";
import { Card, CardContent } from "../../ui/card";
import tour from "../../../assets/tour.png";
import { Star } from "lucide-react";

export default function Tours() {
  return (
    <>
      <BorderedContainer className="my-6">
        <Card className="md:p-4 p-2">
          <CardContent className="flex gap-4 px-0">
            <div>
              <img src={tour} alt="Car Image" className="object-cover w-36" />
            </div>
            <div className="flex  justify-between w-full">
              <div className="flex flex-col gap-2 justify-center">
                <p className="text-md md:text-xl font-semibold text-muted">
                  Full Day Tour
                </p>
                <p className="text-md md:text-2xl">Luxor</p>
                <p className="text-muted text-md font-semibold">
                  From <span className="text-primary">$100</span> per person
                </p>
              </div>
              <p className="flex gap-2 font-semibold text-sm md:text-md">
                <Star className="w-5 h-5 text-secondary fill-secondary" />
                4.3
              </p>
            </div>
          </CardContent>
        </Card>
      </BorderedContainer>
    </>
  );
}
