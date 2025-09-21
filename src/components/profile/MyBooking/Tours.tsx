import BorderedContainer from "../../common/BorderedContainer";
import { Card, CardContent } from "../../ui/card";
import { Star } from "lucide-react";
import type { Tour } from "@/Types/Tours";

export default function Tours({ tourDetails }: { tourDetails: Tour }) {
  return (
    <>
      <BorderedContainer className="my-6">
        <Card className="md:p-4 p-2">
          <CardContent className="flex gap-4 px-0">
            <img
              src={tourDetails.image}
              alt="Tour Image"
              className="object-cover w-36 rounded-lg"
            />
            <div className="flex  justify-between w-full text-sm md:text-lg">
              <div className="flex flex-col gap-2 justify-center">
                <p className="text-md md:text-xl text-muted">
                  {tourDetails.title}
                </p>
                <p className="text-md md:text-2xl">{tourDetails.location}</p>
                <p className="text-muted text-md">
                  From{" "}
                  <span className="text-primary">
                    ${Number(tourDetails.price).toFixed(0)}
                  </span>{" "}
                  per person
                </p>
              </div>
              <p className="flex flex-col sm:flex-row gap-2 text-sm md:text-lg">
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
