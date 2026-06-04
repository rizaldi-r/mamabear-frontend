import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { 
  getProvinces, 
  getCities, 
  getDistricts, 
  getSubdistricts 
} from "../services/shippingService";
import { Region, Subdistrict } from "../types/shipping.types";
import {AddressFormData} from "@/features/address/types/address.types";

export function useAddressForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormData>();

  // State for dropdown options
  const [provinces, setProvinces] = useState<Region[]>([]);
  const [cities, setCities] = useState<Region[]>([]);
  const [districts, setDistricts] = useState<Region[]>([]);
  const [subdistricts, setSubdistricts] = useState<Subdistrict[]>([]);

  // Loading states
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);
  const [isLoadingSubdistricts, setIsLoadingSubdistricts] = useState(false);

  // Success message state
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Watch selected IDs to trigger cascading fetches
  const selectedProvinceId = watch("provinceId");
  const selectedCityId = watch("cityId");
  const selectedDistrictId = watch("districtId");
  const selectedSubdistrictId = watch("subdistrictId");

  // 1. Fetch Provinces on Mount
  useEffect(() => {
    let isMounted = true;
    const fetchProvinces = async () => {
      setIsLoadingProvinces(true);
      try {
        const data = await getProvinces();
        if (isMounted) setProvinces(data);
      } catch (error) {
        console.error("Failed to load provinces", error);
      } finally {
        if (isMounted) setIsLoadingProvinces(false);
      }
    };
    fetchProvinces();
    return () => { isMounted = false; };
  }, []);

  // 2. Fetch Cities when Province changes
  useEffect(() => {
    let isMounted = true;
    if (!selectedProvinceId) {
      setCities([]);
      return;
    }
    const fetchCities = async () => {
      setIsLoadingCities(true);
      try {
        // Reset downstream fields
        resetField("cityId");
        resetField("districtId");
        resetField("subdistrictId");
        resetField("zipCode");
        
        const data = await getCities(parseInt(selectedProvinceId, 10));
        if (isMounted) setCities(data);
      } catch (error) {
        console.error("Failed to load cities", error);
      } finally {
        if (isMounted) setIsLoadingCities(false);
      }
    };
    fetchCities();
    return () => { isMounted = false; };
  }, [selectedProvinceId, resetField]);

  // 3. Fetch Districts when City changes
  useEffect(() => {
    let isMounted = true;
    if (!selectedCityId) {
      setDistricts([]);
      return;
    }
    const fetchDistricts = async () => {
      setIsLoadingDistricts(true);
      try {
        resetField("districtId");
        resetField("subdistrictId");
        resetField("zipCode");
        
        const data = await getDistricts(parseInt(selectedCityId, 10));
        if (isMounted) setDistricts(data);
      } catch (error) {
        console.error("Failed to load districts", error);
      } finally {
        if (isMounted) setIsLoadingDistricts(false);
      }
    };
    fetchDistricts();
    return () => { isMounted = false; };
  }, [selectedCityId, resetField]);

  // 4. Fetch Subdistricts when District changes
  useEffect(() => {
    let isMounted = true;
    if (!selectedDistrictId) {
      setSubdistricts([]);
      return;
    }
    const fetchSubdistricts = async () => {
      setIsLoadingSubdistricts(true);
      try {
        resetField("subdistrictId");
        resetField("zipCode");
        
        const data = await getSubdistricts(parseInt(selectedDistrictId, 10));
        if (isMounted) setSubdistricts(data);
      } catch (error) {
        console.error("Failed to load subdistricts", error);
      } finally {
        if (isMounted) setIsLoadingSubdistricts(false);
      }
    };
    fetchSubdistricts();
    return () => { isMounted = false; };
  }, [selectedDistrictId, resetField]);

  // 5. Auto-fill Zip Code when Subdistrict changes
  useEffect(() => {
    if (!selectedSubdistrictId || subdistricts.length === 0) return;
    
    const selectedSub = subdistricts.find(
      (sub) => sub.id.toString() === selectedSubdistrictId
    );
    
    if (selectedSub && selectedSub.zip_code) {
      setValue("zipCode", selectedSub.zip_code);
    }
  }, [selectedSubdistrictId, subdistricts, setValue]);

  // Handle Form Submission
  const onSubmit = async (data: AddressFormData) => {
    try {
      // Resolve full names for saving (optional, but good for local storage visualization)
      const provinceName = provinces.find(p => p.id.toString() === data.provinceId)?.name || "";
      const cityName = cities.find(c => c.id.toString() === data.cityId)?.name || "";
      const districtName = districts.find(d => d.id.toString() === data.districtId)?.name || "";
      const subdistrictName = subdistricts.find(s => s.id.toString() === data.subdistrictId)?.name || "";

      const finalAddressData = {
        ...data,
        fullPhone: `+62${data.phoneNumber}`,
        provinceName,
        cityName,
        districtName,
        subdistrictName,
        savedAt: new Date().toISOString(),
      };

      // Save to localStorage as requested
      const existingAddresses = JSON.parse(localStorage.getItem("mamabear_addresses") || "[]");
      existingAddresses.push(finalAddressData);
      localStorage.setItem("mamabear_addresses", JSON.stringify(existingAddresses));

      setSuccessMessage("Alamat berhasil disimpan!");
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);

    } catch (error) {
      console.error("Failed to save address:", error);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    dropdowns: {
      provinces,
      cities,
      districts,
      subdistricts,
    },
    loaders: {
      isLoadingProvinces,
      isLoadingCities,
      isLoadingDistricts,
      isLoadingSubdistricts,
    },
    successMessage,
  };
}