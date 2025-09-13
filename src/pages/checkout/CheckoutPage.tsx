// src/pages/CheckoutPage.tsx
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const paymentOptions = ["PayPal", "Visa", "MasterCard"];

export default function CheckoutPage() {
  const [step, setStep] = useState<"options" | "form">("options");
  const [selected, setSelected] = useState<string | null>(null);

  const getValidationSchema = () => {
    if (selected === "PayPal") {
      return Yup.object({
        fullName: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
      });
    } else if (selected) {
      return Yup.object({
        fullName: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        expire: Yup.string().required("Required"),
        cvv: Yup.string().required("Required"),
      });
    }
    return Yup.object({});
  };

  return (
    <div className="flex flex-col md:flex-row h-auto md:h-[calc(100vh-130px)]">
      {/* Left Side */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-gray-100 rounded-2xl h-full">
        <img
          src="/src/assets/paymentcard.png"
          alt="checkout"
          className="max-w-full md:max-w-sm w-full h-auto"
        />
      </div>

      {/* Right Side */}
      <div className="flex-1 p-4 md:p-8 flex flex-col">
        {/* Options Step */}
        {step === "options" && (
          <div className="flex flex-col flex-1 justify-between">
            <div>
              <h2 className="text-xl font-bold mb-6 text-center text-black">
                Add Your Payment Method
              </h2>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
                {paymentOptions.map((option) => (
                  <div
                    key={option}
                    className={`flex items-center gap-3 p-3 border rounded-full cursor-pointer transition ${
                      selected === option
                        ? "border-primary bg-blue-50"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelected(option)}
                  >
                    <img
                      src={`/src/assets/${option.toLowerCase()}.png`}
                      alt={option}
                      className="w-6 h-6"
                    />
                    <span className="font-medium text-gray-800">{option}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              disabled={!selected}
              onClick={() => setStep("form")}
              className="disabled:bg-gray-400 mt-6"
            >
              Continue
            </Button>
          </div>
        )}

        {/* Form Step */}
        {step === "form" && (
          <>
            {/* Back Arrow */}
            <div className="flex items-center mb-4">
              <button
                onClick={() => setStep("options")}
                className="flex items-center text-gray-600"
              >
                <ArrowLeft className="w-8 h-8 rounded-full bg-gray-100 p-1" />
              </button>
            </div>

            <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
              Choose Payment Method
            </h2>

            {/* Options again in form step */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
              {paymentOptions.map((option) => (
                <div
                  key={option}
                  className={`flex items-center gap-3 p-3 border rounded-full cursor-pointer transition ${
                    selected === option
                      ? "border-primary bg-blue-50"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelected(option)}
                >
                  <img
                    src={`/src/assets/${option.toLowerCase()}.png`}
                    alt={option}
                    className="w-6 h-6"
                  />
                  <span className="font-medium text-gray-800">{option}</span>
                </div>
              ))}
            </div>

            {/* Form based on selected option */}
            {selected && (
              <Formik
                initialValues={{
                  fullName: "",
                  email: "",
                  expire: "",
                  cvv: "",
                }}
                validationSchema={getValidationSchema()}
                onSubmit={(values) => {
                  console.log("Payment Data:", values);
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4 flex flex-col flex-1 justify-between">
                    <div>
                      <div>
                        <label className="block mb-1 text-gray-800">
                          Full Name
                        </label>
                        <Field
                          name="fullName"
                          className="w-full border border-gray-300 p-2 rounded text-gray-800"
                        />
                        <ErrorMessage
                          name="fullName"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block mb-1 text-gray-800">
                          Email
                        </label>
                        <Field
                          name="email"
                          type="email"
                          className="w-full border border-gray-300 p-2 rounded text-gray-800"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      {(selected === "Visa" || selected === "MasterCard") && (
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="w-full md:w-2/3">
                            <label className="block mb-1 text-gray-800">
                              Expire Date
                            </label>
                            <Field
                              name="expire"
                              className="w-full border border-gray-300 p-2 rounded text-gray-800"
                            />
                            <ErrorMessage
                              name="expire"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>

                          <div className="w-full md:w-1/3">
                            <label className="block mb-1 text-gray-800">
                              CVV
                            </label>
                            <Field
                              name="cvv"
                              className="w-full border border-gray-300 p-2 rounded text-gray-800"
                            />
                            <ErrorMessage
                              name="cvv"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="disabled:bg-gray-400 mt-6"
                    >
                      Pay Now
                    </Button>
                  </Form>
                )}
              </Formik>
            )}
          </>
        )}
      </div>
    </div>
  );
}
