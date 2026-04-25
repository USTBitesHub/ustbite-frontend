import { apiClient } from "./apiClient";
import type { Order, PlaceOrderPayload, ApiResponse } from "@/types";

// ─── Frontend → Backend payload transformer ───────────────────────────────────

// Frontend: "UPI" | "Card" | "Cash on Delivery"
// Backend enum: "UPI" | "CARD" | "CASH_ON_DELIVERY"
const METHOD_MAP: Record<string, string> = {
  "UPI":              "UPI",
  "Card":             "CARD",
  "Cash on Delivery": "CASH_ON_DELIVERY",
};

function toBackendOrder(payload: PlaceOrderPayload): Record<string, unknown> {
  return {
    restaurant_id:           payload.restaurantId,
    restaurant_name_snapshot: payload.restaurantName,
    total_amount:            payload.total,
    delivery_floor:          payload.floor,
    delivery_wing:           payload.wing,
    special_instructions:    payload.specialInstructions ?? null,
    payment_method:          METHOD_MAP[payload.paymentMethod] ?? "UPI",
    items: payload.items.map((item) => ({
      menu_item_id:         item.menuItemId,
      item_name_snapshot:   item.name,
      item_price_snapshot:  item.price,
      quantity:             item.qty,
      subtotal:             parseFloat((item.price * item.qty).toFixed(2)),
    })),
  };
}

// ─── Backend → Frontend response transformer ─────────────────────────────────

function toOrder(raw: Record<string, unknown>): Order {
  return {
    id:                  raw.id as string,
    restaurantId:        raw.restaurant_id as string,
    restaurantName:      raw.restaurant_name_snapshot as string,
    items:               ((raw.items ?? []) as Record<string, unknown>[]).map((i) => ({
      name:  i.item_name_snapshot as string,
      qty:   i.quantity as number,
      price: parseFloat(String(i.item_price_snapshot ?? 0)),
    })),
    subtotal:            parseFloat(String(raw.total_amount ?? 0)),
    deliveryFee:         0,
    total:               parseFloat(String(raw.total_amount ?? 0)),
    status:              raw.status as Order["status"],
    placedAt:            raw.created_at as string,
    estimatedDelivery:   raw.updated_at as string ?? raw.created_at as string,
    floor:               (raw.delivery_floor as string) ?? "",
    wing:                (raw.delivery_wing as string) ?? "",
    paymentMethod:       "UPI",  // backend doesn't return this in OrderResponse
    specialInstructions: raw.special_instructions as string | undefined,
  };
}

// ─── Service calls ────────────────────────────────────────────────────────────

export const orderService = {
  place: async (payload: PlaceOrderPayload): Promise<Order> => {
    const res = await apiClient.post<ApiResponse<Record<string, unknown>>>(
      "/orders",
      toBackendOrder(payload)
    );
    return toOrder(res.data.data);
  },

  getById: async (id: string): Promise<Order> => {
    const res = await apiClient.get<ApiResponse<Record<string, unknown>>>(`/orders/${id}`);
    return toOrder(res.data.data);
  },

  track: async (id: string): Promise<Order | undefined> => {
    try {
      const res = await apiClient.get<ApiResponse<Record<string, unknown>>>(`/orders/${id}/track`);
      return toOrder(res.data.data);
    } catch {
      return undefined;
    }
  },

  myOrders: async (): Promise<Order[]> => {
    const res = await apiClient.get<ApiResponse<Record<string, unknown>[]>>("/orders/me");
    return res.data.data.map(toOrder);
  },
};
