/*
 * MYRENT – Mock Data Layer
 * Simulates the database schema defined in the spec:
 * Users, Listings, Verifications
 */

export type UserRole = "Tenant" | "Landlord";
export type AccountStatus = "Pending" | "Verified" | "Flagged";
export type PropertyType = "Room" | "Flat" | "Full House" | "Shutter/Commercial";
export type AvailabilityStatus = "Available" | "Rented" | "Hidden";
export type DocumentType = "Citizenship Copy" | "Lalpurja/Land Certificate" | "Ward Utilities Bill";
export type AdminApprovalStatus = "Pending" | "Approved" | "Rejected";

export interface User {
  user_id: string;
  full_name: string;
  phone_number: string;
  email: string;
  user_role: UserRole;
  account_status: AccountStatus;
  joined_date: string;
}

export interface Verification {
  verification_id: string;
  property_id: string;
  document_type: DocumentType;
  admin_approval_status: AdminApprovalStatus;
}

export interface Listing {
  property_id: string;
  landlord_id: string;
  landlord_name: string;
  landlord_phone: string;
  title: string;
  property_type: PropertyType;
  price_npr: number;
  security_deposit_npr: number;
  location: string;
  ward: string;
  exact_address: string;
  amenities: string[];
  images: string[];
  date_listed: string;
  expiry_date: string;
  availability_status: AvailabilityStatus;
  view_count: number;
  report_count: number;
  is_verified: boolean;
  is_broker_free: boolean;
  water_availability: boolean;
  parking_bike: boolean;
  parking_car: boolean;
  electricity_submeter: boolean;
  bedrooms?: number;
  bathrooms?: number;
  area_sqft?: number;
  description: string;
  lat?: number;
  lng?: number;
}

export const KATHMANDU_LOCATIONS = [
  "New Baneshwor",
  "Jhamsikhel",
  "Kapan",
  "Koteshwor",
  "Lazimpat",
  "Thamel",
  "Baluwatar",
  "Maharajgunj",
  "Patan / Lalitpur",
  "Bhaktapur",
  "Kalanki",
  "Kirtipur",
  "Chabahil",
  "Budhanilkantha",
  "Boudha",
  "Sitapaila",
  "Nayabazar",
  "Swayambhu",
  "Gongabu",
  "Samakhusi",
  "Tokha",
  "Jorpati",
  "Sukedhara",
  "Bansbari",
  "Naxal",
  "Dillibazar",
  "Putalisadak",
  "Bagbazar",
  "Asan",
  "Indrachowk",
];

export const PROPERTY_TYPES: PropertyType[] = ["Room", "Flat", "Full House", "Shutter/Commercial"];

export const getDaysUntilExpiry = (expiryDate: string): number => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diff = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
};

export const formatNPR = (amount: number): string => {
  return `Rs. ${amount.toLocaleString("en-IN")}`;
};
