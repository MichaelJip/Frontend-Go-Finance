import useChangeUrl from "@/hooks/useChangeUrl";
import { ICategory } from "@/types/category";
import {
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
  Skeleton,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import useEventFilter from "./useEventFilter";
import { Fragment, useEffect } from "react";

const EventFilter = () => {
  const { control, dataCategory, isSuccessCategory, setValue } =
    useEventFilter();
  const {
    handleChangeCategory,
    handleChangeIsFeatured,
    handleChangeIsOnline,
    currentCategory,
    currentIsOnline,
    currentIsFeatured,
  } = useChangeUrl();

  useEffect(() => {
    if (currentCategory !== "") {
      setValue("category", `${currentCategory}`);
      setValue("isOnline", `${currentIsOnline}`);
      setValue("isFeatured", `${currentIsFeatured}`);
    }
  }, [isSuccessCategory]);

  return (
    <div className="top-20 h-fit w-full rounded-xl border p-4 lg:sticky lg:w-80">
      <h4 className="text-xl font-semibold">Filter</h4>
      <div className="mt-4 flex flex-col gap-4">
        {isSuccessCategory ? (
          <Fragment>
            <Controller
              name="category"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultItems={dataCategory?.data?.data || []}
                  label="Category"
                  variant="bordered"
                  labelPlacement="outside"
                  placeholder="Search category here..."
                  defaultSelectedKey={`${currentCategory}`}
                  onSelectionChange={(val) => {
                    onChange(val);
                    handleChangeCategory(val !== null ? `${val}` : "");
                  }}
                >
                  {(category: ICategory) => (
                    <AutocompleteItem key={`${category._id}`}>
                      {category.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
            <Controller
              name="isOnline"
              control={control}
              render={(field) => (
                <Select
                  {...field}
                  label="Online / Offline"
                  labelPlacement="outside"
                  placeholder="Select online / offline"
                  variant="bordered"
                  defaultSelectedKeys={[`${currentIsOnline}`]}
                  onChange={(e) => handleChangeIsOnline(e.target.value)}
                >
                  <SelectItem key="true">Online</SelectItem>
                  <SelectItem key="false">Offline</SelectItem>
                </Select>
              )}
            />
            <Controller
              name="isFeatured"
              control={control}
              render={(field) => (
                <Select
                  {...field}
                  label="Featured"
                  labelPlacement="outside"
                  placeholder="Select featured"
                  variant="bordered"
                  defaultSelectedKeys={[`${currentIsFeatured}`]}
                  onChange={(e) => handleChangeIsFeatured(e.target.value)}
                >
                  <SelectItem key="true">Yes</SelectItem>
                  <SelectItem key="false">No</SelectItem>
                </Select>
              )}
            />
          </Fragment>
        ) : (
          <div className="space-y-4">
            <Skeleton className="h-14 w-full rounded-lg" />
            <Skeleton className="h-14 w-full rounded-lg" />
            <Skeleton className="h-14 w-full rounded-lg" />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventFilter;
