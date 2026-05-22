import { describe, expect, it } from "vitest";
import {
  DELIVERY_AREAS,
  formatDeliveryPriceNis,
  getDeliveryAreaByKey,
  getDeliveryPriceNis,
  isDeliveryAreaKey,
} from "./delivery";

describe("delivery areas", () => {
  it("defines the current delivery prices", () => {
    expect(DELIVERY_AREAS).toHaveLength(5);
    expect(getDeliveryPriceNis("nablus_receive_point")).toBe(0);
    expect(getDeliveryPriceNis("west_bank_cities")).toBe(20);
    expect(getDeliveryPriceNis("jerusalem")).toBe(30);
    expect(getDeliveryPriceNis("lands_48")).toBe(70);
    expect(getDeliveryPriceNis("west_jerusalem_area")).toBe(45);
  });

  it("marks the free Nablus receive point as requiring customer agreement", () => {
    const area = getDeliveryAreaByKey("nablus_receive_point");

    expect(area).not.toBeNull();
    expect(area?.priceNis).toBe(0);
    expect(area?.requiresCustomerAgreement).toBe(true);
    expect(area?.noteEn).toContain("WhatsApp");
  });

  it("validates delivery area keys", () => {
    expect(isDeliveryAreaKey("jerusalem")).toBe(true);
    expect(isDeliveryAreaKey("unknown-area")).toBe(false);
  });

  it("returns null for unknown delivery prices", () => {
    expect(getDeliveryPriceNis("unknown-area")).toBeNull();
  });

  it("formats delivery prices", () => {
    expect(formatDeliveryPriceNis(0)).toBe("Free");
    expect(formatDeliveryPriceNis(20)).toBe("20 NIS");
  });
});
