import { supabase } from "../supabaseClient";
import { type Listing, MOCK_LISTINGS } from "./data";

export async function fetchListings(): Promise<Listing[]> {
  try {
    const { data, error } = await supabase.from("Listing").select("*");
    if (error || !data || data.length === 0) {
      console.warn("Supabase fetch failed, using mock data:", error?.message);
      return MOCK_LISTINGS;
    }
    return data as Listing[];
  } catch (e) {
    console.warn("Supabase error, using mock data:", e);
    return MOCK_LISTINGS;
  }
}

export async function fetchListingById(id: string): Promise<Listing | undefined> {
  try {
    const { data, error } = await supabase
      .from("Listing")
      .select("*")
      .eq("property_id", id)
      .single();

    if (error || !data) return MOCK_LISTINGS.find((l) => l.property_id === id);
    return data as Listing;
  } catch {
    return MOCK_LISTINGS.find((l) => l.property_id === id);
  }
}
