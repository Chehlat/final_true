import { BuildingStorefrontIcon } from "@heroicons/react/24/solid";

import { lusitana, roboto } from "@/app/ui/fonts";

export default function Logo() {
  return (
    <div
      className={`${roboto.className} flex flex-row items-center leading-none text-white`}
    >
      <BuildingStorefrontIcon className="h-12 w-12 " />
      <p className="text-[44px]">Садовод</p>
    </div>
  );
}
