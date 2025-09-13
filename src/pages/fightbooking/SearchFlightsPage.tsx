import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import BackButton from "../../components/common/BackButton";

interface FormValues {
  from: string;
  to: string;
  departure: string;
  returnDate: string;
  passengers: number;
}

export default function SearchFlights() {
  const navigate = useNavigate();

  const handleSearch = (values: FormValues) => {
    navigate("/flights/list", { state: values });
  };

  return (
    <div className="p-6 h-auto">
      <div className="mb-4">
        <BackButton />
      </div>
      <div className="flex flex-col md:flex-row h-auto md:h-[calc(100vh-130px)]  rounded-2xl">
        {/* Left Side */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-gray-100 rounded-2xl">
          <img
            src="/src/assets/flightbooking.png"
            alt="Search Flights"
            className="max-w-full md:max-w-sm w-full h-auto"
          />
        </div>

        {/* Right Side */}
        <div className="flex-1 p-6 flex flex-col">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Search Flights ✈️
          </h1>

          {/* Form */}
          <Formik<FormValues>
            initialValues={{
              from: "",
              to: "",
              departure: "",
              returnDate: "",
              passengers: 1,
            }}
            onSubmit={handleSearch}
          >
            {() => (
              <Form className="flex flex-col gap-4">
                <Field
                  name="from"
                  placeholder="From (e.g. Lake Kameron)"
                  className="p-2 border rounded text-gray-800"
                />
                <Field
                  name="to"
                  placeholder="To (e.g. Enricofurt)"
                  className="p-2 border rounded text-gray-800"
                />
                <div className="flex gap-4">
                  <Field
                    type="date"
                    name="departure"
                    className="w-1/2 p-2 border rounded text-gray-800"
                  />
                  <Field
                    type="date"
                    name="returnDate"
                    className="w-1/2 p-2 border rounded text-gray-800"
                  />
                </div>

                <Field
                  type="number"
                  name="passengers"
                  min="1"
                  className="p-2 border rounded text-gray-800"
                />

                <Button type="submit">Search Flights</Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
