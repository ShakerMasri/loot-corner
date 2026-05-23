"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAppPreferences } from "~/components/providers/AppPreferencesProvider";
import { OptimizedImage } from "~/components/ui/OptimizedImage";
import { formatDeliveryPriceNis, type DeliveryAreaKey } from "~/lib/delivery";

type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

type PaymentStatus = "UNPAID" | "PAID";

type OrderItem = {
  id: string;
  quantity: number;
  priceAtPurchase: string;
  subtotalAmount: string;
  productNameAtPurchase: string;
  productSlugAtPurchase: string;
  productImagesAtPurchase: string[];
};

type AdminOrder = {
  id: string;
  status: OrderStatus;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  totalAmount: string;
  adminNote: string | null;
  customerNameAtPurchase: string | null;
  customerEmailAtPurchase: string | null;
  customerPhoneAtPurchase: string | null;
  deliveryAreaKey: DeliveryAreaKey | null;
  deliveryPrice: string;
  deliveryCity: string | null;
  deliveryAddress: string | null;
  deliveryNotes: string | null;
  pickupAgreementAccepted: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string | null;
    email: string;
  };
  items: OrderItem[];
};

type AdminOrdersResponse = {
  orders?: AdminOrder[];
  message?: string;
};

type UpdateResponse = {
  order?: AdminOrder;
  message?: string;
};

