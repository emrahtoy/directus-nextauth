import { ApiCollections, components } from "@/api-collection";
import { Directus } from "@directus/sdk";
const directus = new Directus<ApiCollections>(process.env.DIRECTUS_API!);
export default directus;
