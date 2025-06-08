import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types/category";

const SingleItem = ({ item }: { item: Category }) => {
  return (
    <div className="flex justify-center">
    <Link
  href={{
    pathname: "/single-cat-items",
    query: { plink: item.plink, title: item.title },
  }}
>
      <div className="w-full bg-[#F2F3F8] h-25 flex items-center justify-center mb-4 pt-1 pb-1 ps-2 pe-2 rounded">
        <Image src={item.img} alt="Category" width={82} height={82} />
      </div>
      <div className="flex justify-center">
        <h3 className="inline-block font-medium text-dark bg-gradient-to-r from-blue to-blue bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px] group-hover:text-blue">
          {item.title}
        </h3>
      </div>
    </Link>
    </div>
  );
};

export default SingleItem;
