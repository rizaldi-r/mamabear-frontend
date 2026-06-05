/**
 * Represents a basic administrative region (e.g., Province or City).
 * Based on the generic address response.
 */
export interface Region {
  id: number;
  name: string;
}

/**
 * Represents a subdistrict (Kecamatan/Kelurahan) search result.
 * Includes postal code information.
 */
export interface Subdistrict {
  id: number;
  name: string;
  zip_code: string;
}

/**
 * Represents a shipping service option and its associated cost.
 * Returned when calculating shipping rates.
 */
export interface ShippingOption {
  name: string;
  code: string;
  service: string;
  description: string;
  cost: number;
  etd: string; // Estimated Time of Delivery (e.g., "8 day")
}

/**
 * Represents the request payload required to calculate shipping costs.
 */
export interface CalculateShippingCostRequest {
  origin: number;
  destination: number;
  weight: number; // Weight of the package, typically in grams
  courier: string; // e.g., "jne", "sicepat", "jnt"
  price: string; // Sorting or filtering preference, e.g., "lowest"
}
