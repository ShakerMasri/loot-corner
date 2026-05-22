export const DELIVERY_CURRENCY = "NIS";

export type DeliveryAreaKey =
  | "nablus_receive_point"
  | "west_bank_cities"
  | "jerusalem"
  | "lands_48"
  | "west_jerusalem_area";

export type DeliveryArea = {
  key: DeliveryAreaKey;
  labelEn: string;
  labelAr: string;
  priceNis: number;
  requiresCustomerAgreement: boolean;
  noteEn?: string;
  noteAr?: string;
};

export const DELIVERY_AREAS: DeliveryArea[] = [
  {
    key: "nablus_receive_point",
    labelEn: "Nablus receive point",
    labelAr: "نقطة استلام في نابلس",
    priceNis: 0,
    requiresCustomerAgreement: true,
    noteEn:
      "Free receive/pickup option in Nablus. The customer must agree or coordinate with the store owner on WhatsApp before receiving the order.",
    noteAr:
      "خيار استلام مجاني في نابلس. يجب على الزبون الموافقة أو التنسيق مع صاحب المتجر عبر واتساب قبل استلام الطلب.",
  },
  {
    key: "west_bank_cities",
    labelEn: "West Bank cities",
    labelAr: "مدن الضفة الغربية",
    priceNis: 20,
    requiresCustomerAgreement: false,
  },
  {
    key: "jerusalem",
    labelEn: "Jerusalem",
    labelAr: "القدس",
    priceNis: 30,
    requiresCustomerAgreement: false,
  },
  {
    key: "lands_48",
    labelEn: "48 lands",
    labelAr: "أراضي 48",
    priceNis: 70,
    requiresCustomerAgreement: false,
  },
  {
    key: "west_jerusalem_area",
    labelEn: "West Jerusalem, Ein Rafa, Ein Naqouba, Abu Ghosh",
    labelAr: "غرب القدس، عين رافا، عين نقوبا، أبو غوش",
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

export function formatDeliveryPriceNis(priceNis: number): string {
  if (priceNis === 0) {
    return "Free";
  }

  return `${priceNis} ${DELIVERY_CURRENCY}`;
}
