import BorderedContainer from "../../common/BorderedContainer";
import { Card, CardContent } from "../../ui/card";
import hotel from "../../../assets/hotel.webp";
import { MapPin, Star } from "lucide-react";

export default function Hotels() {
  return (
    <>
      <BorderedContainer className="my-6">
        <Card className="md:p-4 p-2">
          <CardContent className="flex gap-4 px-0">
            <div>
              <img src={hotel} alt="Car Image" className="object-cover w-36" />
            </div>
            <div className="flex  justify-between w-full">
              <div className="flex flex-col gap-2 justify-center">
                <p className="bg-primary/10 w-fit px-3 py-1 text-xs rounded-full text-primary text-center">
                  15%off
                </p>
                <p className="text-md md:text-2xl">Golden Valley</p>
                <p className="text-muted text-sm md:text-md flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  New York, USA
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
