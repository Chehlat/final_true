import { sql } from "@vercel/postgres";
import { Seller, Product, SalesRecords, Revenue } from "./definitions";

import { unstable_noStore as noStore } from "next/cache";

import { formatCurrency } from "./utils";

export async function fetchCardData() {
  noStore();
  try {
    console.log("Fetching revenue data...");
    const revenueCount = sql`SELECT SUM(total_cost) FROM SalesRecords`;
    const recordsCount = sql`SELECT COUNT(*) FROM SalesRecords`;
    const productsCount = sql`SELECT COUNT(*) FROM Products`;
    const sellersCount = sql`SELECT COUNT(*) FROM Sellers`;
    const data = await Promise.all([
      revenueCount,
      recordsCount,
      productsCount,
      sellersCount,
    ]);
    const numberOfSellers = Number(data[3].rows[0].count ?? "0");
    const numberOfProducts = Number(data[2].rows[0].count ?? "0");
    const numberOfSalesRecords = Number(data[1].rows[0].count ?? "0");
    const amountOfRevenue = formatCurrency(data[0].rows[0].sum ?? "0");
    return {
      numberOfSellers,
      numberOfProducts,
      numberOfSalesRecords,
      amountOfRevenue,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}
export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log("Fetching revenue data...");
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    console.log("Data fetch completed after 3 seconds.");

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
export async function fetchLatestSellers() {
  noStore();

  try {
    const data = await sql<Seller>`
      SELECT sellers.organization, sellers.address, sellers.phone, sellers.name_of_representative
      FROM sellers
  
      ORDER BY created_at DESC
      LIMIT 5`;

    const latestSellers = data.rows.map((seller) => ({
      ...seller,
    }));
    return latestSellers;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest invoices.");
  }
}
