import { API_BASE_URL } from "@/lib/config";
import { paths } from "@/types/openapi/api";
import createClient from "openapi-fetch";

export const { GET, POST, PUT, DELETE } = createClient<paths>({
  baseUrl: API_BASE_URL,
});
