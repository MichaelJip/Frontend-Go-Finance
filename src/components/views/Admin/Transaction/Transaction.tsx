import { useRouter } from "next/router";
import useTransaction from "./useTransaction";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_TRANSACTION } from "./Transaction.constants";
import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import DropdownAction from "@/components/commons/DropdownAction";
import { convertIDR } from "@/utils/formatCurrency";
import DeleteTransactionModal from "./DeleteTransactionModal";

const Transaction = () => {
  const { push, query, isReady } = useRouter();
  const {
    selectedId,
    setSelectedId,
    dataTransaction,
    isLoadingTransaction,
    isRefetchingTransaction,
    refetchTransaction,
  } = useTransaction();

  const { setUrl } = useChangeUrl();

  const deleteTransactionModal = useDisclosure();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (transaction: Record<string, unknown>, columnKey: Key) => {
      const cellValue = transaction[columnKey as keyof typeof transaction];
      switch (columnKey) {
        case "actions":
          return (
            <DropdownAction
              keyText="transaction"
              onPressButtonDetail={() =>
                push(`/admin/transaction/${transaction.orderId}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(`${transaction.orderId}`);
                deleteTransactionModal.onOpen();
              }}
            />
          );
        case "status":
          return (
            <Chip
              size="sm"
              variant="flat"
              color={cellValue === "completed" ? "success" : "warning"}
            >
              {cellValue as ReactNode}
            </Chip>
          );
        case "total":
          return convertIDR(Number(cellValue));
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
          columns={COLUMN_LIST_TRANSACTION}
          totalPages={dataTransaction?.pagination.totalPages}
          emptyContent="Transaction is empty"
          data={dataTransaction?.data || []}
          isLoading={isLoadingTransaction || isRefetchingTransaction}
        />
      )}
      <DeleteTransactionModal
        {...deleteTransactionModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchTransaction={refetchTransaction}
      />
    </section>
  );
};

export default Transaction;
