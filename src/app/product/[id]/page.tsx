import { getPhoneById } from "@/services/api";
import ProductDetailClient from "./ProductDetailClient";

 export default async function ProductPage(context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;  

  const phoneData = await getPhoneById(id);

  if (!phoneData) {
    throw new Error("No se pudo obtener la información del producto.");
  }

  return <ProductDetailClient phone={phoneData} />;
}