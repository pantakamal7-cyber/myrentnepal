import { supabase } from "../supabaseClient";
import { type Listing } from "./data";

const toBoolean = (value: unknown, fallback = false): boolean => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true") return true;
    if (normalized === "false") return false;
  }
  return fallback;
};

const toNumber = (value: unknown, fallback = 0): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const toStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter(Boolean).map((item) => String(item)) : [];

const toDateOnly = (value: unknown, fallbackDate: Date): string => {
  const date = value ? new Date(String(value)) : fallbackDate;
  if (Number.isNaN(date.getTime())) return fallbackDate.toISOString().slice(0, 10);
  return date.toISOString().slice(0, 10);
};

type RawListing = Record<string, unknown>;

const normalizeListing = (raw: RawListing): Listing => {
  const now = new Date();
  const defaultExpiry = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

  return {
    property_id: String(raw?.property_id ?? raw?.id ?? ""),
    landlord_id: String(raw?.landlord_id ?? raw?.user_id ?? ""),
    landlord_name: String(raw?.landlord_name ?? raw?.full_name ?? "Property Owner"),
    landlord_phone: String(raw?.landlord_phone ?? raw?.phone ?? raw?.phone_number ?? ""),
    title: String(raw?.title ?? "Untitled Property"),
    property_type: String(raw?.property_type ?? raw?.type ?? "Flat") as Listing["property_type"],
    price_npr: toNumber(raw?.price_npr ?? raw?.price, 0),
    security_deposit_npr: toNumber(raw?.security_deposit_npr ?? raw?.deposit, 0),
    location: String(raw?.location ?? "Kathmandu"),
    ward: String(raw?.ward ?? ""),
    exact_address: String(raw?.exact_address ?? raw?.address ?? ""),
    amenities: toStringArray(raw?.amenities),
    images: toStringArray(raw?.images),
    date_listed: toDateOnly(raw?.date_listed ?? raw?.created_at, now),
    expiry_date: toDateOnly(raw?.expiry_date ?? raw?.expiry, defaultExpiry),
    availability_status: String(raw?.availability_status ?? raw?.availability ?? raw?.status ?? "Available") as Listing["availability_status"],
    view_count: toNumber(raw?.view_count, 0),
    report_count: toNumber(raw?.report_count, 0),
    is_verified: toBoolean(raw?.is_verified, false),
    is_broker_free: toBoolean(raw?.is_broker_free, true),
    water_availability: toBoolean(raw?.water_availability, false),
    parking_bike: toBoolean(raw?.parking_bike, false),
    parking_car: toBoolean(raw?.parking_car, false),
    electricity_submeter: toBoolean(raw?.electricity_submeter ?? raw?.submeter, false),
    bedrooms: raw?.bedrooms == null ? undefined : toNumber(raw?.bedrooms),
    bathrooms: raw?.bathrooms == null ? undefined : toNumber(raw?.bathrooms),
    area_sqft: raw?.area_sqft == null ? undefined : toNumber(raw?.area_sqft),
    description: String(raw?.description ?? ""),
    lat: raw?.lat == null ? undefined : toNumber(raw?.lat),
    lng: raw?.lng == null ? undefined : toNumber(raw?.lng),
  };
};

export async function fetchListings(): Promise<Listing[]> {
  const { data, error } = await supabase.from("Listing").select("*");
  if (error) {
    throw new Error(`Failed to fetch listings from Supabase: ${error.message}`);
  }
  if (!data || data.length === 0) return [];
  return data.map((item) => normalizeListing(item as RawListing));
}

export async function fetchListingById(id: string): Promise<Listing | undefined> {
  try {
    const byPropertyId = await supabase
      .from("Listing")
      .select("*")
      .eq("property_id", id)
      .limit(1);

    if (!byPropertyId.error && byPropertyId.data && byPropertyId.data.length > 0) {
      return normalizeListing(byPropertyId.data[0] as RawListing);
    }

    const byId = await supabase
      .from("Listing")
      .select("*")
      .eq("id", id)
      .limit(1);

    if (!byId.error && byId.data && byId.data.length > 0) {
      return normalizeListing(byId.data[0] as RawListing);
    }
  } catch (e) {
    console.warn(`Failed to fetch listing by id ${id} from Supabase:`, e);
  }

  return undefined;
}
