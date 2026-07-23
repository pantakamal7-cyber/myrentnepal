import { supabase } from "../supabaseClient";
import { nanoid } from "nanoid";
import { type DocumentType, type Listing, type PropertyType } from "./data";

const DEFAULT_EXPIRY_DAYS = 14;
const LOCAL_LISTINGS_KEY = "myrent:listings";

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

export interface CreateListingInput {
  full_name: string;
  phone: string;
  email: string;
  title: string;
  property_type: PropertyType;
  location: string;
  exact_address: string;
  price: number;
  deposit: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  description: string;
  amenities: string[];
  images?: string[];
  water: boolean;
  parking_bike: boolean;
  parking_car: boolean;
  submeter: boolean;
  broker_confirmed: boolean;
  doc_type: DocumentType;
}

const isBrowser = typeof window !== "undefined";

const sortListingsByNewest = (listings: Listing[]) =>
  [...listings].sort(
    (a, b) => new Date(b.date_listed).getTime() - new Date(a.date_listed).getTime(),
  );

const dedupeListings = (listings: Listing[]) =>
  Array.from(
    new Map(listings.filter((listing) => listing.property_id).map((listing) => [listing.property_id, listing])).values(),
  );

const readLocalListings = (): Listing[] => {
  if (!isBrowser) return [];

  try {
    const stored = window.localStorage.getItem(LOCAL_LISTINGS_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed.map((item) => normalizeListing(item as RawListing));
  } catch {
    return [];
  }
};

const persistLocalListing = (listing: Listing) => {
  if (!isBrowser) return;

  const merged = sortListingsByNewest(dedupeListings([listing, ...readLocalListings()]));
  window.localStorage.setItem(LOCAL_LISTINGS_KEY, JSON.stringify(merged));
};

const normalizeListing = (raw: RawListing): Listing => {
  const now = new Date();
  const defaultExpiry = new Date(now.getTime() + DEFAULT_EXPIRY_DAYS * 24 * 60 * 60 * 1000);

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
  const localListings = readLocalListings();
  const { data, error } = await supabase.from("Listing").select("*");
  if (error) {
    if (localListings.length > 0) return localListings;
    throw new Error(`Failed to fetch listings from Supabase: ${error.message}`);
  }
  if (!data || data.length === 0) return localListings;

  const remoteListings = data.map((item) => normalizeListing(item as RawListing));
  return sortListingsByNewest(dedupeListings([...remoteListings, ...localListings]));
}

export async function fetchListingById(id: string): Promise<Listing | undefined> {
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

  if (byId.error) {
    throw new Error(`Failed to fetch listing by id ${id} from Supabase: ${byId.error.message}`);
  }

  if (byId.data && byId.data.length > 0) {
    return normalizeListing(byId.data[0] as RawListing);
  }

  return readLocalListings().find((listing) => listing.property_id === id);
}

const buildListingRecord = (input: CreateListingInput): RawListing => {
  const now = new Date();
  const expiryDate = new Date(now.getTime() + DEFAULT_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
  const phoneDigits = input.phone.replace(/\D/g, "");
  const propertyId = `prop-${nanoid(10)}`;
  const landlordId = `landlord-${phoneDigits || nanoid(8)}`;

  return {
    property_id: propertyId,
    landlord_id: landlordId,
    landlord_name: input.full_name.trim(),
    landlord_phone: input.phone.trim(),
    full_name: input.full_name.trim(),
    phone: input.phone.trim(),
    phone_number: input.phone.trim(),
    email: input.email.trim(),
    title: input.title.trim(),
    property_type: input.property_type,
    type: input.property_type,
    price_npr: input.price,
    price: input.price,
    security_deposit_npr: input.deposit,
    deposit: input.deposit,
    location: input.location,
    ward: input.location,
    exact_address: input.exact_address.trim(),
    address: input.exact_address.trim(),
    amenities: input.amenities,
    images: input.images ?? [],
    date_listed: now.toISOString(),
    created_at: now.toISOString(),
    expiry_date: expiryDate.toISOString(),
    expiry: expiryDate.toISOString(),
    availability_status: "Available",
    availability: "Available",
    view_count: 0,
    report_count: 0,
    is_verified: false,
    is_broker_free: input.broker_confirmed,
    water_availability: input.water,
    water: input.water,
    parking_bike: input.parking_bike,
    parking_car: input.parking_car,
    electricity_submeter: input.submeter,
    submeter: input.submeter,
    bedrooms: input.bedrooms,
    bathrooms: input.bathrooms,
    area_sqft: input.area,
    area: input.area,
    description: input.description.trim(),
    document_type: input.doc_type,
  };
};

const buildInsertCandidates = (record: RawListing): RawListing[] => [
  {
    property_id: record.property_id,
    landlord_id: record.landlord_id,
    landlord_name: record.landlord_name,
    landlord_phone: record.landlord_phone,
    title: record.title,
    property_type: record.property_type,
    price_npr: record.price_npr,
    security_deposit_npr: record.security_deposit_npr,
    location: record.location,
    ward: record.ward,
    exact_address: record.exact_address,
    amenities: record.amenities,
    images: record.images,
    date_listed: record.date_listed,
    expiry_date: record.expiry_date,
    availability_status: record.availability_status,
    view_count: record.view_count,
    report_count: record.report_count,
    is_verified: record.is_verified,
    is_broker_free: record.is_broker_free,
    water_availability: record.water_availability,
    parking_bike: record.parking_bike,
    parking_car: record.parking_car,
    electricity_submeter: record.electricity_submeter,
    bedrooms: record.bedrooms,
    bathrooms: record.bathrooms,
    area_sqft: record.area_sqft,
    description: record.description,
  },
  {
    property_id: record.property_id,
    landlord_id: record.landlord_id,
    full_name: record.full_name,
    phone: record.phone,
    phone_number: record.phone_number,
    email: record.email,
    title: record.title,
    property_type: record.property_type,
    type: record.type,
    price: record.price,
    deposit: record.deposit,
    location: record.location,
    exact_address: record.exact_address,
    address: record.address,
    amenities: record.amenities,
    images: record.images,
    created_at: record.created_at,
    expiry: record.expiry,
    availability: record.availability,
    is_verified: record.is_verified,
    is_broker_free: record.is_broker_free,
    water: record.water,
    parking_bike: record.parking_bike,
    parking_car: record.parking_car,
    submeter: record.submeter,
    bedrooms: record.bedrooms,
    bathrooms: record.bathrooms,
    area: record.area,
    description: record.description,
    document_type: record.document_type,
  },
  {
    full_name: record.full_name,
    phone: record.phone,
    email: record.email,
    title: record.title,
    property_type: record.property_type,
    price: record.price,
    deposit: record.deposit,
    location: record.location,
    exact_address: record.exact_address,
    amenities: record.amenities,
    images: record.images,
    is_verified: record.is_verified,
    is_broker_free: record.is_broker_free,
    water: record.water,
    parking_bike: record.parking_bike,
    parking_car: record.parking_car,
    submeter: record.submeter,
    bedrooms: record.bedrooms,
    bathrooms: record.bathrooms,
    area: record.area,
    description: record.description,
  },
  {
    landlord_name: record.landlord_name,
    landlord_phone: record.landlord_phone,
    title: record.title,
    property_type: record.property_type,
    price_npr: record.price_npr,
    security_deposit_npr: record.security_deposit_npr,
    location: record.location,
    exact_address: record.exact_address,
    amenities: record.amenities,
    images: record.images,
    availability_status: record.availability_status,
    is_verified: record.is_verified,
    is_broker_free: record.is_broker_free,
    water_availability: record.water_availability,
    parking_bike: record.parking_bike,
    parking_car: record.parking_car,
    electricity_submeter: record.electricity_submeter,
    bedrooms: record.bedrooms,
    bathrooms: record.bathrooms,
    area_sqft: record.area_sqft,
    description: record.description,
  },
];

export async function createListing(input: CreateListingInput): Promise<Listing> {
  const record = buildListingRecord(input);
  let lastError: Error | null = null;

  for (const candidate of buildInsertCandidates(record)) {
    const { data, error } = await supabase.from("Listing").insert([candidate]).select("*").maybeSingle();

    if (!error) {
      const createdListing = normalizeListing((data as RawListing | null) ?? candidate);
      persistLocalListing(createdListing);
      return createdListing;
    }

    lastError = new Error(error.message);
  }

  if (lastError) {
    throw lastError;
  }

  throw new Error("Failed to create listing.");
}
