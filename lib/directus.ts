import { Directus } from "@directus/sdk";
const directus = new Directus(process.env.DIRECTUS_API!);
export default directus;
