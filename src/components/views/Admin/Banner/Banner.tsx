import DropdownAction from "@/components/commons/DropdownAction";
import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_BANNER } from "./Banner.constants";
import useBanner from "./useBanner";
import useChangeUrl from "@/hooks/useChangeUrl";
import AddBannerModal from "./AddBannerModal";
import DeleteBannerModal from "./DeleteBannerModal";

const Banner = () => {
  const { push, query, isReady } = useRouter();
  const {
    selectedId,
    setSelectedId,

    //data banner
    dataBanner,
    isLoadingBanner,
    isRefetchingBanner,
    refetchBanner,
  } = useBanner();

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const addBannerModal = useDisclosure();
  const deleteBannerModal = useDisclosure();

  const renderCell = useCallback(
    (banner: Record<string, unknown>, columnKey: Key) => {
      const cellValue = banner[columnKey as keyof typeof banner];
      switch (columnKey) {
        case "image":
          return (
            <Image
              src={`${cellValue}`}
              className="rounded-lg"
              alt="image"
              width={300}
              height={100}
            />
          );
        case "actions":
          return (
            <DropdownAction
              keyText="banner"
              onPressButtonDetail={() => push(`/admin/banner/${banner._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${banner._id}`);
                deleteBannerModal.onOpen();
              }}
            />
          );
        case "isShow":
          return (
            <Chip
              size="sm"
              variant="flat"
              color={cellValue === true ? "success" : "warning"}
            >
              {cellValue === true ? "Published" : "Not Published"}
            </Chip>
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          renderCell={renderCell}
          columns={COLUMN_LIST_BANNER}
          totalPages={dataBanner?.pagination.totalPages}
          emptyContent="Banner is empty"
          data={dataBanner?.data || []}
          buttonTopContentLabel="Create Banner"
          isLoading={isLoadingBanner || isRefetchingBanner}
          onClickButtonTopContent={addBannerModal.onOpen}
        />
      )}
      <AddBannerModal {...addBannerModal} refetchBanner={refetchBanner} />
      <DeleteBannerModal
        {...deleteBannerModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchBanner={refetchBanner}
      />
    </section>
  );
};

export default Banner;
