import { ICategory } from "@/types/category";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Textarea,
} from "@heroui/react";

interface PropTypes {
  dataCategory: ICategory;
}

const InfoTab = (props: PropTypes) => {
  const { dataCategory } = props;
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-col items-center">
        <h1 className="w-full text-xl font-bold">Category Information</h1>
        <p className="w-full text-sm text-default-400">
          Manage information of this category
        </p>
      </CardHeader>
      <CardBody>
        <form className="flex flex-col gap-4" onSubmit={() => {}}>
          <Skeleton isLoaded={!!dataCategory.name} className="rounded-lg">
            <Input
              name="name"
              label="Name"
              type="text"
              className="mt-2"
              labelPlacement="outside"
              variant="bordered"
              defaultValue={dataCategory?.name}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataCategory.description}
            className="rounded-lg"
          >
            <Textarea
              name="description"
              label="Description"
              className="mt-2"
              labelPlacement="outside"
              variant="bordered"
              defaultValue={dataCategory?.description}
            />
          </Skeleton>
          <Button
            color="danger"
            className="mt-2 disabled:bg-default-500"
            type="submit"
          >
            Save Change
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default InfoTab;
