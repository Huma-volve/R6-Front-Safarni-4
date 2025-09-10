// src/pages/CheckoutPage.tsx
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const paymentOptions = ["PayPal", "Visa", "MasterCard"];

export default function CheckoutPage() {
  const [step, setStep] = useState<"options" | "form">("options");
  const [selected, setSelected] = useState<string | null>(null);

  const getSchema = () => {
    if (selected === "PayPal") {
      return z.object({
        fullName: z.string().min(1, "Required"),
        email: z.string().email("Invalid email"),
      });
    } else if (selected) {
      return z.object({
        fullName: z.string().min(1, "Required"),
        email: z.string().email("Invalid email"),
        expire: z.string().min(1, "Required"),
        cvv: z.string().min(1, "Required"),
      });
    }
    return z.object({});
  };

  const form = useForm({
    resolver: zodResolver(getSchema()),
    defaultValues: {
      fullName: "",
      email: "",
      expire: "",
      cvv: "",
    },
  });

  const onSubmit = (values: any) => {
    console.log("Payment Data:", values);
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
          <Card className="flex flex-col flex-1 justify-between">
            <CardHeader>
              <CardTitle className="text-center text-black">
                Add Your Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
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
            </CardContent>
            <CardFooter>
              <Button
                disabled={!selected}
                onClick={() => setStep("form")}
                className="w-full disabled:bg-gray-400"
              >
                Continue
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Form Step */}
        {step === "form" && selected && (
          <Card className="flex flex-col flex-1">
            <CardHeader>
              <div className="flex items-center mb-2">
                <button
                  onClick={() => setStep("options")}
                  className="flex items-center text-gray-600"
                >
                  <ArrowLeft className="w-8 h-8 rounded-full bg-gray-100 p-1" />
                </button>
              </div>
              <CardTitle className="text-center text-gray-800">
                Choose Payment Method
              </CardTitle>
            </CardHeader>

            <CardContent>
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

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 flex flex-col flex-1 justify-between"
                >
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter full name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            {...field}
                            placeholder="Enter email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {(selected === "Visa" || selected === "MasterCard") && (
                    <div className="flex flex-col md:flex-row gap-4">
                      <FormField
                        control={form.control}
                        name="expire"
                        render={({ field }) => (
                          <FormItem className="w-full md:w-2/3">
                            <FormLabel>Expire Date</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="MM/YY" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cvv"
                        render={({ field }) => (
                          <FormItem className="w-full md:w-1/3">
                            <FormLabel>CVV</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="123" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="w-full mt-6 disabled:bg-gray-400"
                  >
                    Pay Now
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