const orderStatuses: OrderStatus[] = [
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

const paymentStatuses: PaymentStatus[] = ["UNPAID", "PAID"];

const statusStyles: Record<OrderStatus, string> = {
  PENDING:
    "bg-yellow-50 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200",
  PROCESSING: "bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200",
  SHIPPED:
    "bg-purple-50 text-purple-800 dark:bg-purple-950 dark:text-purple-200",
  DELIVERED: "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200",
  CANCELLED: "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200",
};

const paymentStatusStyles: Record<PaymentStatus, string> = {
  UNPAID:
    "bg-orange-50 text-orange-800 dark:bg-orange-950 dark:text-orange-200",
  PAID: "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200",
};

function formatPrice(price: string | number, currency: string) {
  return `${Number(price).toFixed(2)} ${currency}`;
}

function formatDate(date: string, language: "en" | "ar") {
  return new Intl.DateTimeFormat(language, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function formatFallbackLabel(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function AdminOrdersClient() {
  const { t, language } = useAppPreferences();

  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});

  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, order) => {
      if (order.status === "CANCELLED") {
        return sum;
      }

      return sum + Number(order.totalAmount);
    }, 0);
  }, [orders]);

  const pendingCount = useMemo(() => {
    return orders.filter((order) => order.status === "PENDING").length;
  }, [orders]);

  const unpaidCount = useMemo(() => {
    return orders.filter((order) => order.paymentStatus === "UNPAID").length;
  }, [orders]);

  function getOrderStatusLabel(status: OrderStatus) {
    return t.admin.orders.statuses[status] ?? formatFallbackLabel(status);
  }

  function getPaymentStatusLabel(status: PaymentStatus) {
    return (
      t.admin.orders.paymentStatuses[status] ?? formatFallbackLabel(status)
    );
  }

  function getUnpaidNotice(count: number) {
    return t.admin.orders.unpaidNotice
      .replace("{count}", String(count))
      .replace("{plural}", count === 1 ? "" : "s");
  }

  function getDeliveryAreaLabel(deliveryAreaKey: DeliveryAreaKey | null) {
    if (!deliveryAreaKey) {
      return t.admin.orders.notProvided;
    }

    return (
      t.delivery.areas[deliveryAreaKey]?.label ??
      formatFallbackLabel(deliveryAreaKey)
    );
  }

  async function loadOrders() {
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/orders");
      const data = (await response.json()) as AdminOrdersResponse;

      if (!response.ok) {
        setOrders([]);
        setMessage(data.message ?? t.admin.orders.failedToLoad);
        return;
      }

      const nextOrders = data.orders ?? [];

      setOrders(nextOrders);

      setNoteDrafts(
        Object.fromEntries(
          nextOrders.map((order) => [order.id, order.adminNote ?? ""]),
        ),
      );
    } catch {
      setOrders([]);
      setMessage(t.admin.orders.failedToConnect);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateOrderStatus(orderId: string, status: OrderStatus) {
    setUpdatingOrderId(orderId);
    setMessage("");

    try {
      const response = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = (await response.json()) as UpdateResponse;

      if (!response.ok) {
        setMessage(data.message ?? t.admin.orders.failedToUpdateStatus);
        return;
      }

      await loadOrders();
    } catch {
      setMessage(t.admin.orders.failedToConnect);
    } finally {
      setUpdatingOrderId(null);
    }
  }

  async function updatePaymentStatus(
    orderId: string,
    paymentStatus: PaymentStatus,
  ) {
    setUpdatingOrderId(orderId);
    setMessage("");

    try {
      const response = await fetch(`/api/admin/orders/${orderId}/payment`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentStatus }),
      });

      const data = (await response.json()) as UpdateResponse;

      if (!response.ok) {
        setMessage(data.message ?? t.admin.orders.failedToUpdatePayment);
        return;
      }

      await loadOrders();
    } catch {
      setMessage(t.admin.orders.failedToConnect);
    } finally {
      setUpdatingOrderId(null);
    }
  }

  async function saveAdminNote(orderId: string) {
    setUpdatingOrderId(orderId);
    setMessage("");

    try {
      const response = await fetch(`/api/admin/orders/${orderId}/note`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminNote: noteDrafts[orderId] ?? "",
        }),
      });

      const data = (await response.json()) as UpdateResponse;

      if (!response.ok) {
        setMessage(data.message ?? t.admin.orders.failedToSaveNote);
        return;
      }

      await loadOrders();
    } catch {
      setMessage(t.admin.orders.failedToConnect);
    } finally {
      setUpdatingOrderId(null);
    }
  }

  useEffect(() => {
    void loadOrders();
    // Load once on mount. Language changes only affect labels.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <section className="space-y-6">
        <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="h-8 w-52 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-24 animate-pulse rounded-3xl bg-zinc-200 dark:bg-zinc-800"
            />
          ))}
        </div>

        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-72 animate-pulse rounded-3xl bg-zinc-200 dark:bg-zinc-800"
            />
          ))}
        </div>
      </section>
    );
  }

  if (message && orders.length === 0) {
    return (
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-2xl font-black text-zinc-950 dark:text-white">
          {t.admin.orders.unavailableTitle}
        </h1>

        <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {message}
        </p>

        <button
          type="button"
          onClick={() => void loadOrders()}
          className="mt-6 rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          {t.admin.orders.tryAgain}
        </button>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-wide text-orange-600 uppercase dark:text-orange-400">
              {t.admin.orders.badge}
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl dark:text-white">
              {t.admin.orders.title}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {t.admin.orders.description}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href="/admin"
              className="rounded-full border border-zinc-300 px-4 py-2 text-center text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-950"
            >
              {t.admin.orders.dashboard}
            </Link>

            <button
              type="button"
              onClick={() => void loadOrders()}
              className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              {t.admin.orders.refresh}
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {t.admin.orders.totalOrders}
          </p>
          <p className="mt-2 text-2xl font-black text-zinc-950 dark:text-white">
            {orders.length}
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {t.admin.orders.pendingOrders}
          </p>
          <p className="mt-2 text-2xl font-black text-zinc-950 dark:text-white">
            {pendingCount}
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {t.admin.orders.revenueExcludingCancelled}
          </p>
          <p className="mt-2 text-2xl font-black text-zinc-950 dark:text-white">
            {formatPrice(totalRevenue, t.delivery.currency)}
          </p>
        </div>
      </div>

      {unpaidCount > 0 && (
        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4 text-sm font-medium text-orange-800 dark:border-orange-900 dark:bg-orange-950 dark:text-orange-200">
          {getUnpaidNotice(unpaidCount)}
        </div>
      )}

      {message && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {message}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-black text-zinc-950 dark:text-white">
            {t.admin.orders.noOrdersTitle}
          </h2>

          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {t.admin.orders.noOrdersDescription}
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => {
            const isUpdating = updatingOrderId === order.id;

            return (
              <article
                key={order.id}
                className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="border-b border-zinc-200 p-5 sm:p-6 dark:border-zinc-800">
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
                        {t.admin.orders.order}
                      </p>

                      <h2 className="mt-1 max-w-full truncate font-mono text-sm font-bold text-zinc-950 dark:text-white">
                        {order.id}
                      </h2>

                      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        {t.admin.orders.placed}{" "}
                        {formatDate(order.createdAt, language)}
                      </p>

                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                        {t.admin.orders.customer}:{" "}
                        <span className="font-semibold text-zinc-950 dark:text-white">
                          {order.customerNameAtPurchase ??
                            order.user.name ??
                            t.admin.orders.unnamedCustomer}
                        </span>{" "}
                        · {order.customerEmailAtPurchase ?? order.user.email}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[order.status]}`}
                      >
                        {getOrderStatusLabel(order.status)}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${paymentStatusStyles[order.paymentStatus]}`}
                      >
                        {getPaymentStatusLabel(order.paymentStatus)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 text-sm md:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-950">
                      <p className="text-zinc-500 dark:text-zinc-400">
                        {t.admin.orders.total}
                      </p>
                      <p className="mt-1 font-black text-zinc-950 dark:text-white">
                        {formatPrice(order.totalAmount, t.delivery.currency)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-950">
                      <p className="text-zinc-500 dark:text-zinc-400">
                        {t.admin.orders.deliveryPrice}
                      </p>
                      <p className="mt-1 font-semibold text-zinc-950 dark:text-white">
                        {formatDeliveryPriceNis(Number(order.deliveryPrice), {
                          free: t.delivery.free,
                          currency: t.delivery.currency,
                        })}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-950">
                      <label
                        htmlFor={`status-${order.id}`}
                        className="text-zinc-500 dark:text-zinc-400"
                      >
                        {t.admin.orders.orderStatus}
                      </label>

                      <select
                        id={`status-${order.id}`}
                        value={order.status}
                        disabled={isUpdating}
                        onChange={(event) =>
                          void updateOrderStatus(
                            order.id,
                            event.target.value as OrderStatus,
                          )
                        }
                        className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm font-semibold text-zinc-950 outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-orange-400 dark:focus:ring-orange-950"
                      >
                        {orderStatuses.map((status) => (
                          <option key={status} value={status}>
                            {getOrderStatusLabel(status)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-950">
                      <label
                        htmlFor={`payment-${order.id}`}
                        className="text-zinc-500 dark:text-zinc-400"
                      >
                        {t.admin.orders.paymentStatus}
                      </label>

                      <select
                        id={`payment-${order.id}`}
                        value={order.paymentStatus}
                        disabled={isUpdating}
                        onChange={(event) =>
                          void updatePaymentStatus(
                            order.id,
                            event.target.value as PaymentStatus,
                          )
                        }
                        className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm font-semibold text-zinc-950 outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-orange-400 dark:focus:ring-orange-950"
                      >
                        {paymentStatuses.map((status) => (
                          <option key={status} value={status}>
                            {getPaymentStatusLabel(status)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[1fr_320px]">
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
                      {t.admin.orders.items}
                    </h3>

                    <div className="divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
                      {order.items.map((item) => {
                        const image = item.productImagesAtPurchase.at(0);

                        return (
                          <div
                            key={item.id}
                            className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
                          >
                            <Link
                              href={`/products/${item.productSlugAtPurchase}`}
                              className="relative h-20 w-full shrink-0 overflow-hidden rounded-xl bg-zinc-100 sm:w-20 dark:bg-zinc-800"
                            >
                              {image ? (
                                <OptimizedImage
                                  src={image}
                                  alt={item.productNameAtPurchase}
                                  sizes="80px"
                                  className="object-cover"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center text-xs text-zinc-500 dark:text-zinc-400">
                                  {t.admin.orders.noImage}
                                </div>
                              )}
                            </Link>

                            <div className="min-w-0 flex-1">
                              <Link
                                href={`/products/${item.productSlugAtPurchase}`}
                                className="font-semibold text-zinc-950 transition hover:text-orange-600 dark:text-white dark:hover:text-orange-400"
                              >
                                {item.productNameAtPurchase}
                              </Link>

                              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                                {item.quantity} ×{" "}
                                {formatPrice(
                                  item.priceAtPurchase,
                                  t.delivery.currency,
                                )}
                              </p>
                            </div>

                            <p className="font-black text-zinc-950 dark:text-white">
                              {formatPrice(
                                item.subtotalAmount,
                                t.delivery.currency,
                              )}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-950">
                      <h3 className="font-bold text-zinc-950 dark:text-white">
                        {t.admin.orders.contactDetails}
                      </h3>

                      <dl className="mt-3 space-y-3">
                        <div>
                          <dt className="text-zinc-500 dark:text-zinc-400">
                            {t.admin.orders.customerName}
                          </dt>
                          <dd className="mt-1 font-semibold text-zinc-950 dark:text-white">
                            {order.customerNameAtPurchase ??
                              order.user.name ??
                              t.admin.orders.notProvided}
                          </dd>
                        </div>

                        <div>
                          <dt className="text-zinc-500 dark:text-zinc-400">
                            {t.admin.orders.customerEmail}
                          </dt>
                          <dd className="mt-1 font-semibold break-words text-zinc-950 dark:text-white">
                            {order.customerEmailAtPurchase ?? order.user.email}
                          </dd>
                        </div>

                        <div>
                          <dt className="text-zinc-500 dark:text-zinc-400">
                            {t.admin.orders.customerPhone}
                          </dt>
                          <dd className="mt-1 font-semibold text-zinc-950 dark:text-white">
                            {order.customerPhoneAtPurchase ??
                              t.admin.orders.notProvided}
                          </dd>
                        </div>
                      </dl>
                    </section>

                    <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-950">
                      <h3 className="font-bold text-zinc-950 dark:text-white">
                        {t.admin.orders.deliveryDetails}
                      </h3>

                      <dl className="mt-3 space-y-3">
                        <div>
                          <dt className="text-zinc-500 dark:text-zinc-400">
                            {t.admin.orders.deliveryArea}
                          </dt>
                          <dd className="mt-1 font-semibold text-zinc-950 dark:text-white">
                            {getDeliveryAreaLabel(order.deliveryAreaKey)}
                          </dd>
                        </div>

                        <div>
                          <dt className="text-zinc-500 dark:text-zinc-400">
                            {t.admin.orders.deliveryCity}
                          </dt>
                          <dd className="mt-1 font-semibold text-zinc-950 dark:text-white">
                            {order.deliveryCity ?? t.admin.orders.notProvided}
                          </dd>
                        </div>

                        <div>
                          <dt className="text-zinc-500 dark:text-zinc-400">
                            {t.admin.orders.deliveryAddress}
                          </dt>
                          <dd className="mt-1 font-semibold whitespace-pre-wrap text-zinc-950 dark:text-white">
                            {order.deliveryAddress ??
                              t.admin.orders.notProvided}
                          </dd>
                        </div>

                        <div>
                          <dt className="text-zinc-500 dark:text-zinc-400">
                            {t.admin.orders.pickupAgreement}
                          </dt>
                          <dd className="mt-1 font-semibold text-zinc-950 dark:text-white">
                            {order.deliveryAreaKey === "nablus_receive_point"
                              ? order.pickupAgreementAccepted
                                ? t.admin.orders.yes
                                : t.admin.orders.notProvided
                              : t.admin.orders.notRequired}
                          </dd>
                        </div>

                        {order.deliveryNotes ? (
                          <div>
                            <dt className="text-zinc-500 dark:text-zinc-400">
                              {t.admin.orders.deliveryNotes}
                            </dt>
                            <dd className="mt-1 font-semibold whitespace-pre-wrap text-zinc-950 dark:text-white">
                              {order.deliveryNotes}
                            </dd>
                          </div>
                        ) : null}
                      </dl>
                    </section>

                    <div>
                      <label
                        htmlFor={`note-${order.id}`}
                        className="text-sm font-bold tracking-wide text-zinc-500 uppercase dark:text-zinc-400"
                      >
                        {t.admin.orders.adminNote}
                      </label>

                      <textarea
                        id={`note-${order.id}`}
                        value={noteDrafts[order.id] ?? ""}
                        onChange={(event) =>
                          setNoteDrafts((current) => ({
                            ...current,
                            [order.id]: event.target.value,
                          }))
                        }
                        placeholder={t.admin.orders.adminNotePlaceholder}
                        rows={6}
                        className="mt-3 w-full resize-none rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 transition outline-none placeholder:text-zinc-400 focus:border-orange-600 focus:ring-4 focus:ring-orange-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-orange-400 dark:focus:ring-orange-950"
                      />

                      <button
                        type="button"
                        disabled={isUpdating}
                        onClick={() => void saveAdminNote(order.id)}
                        className="mt-3 w-full rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                      >
                        {isUpdating
                          ? t.admin.orders.saving
                          : t.admin.orders.saveNote}
                      </button>

                      <p className="mt-3 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                        {t.admin.orders.noteWarning}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
