import {
  UserGroupIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { lusitana, roboto } from "@/app/ui/fonts";
import { fetchCardData } from "@/app/lib/data";
import Link from "next/link";

const iconMap = {
  revenue_total: CurrencyDollarIcon,
  sold_products_records_total: DocumentTextIcon,
  products_total: ShoppingCartIcon,
  sellers_total: UserGroupIcon,
};

export default async function CardWrapper() {
  const {
    numberOfSellers,
    numberOfProducts,
    numberOfSalesRecords,
    amountOfRevenue,
  } = await fetchCardData();
  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <Link href={"/dashboard/salesrecords"}>
        <Card
          title="Сумм. доход"
          value={amountOfRevenue}
          type="revenue_total"
        />
      </Link>

      <Link href={"/dashboard/salesrecords"}>
        <Card
          title="Сделано продаж"
          value={numberOfSalesRecords}
          type="sold_products_records_total"
        />
      </Link>
      <Link href={"/dashboard/products"}>
        <Card
          title="Товаров всего:"
          value={numberOfProducts}
          type="products_total"
        />
      </Link>

      <Link href={"/dashboard/sellers"}>
        <Card title="Продавцов" value={numberOfSellers} type="sellers_total" />
      </Link>
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type:
    | "revenue_total"
    | "sold_products_records_total"
    | "products_total"
    | "sellers_total";
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${roboto.className}
              truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
