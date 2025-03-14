import { useRouter } from "next/router";
import useTransaction from "./useTransaction";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_TRANSACTION } from "./Transaction.constants";
import DataTable from "@/components/ui/DataTable";
import { Chip } from "@heroui/react";
import DropdownAction from "@/components/commons/DropdownAction";
import { convertIDR } from "@/utils/formatCurrency";

const Transaction = () => {
  const { push, query, isReady } = useRouter();
  const {
    dataTransactionByMember,
    isLoadingTransactionByMember,
    isRefetchingTransactionByMember,
  } = useTransaction();

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (transaction: Record<string, unknown>, columnKey: Key) => {
      const cellValue = transaction[columnKey as keyof typeof transaction];
      console.log(cellValue, "check value");
      switch (columnKey) {
        case "actions":
          return (
            <DropdownAction
              keyText="transaction"
              onPressButtonDetail={() =>
                push(`/member/transaction/${transaction.orderId}`)
              }
              hideButtonDelete={true}
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
          totalPages={dataTransactionByMember?.pagination.totalPages}
          emptyContent="Transaction is empty"
          data={dataTransactionByMember?.data || []}
          isLoading={
            isLoadingTransactionByMember || isRefetchingTransactionByMember
          }
        />
      )}
    </section>
  );
};

export default Transaction;
