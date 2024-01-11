"use client";
import { loadStripe } from "@stripe/stripe-js";

export default async function Paymentform() {
  const stripePromise = loadStripe(
    "pk_test_51OXEkMBqhIkHzlfZnC4w52NqpieHV9Hn1H5qwF2zbyqpOtM6uay0QFK0xzU4IgyHNprKk3gJUcTfsIe1JEpnrfch000InCjW8v",
  );

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch("/api/paymentSession", {
      method: "POST",
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.sessionId,
    });

    if (result.error) {
      // handle error here
    }
  };
  return <button onClick={handleCheckout}>Checkout</button>;
}
