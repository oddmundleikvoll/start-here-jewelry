import pathsData from "@/data/paths.json";
import productsData from "@/data/products.json";
import stepsData from "@/data/steps.json";

export interface Path {
  id: string;
  title: string;
  description: string;
  image: string;
  products: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface Step {
  order: number;
  title: string;
  description: string;
}

export function getPaths(): Path[] {
  return pathsData as Path[];
}

export function getPathById(id: string): Path | undefined {
  return (pathsData as Path[]).find((p) => p.id === id);
}

export function getProducts(): Product[] {
  return productsData as Product[];
}

export function getProductsByIds(ids: string[]): Product[] {
  return (productsData as Product[]).filter((p) => ids.includes(p.id));
}

export function getStepsByPathId(pathId: string): Step[] {
  const pathSteps = (stepsData as { id: string; steps: Step[] }[]).find(
    (s) => s.id === pathId
  );
  return pathSteps?.steps ?? [];
}

export function generateShoppingList(pathId: string): Product[] {
  const path = getPathById(pathId);
  if (!path) return [];
  return getProductsByIds(path.products);
}
