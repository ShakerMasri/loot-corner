export const DELIVERY_CURRENCY = "NIS";

export type DeliveryAreaKey =
  | "nablus_receive_point"
  | "west_bank_cities"
  | "jerusalem"
  | "lands_48"
  | "west_jerusalem_area";

export type DeliveryArea = {
  key: DeliveryAreaKey;
  priceNis: number;
  requiresCustomerAgreement: boolean;
};

export const DELIVERY_AREAS: DeliveryArea[] = [
  {
    key: "nablus_receive_point",
    priceNis: 0,
    requiresCustomerAgreement: true,
  },
  {
    key: "west_bank_cities",
    priceNis: 20,
    requiresCustomerAgreement: false,
  },
  {
    key: "jerusalem",
    priceNis: 30,
    requiresCustomerAgreement: false,
  },
  {
    key: "lands_48",
    priceNis: 70,
    requiresCustomerAgreement: false,
  },
  {
    key: "west_jerusalem_area",
    priceNis: 45,
    requiresCustomerAgreement: false,
  },
];

export const DELIVERY_AREA_KEYS = DELIVERY_AREAS.map((area) => area.key);

export function isDeliveryAreaKey(value: string): value is DeliveryAreaKey {
  return DELIVERY_AREA_KEYS.includes(value as DeliveryAreaKey);
}

export function getDeliveryAreaByKey(key: string): DeliveryArea | null {
  return DELIVERY_AREAS.find((area) => area.key === key) ?? null;
}

export function getDeliveryPriceNis(key: string): number | null {
  return getDeliveryAreaByKey(key)?.priceNis ?? null;
}

export function formatDeliveryPriceNis(
  priceNis: number,
  labels: { free: string; currency: string },
): string {
  if (priceNis === 0) {
    return labels.free;
  }

  return `${priceNis} ${labels.currency}`;
}
