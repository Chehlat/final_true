import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { roboto } from "@/app/ui/fonts";
import { Seller } from "@/app/lib/definitions";
import { fetchLatestSellers } from "@/app/lib/data";
import Link from "next/link";

export default async function LatestSellers() {
  const sellers = await fetchLatestSellers();
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <Link href={"/dashboard/profs"}>
        <h2 className={`${roboto.className} mb-4 text-xl md:text-2xl`}>
          Профессоры
        </h2>
        <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
          {/* NOTE: comment in this code when you get to this point in the course */}

          <div className="bg-white px-6">
            {sellers.map((seller, i) => {
              return (
                <div
                  key={seller.id}
                  className={clsx(
                    "flex flex-row items-center justify-between py-4",
                    {
                      "border-t": i !== 0,
                    }
                  )}
                >
                  <div className="flex items-center">
                    {/* <Image
                    src={prof.image_url}
                    alt={`${prof.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  /> */}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold md:text-base">
                        {seller.organization}
                      </p>
                      <p className="hidden text-sm text-gray-500 sm:block">
                        {seller.address}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`${roboto.className} truncate text-sm font-medium md:text-base`}
                  >
                    {seller.phone}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex items-center pb-2 pt-6">
            <ArrowPathIcon className="h-5 w-5 text-gray-500" />
            <h3 className="ml-2 text-sm text-gray-500 ">
              Обновлено только что
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
}
