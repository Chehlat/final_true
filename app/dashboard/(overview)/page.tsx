import LatestSellers from "@/app/ui/dashboard/latest-sellers";
// import RevenueChart from '@/app/ui/dashboard/revenue-chart';
// import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana, roboto } from "@/app/ui/fonts";

import { Suspense } from "react";
import {
  CardSkeleton,
  InvoiceSkeleton,
  RevenueChartSkeleton,
} from "@/app/ui/skeletons";
import CardWrapper from "@/app/ui/dashboard/cards";
import Link from "next/link";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";

export default async function Page() {
  return (
    <div>
      <main>
        <h1 className={`${roboto.className} mb-4 text-xl md:text-2xl`}>
          Дэшборд
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Suspense fallback={<CardSkeleton />}>
            <CardWrapper />
          </Suspense>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          <Suspense fallback={<RevenueChartSkeleton />}>
            <RevenueChart />
          </Suspense>
          <Suspense fallback={<InvoiceSkeleton />}>
            <LatestSellers />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
