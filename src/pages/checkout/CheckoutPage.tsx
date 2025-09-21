// src/pages/CheckoutPage.tsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import BackButton from "../../components/common/BackButton";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);

const API_URL = import.meta.env.VITE_API_URL;
const TOKEN = localStorage.getItem("token") || import.meta.env.VITE_TOKEN;

type LocationState = {
  booking_id?: string;
  booking_type?: string;
};

export default function CheckoutPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const state = location.state as LocationState;

  const bookingId = state?.booking_id || query.get("booking_id");
  const bookingType = state?.booking_type || query.get("booking_type");

  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!bookingId || !bookingType) return;

    const createCheckout = async () => {
      try {
        const res = await fetch(`${API_URL}/checkout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify({
            booking_type: bookingType,
            booking_id: bookingId,
          }),
        });

        const data = await res.json();
        console.log("Checkout response:", data);

        if (res.ok && data.data) {
          setPaymentId(data.data.payment_id);
          setClientSecret(data.data.client_secret);
        } else {
          console.error("Checkout API error:", data);
        }
      } catch (err) {
        console.error("Checkout request failed:", err);
      }
    };

    createCheckout();
  }, [bookingId, bookingType]);

  if (!clientSecret) {
    return <div className="p-6">Loading checkout...</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <div className="p-6 h-auto">
        <div className="mb-4">
          <BackButton router={-1} />
        </div>
        <div className="flex flex-col md:flex-row h-auto md:h-[calc(100vh-130px)] rounded-2xl">
          <div className="hidden md:flex flex-1 items-center justify-center bg-gray-100 rounded-2xl">
            <img
              src="/src/assets/paymentcard.png"
              alt="Checkout"
              className="max-w-full md:max-w-sm w-full h-auto"
            />
          </div>

          <div className="flex-1 p-6 flex flex-col">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Payment Method 💳
            </h1>
            <PaymentOptions paymentId={paymentId!} navigate={navigate} />
          </div>
        </div>
      </div>
    </Elements>
  );
}

function PaymentOptions({
  paymentId,
  navigate,
}: {
  paymentId: string;
  navigate: (path: string) => void;
}) {
  const [method, setMethod] = useState<"paypal" | "visa" | "mastercard" | null>(
    null
  );

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setMethod("paypal")}
          className={`px-4 py-2 rounded-lg border ${
            method === "paypal" ? "bg-blue-100 border-blue-500" : "bg-gray-100"
          }`}
        >
          🅿️ Paypal
        </button>
        <button
          onClick={() => setMethod("mastercard")}
          className={`px-4 py-2 rounded-lg border ${
            method === "mastercard"
              ? "bg-yellow-100 border-yellow-500"
              : "bg-gray-100"
          }`}
        >
          💳 Mastercard
        </button>
        <button
          onClick={() => setMethod("visa")}
          className={`px-4 py-2 rounded-lg border ${
            method === "visa" ? "bg-green-100 border-green-500" : "bg-gray-100"
          }`}
        >
          💳 Visa
        </button>
      </div>

      {method === "paypal" && (
        <div className="text-center text-gray-600">
          ✅ PayPal integration placeholder
        </div>
      )}

      {(method === "visa" || method === "mastercard") && (
        <CheckoutForm paymentId={paymentId} navigate={navigate} />
      )}
    </div>
  );
}

function CheckoutForm({
  paymentId,
  navigate,
}: {
  paymentId: string;
  navigate: (path: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage(null);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)!,
    });

    if (error) {
      setMessage(error.message || "Something went wrong with Stripe");
      setLoading(false);
      return;
    }

    console.log("✅ Payment Method created:", paymentMethod);

    try {
      const res = await fetch(`${API_URL}/checkout/confirm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          payment_id: paymentId,
          payment_method_id: paymentMethod.id,
        }),
      });

      const text = await res.text();
      console.log("📩 Raw response:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        setMessage("❌ السيرفر رجع HTML مش JSON: " + text.substring(0, 100));
        return;
      }

      if (res.ok && data.status === "succeeded") {
        navigate("/checkout/success");
      } else {
        setMessage("⚠️ الدفع لم يكتمل: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      setMessage("Server error أثناء تأكيد الدفع");
      console.error("❌ Confirm request failed:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="border p-3 rounded-md">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                fontFamily: "Arial, sans-serif",
                "::placeholder": {
                  color: "#a0aec0",
                },
              },
              invalid: {
                color: "#e53e3e",
              },
            },
          }}
        />
      </div>

      <Button type="submit" disabled={loading || !stripe} className="w-full">
        {loading ? "جاري الدفع..." : "Continue"}
      </Button>

      {message && (
        <div className="text-center mt-4 text-gray-700 font-medium">
          {message}
        </div>
      )}
    </form>
  );
}
