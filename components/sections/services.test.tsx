import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Services } from "@/components/sections/services";
import { carePlanDescription, carePlanPrice } from "@/lib/pricing";

describe("Services", () => {
  it("explains the approved service scopes and keeps the Care Plan terms", () => {
    render(<Services />);
    expect(
      screen.getByRole("heading", { name: "Online Stores & Booking" })
    ).toBeInTheDocument();
    for (const description of [
      "Help customers find your services, see your work, and get in touch on WhatsApp.",
      "Sell products or take bookings online and accept payments through Paystack.",
      "Build a focused Android app for a workflow such as ordering or booking.",
      "Add online payments to an existing website or build a wallet for your product.",
      carePlanDescription,
      carePlanPrice,
    ]) {
      expect(screen.getByText(description)).toBeInTheDocument();
    }
  });
});
