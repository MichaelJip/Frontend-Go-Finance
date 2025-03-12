import { ICategory } from "@/types/category";
import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

interface PropTypes {
  dataCategory: ICategory[];
  isLoadingCategory: boolean;
}

const HomeCategoryList = (props: PropTypes) => {
  const { dataCategory, isLoadingCategory } = props;

  return (
    <Card className="mx-6 mb-8 p-8 lg:mx-0">
      <CardHeader className="p-0">
        <h1 className="text-2xl font-bold text-danger">Event By Category</h1>
      </CardHeader>
      <CardBody className="mt-4 p-0">
        <div className="grid auto-cols-[8rem] grid-flow-col gap-4 overflow-x-auto lg:grid-cols-8">
          {!isLoadingCategory
            ? dataCategory?.map((item) => (
                <Link
                  key={`category-${item._id}`}
                  href={`/event?category=${item._id}`}
                  className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border p-4"
                >
                  <Image
                    src={`${item.icon}`}
                    alt={`${item.name}`}
                    width={100}
                    height={100}
                    className="1/2"
                  />
                  <p className="text-md font-bold">{item.name}</p>
                </Link>
              ))
            : Array.from({ length: 8 }).map((_, index) => (
                <Skeleton
                  key={`list-category-skeleton-${index}`}
                  className="aspect-square rounded-xl"
                />
              ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default HomeCategoryList;
