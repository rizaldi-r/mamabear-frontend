/**
 * Defines the structure of the address form data.
 * Used by React Hook Form.
 */
export interface AddressFormData {
  name: string;
  phoneNumber: string; // The user's input (without the +62 prefix)
  provinceId: string;
  cityId: string;
  districtId: string;
  subdistrictId: string;
  zipCode: string;
  street: string;
  details: string;
  label: string; // e.g., "Kantor", "Rumah"
}
