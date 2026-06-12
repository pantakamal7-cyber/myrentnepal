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

export const MOCK_LISTINGS: Listing[] = [
  {
    property_id: "prop-001",
    landlord_id: "user-101",
    landlord_name: "Ram Bahadur Shrestha",
    landlord_phone: "+977-9841234567",
    title: "Bright 2BHK Flat in New Baneshwor",
    property_type: "Flat",
    price_npr: 25000,
    security_deposit_npr: 25000,
    location: "New Baneshwor",
    ward: "Ward 10, Kathmandu Metropolitan",
    exact_address: "Shrestha Bhawan, New Baneshwor Chowk, Near Everest Bank",
    amenities: ["WiFi", "Kitchen", "Balcony", "Sunlight", "Furnished"],
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663755386170/8e4NgY2DZA8BzBnmerH6zW/property_flat-k9RdXoL8964gtbQwCfzx7N.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663755386170/8e4NgY2DZA8BzBnmerH6zW/property_room-97thervvkFxgwxbfyeF6ZH.webp",
    ],
    date_listed: "2026-06-01",
    expiry_date: "2026-06-15",
    availability_status: "Available",
    view_count: 142,
    report_count: 0,
    is_verified: true,
    is_broker_free: true,
    water_availability: true,
    parking_bike: true,
    parking_car: false,
    electricity_submeter: true,
    bedrooms: 2,
    bathrooms: 1,
    area_sqft: 850,
    description: "Spacious 2-bedroom flat on the 3rd floor with excellent natural light. Located just 5 minutes walk from New Baneshwor Chowk. The flat comes semi-furnished with a modern kitchen, attached bathroom, and a balcony with city views. Water is available 24/7 via tanker supply. Electricity sub-meter installed — you pay only what you use.",
    lat: 27.6933,
    lng: 85.3388,
  },
  {
    property_id: "prop-002",
    landlord_id: "user-102",
    landlord_name: "Sita Devi Tamang",
    landlord_phone: "+977-9851234568",
    title: "Single Room for Rent – Jhamsikhel",
    property_type: "Room",
    price_npr: 8500,
    security_deposit_npr: 8500,
    location: "Jhamsikhel",
    ward: "Ward 15, Lalitpur Metropolitan",
    exact_address: "Tamang Sadan, Jhamsikhel Road, Near Jhamsikhel Chowk",
    amenities: ["Attached Bathroom", "Window", "Sunlight"],
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663755386170/8e4NgY2DZA8BzBnmerH6zW/property_room-97thervvkFxgwxbfyeF6ZH.webp",
    ],
    date_listed: "2026-06-05",
    expiry_date: "2026-06-19",
    availability_status: "Available",
    view_count: 89,
    report_count: 0,
    is_verified: true,
    is_broker_free: true,
    water_availability: true,
    parking_bike: true,
    parking_car: false,
    electricity_submeter: false,
    bedrooms: 1,
    bathrooms: 1,
    area_sqft: 180,
    description: "Clean single room with attached bathroom on the ground floor. Ideal for a working professional or student. Located in a quiet residential area of Jhamsikhel, 10 minutes from Patan Dhoka. Water available daily from 6am-9am. Shared kitchen available.",
    lat: 27.6817,
    lng: 85.3144,
  },
  {
    property_id: "prop-003",
    landlord_id: "user-103",
    landlord_name: "Bikash Maharjan",
    landlord_phone: "+977-9861234569",
    title: "Traditional Newari Full House – Kapan",
    property_type: "Full House",
    price_npr: 55000,
    security_deposit_npr: 110000,
    location: "Kapan",
    ward: "Ward 5, Budhanilkantha Municipality",
    exact_address: "Maharjan Tole, Kapan Chowk, Near Kapan Monastery",
    amenities: ["Garden", "Parking", "4 Bedrooms", "2 Bathrooms", "Rooftop", "Storage"],
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663755386170/8e4NgY2DZA8BzBnmerH6zW/property_house-jciBQvGVqXqghBvHwqudo8.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663755386170/8e4NgY2DZA8BzBnmerH6zW/property_flat-k9RdXoL8964gtbQwCfzx7N.webp",
    ],
    date_listed: "2026-06-03",
    expiry_date: "2026-06-17",
    availability_status: "Available",
    view_count: 203,
    report_count: 0,
    is_verified: true,
    is_broker_free: true,
    water_availability: true,
    parking_bike: true,
    parking_car: true,
    electricity_submeter: true,
    bedrooms: 4,
    bathrooms: 2,
    area_sqft: 2200,
    description: "A beautifully preserved traditional Newari house with a private courtyard garden. Three floors with 4 bedrooms, 2 bathrooms, a large kitchen, and a rooftop terrace with Himalayan views. Car parking available. Ideal for a family. Water available 24/7 from borewell. All utilities on separate sub-meters.",
    lat: 27.7363,
    lng: 85.3535,
  },
  {
    property_id: "prop-004",
    landlord_id: "user-104",
    landlord_name: "Anita Gurung",
    landlord_phone: "+977-9871234570",
    title: "Commercial Shutter Space – Koteshwor",
    property_type: "Shutter/Commercial",
    price_npr: 35000,
    security_deposit_npr: 70000,
    location: "Koteshwor",
    ward: "Ward 32, Kathmandu Metropolitan",
    exact_address: "Gurung Complex, Koteshwor Ring Road, Near Koteshwor Chowk",
    amenities: ["Ground Floor", "High Ceiling", "3-Phase Power", "Loading Area"],
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663755386170/8e4NgY2DZA8BzBnmerH6zW/property_commercial-dv9MZTaiv6jxJAqn3HD8bH.webp",
    ],
    date_listed: "2026-06-08",
    expiry_date: "2026-06-22",
    availability_status: "Available",
    view_count: 67,
    report_count: 0,
    is_verified: true,
    is_broker_free: true,
    water_availability: true,
    parking_bike: true,
    parking_car: true,
    electricity_submeter: true,
    area_sqft: 450,
    description: "Prime commercial shutter space on the Ring Road with excellent footfall. Ground floor with 12-foot ceiling height. 3-phase power connection available. Loading/unloading area at the back. Suitable for retail, workshop, or storage. CCTV coverage in the building.",
    lat: 27.6837,
    lng: 85.3562,
  },
  {
    property_id: "prop-005",
    landlord_id: "user-105",
    landlord_name: "Deepak Karki",
    landlord_phone: "+977-9841234571",
    title: "Modern 1BHK Flat – Lazimpat",
    property_type: "Flat",
    price_npr: 18000,
    security_deposit_npr: 18000,
    location: "Lazimpat",
    ward: "Ward 2, Kathmandu Metropolitan",
    exact_address: "Karki Apartment, Lazimpat Road, Near French Embassy",
    amenities: ["WiFi Ready", "Modular Kitchen", "Elevator", "Security Guard", "Parking"],
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663755386170/8e4NgY2DZA8BzBnmerH6zW/property_flat-k9RdXoL8964gtbQwCfzx7N.webp",
    ],
    date_listed: "2026-06-10",
    expiry_date: "2026-06-24",
    availability_status: "Available",
    view_count: 118,
    report_count: 0,
    is_verified: false,
    is_broker_free: true,
    water_availability: true,
    parking_bike: true,
    parking_car: false,
    electricity_submeter: true,
    bedrooms: 1,
    bathrooms: 1,
    area_sqft: 600,
    description: "Modern 1-bedroom flat in a newly constructed apartment building in the heart of Lazimpat. Modular kitchen, elevator access, 24-hour security. Walking distance to embassies, restaurants, and supermarkets. Verification documents submitted and under admin review.",
    lat: 27.7172,
    lng: 85.3240,
  },
  {
    property_id: "prop-006",
    landlord_id: "user-106",
    landlord_name: "Prem Thapa",
    landlord_phone: "+977-9851234572",
    title: "Budget Room – Boudha Area",
    property_type: "Room",
    price_npr: 6000,
    security_deposit_npr: 6000,
    location: "Boudha",
    ward: "Ward 6, Kathmandu Metropolitan",
    exact_address: "Thapa Bhawan, Boudha Sadak, Near Boudhanath Stupa",
    amenities: ["Shared Kitchen", "Roof Access", "Near Stupa"],
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663755386170/8e4NgY2DZA8BzBnmerH6zW/property_room-97thervvkFxgwxbfyeF6ZH.webp",
    ],
    date_listed: "2026-06-09",
    expiry_date: "2026-06-23",
    availability_status: "Available",
    view_count: 54,
    report_count: 1,
    is_verified: true,
    is_broker_free: true,
    water_availability: false,
    parking_bike: true,
    parking_car: false,
    electricity_submeter: false,
    bedrooms: 1,
    bathrooms: 0,
    area_sqft: 150,
    description: "Affordable single room near the famous Boudhanath Stupa. Shared bathroom and kitchen. Rooftop access with stupa views. Ideal for students, meditators, or budget travelers. Water available via tanker 3 times a week. Electricity shared — flat rate Rs. 500/month.",
    lat: 27.7215,
    lng: 85.3620,
  },
];

export const getDaysUntilExpiry = (expiryDate: string): number => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diff = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
};

export const formatNPR = (amount: number): string => {
  return `Rs. ${amount.toLocaleString("en-IN")}`;
};
