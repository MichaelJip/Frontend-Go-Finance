import useChangeUrl from "@/hooks/useChangeUrl";
import orderServices from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useTransaction = () => {
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getTransactionByMember = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await orderServices.getMemberOrder(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataTransactionByMember,
    isLoading: isLoadingTransactionByMember,
    isRefetching: isRefetchingTransactionByMember,
    refetch: refetchTransactionByMember,
  } = useQuery({
    queryKey: ["TransactionByMember", currentPage, currentLimit, currentSearch],
    queryFn: () => getTransactionByMember(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    //data transactions
    dataTransactionByMember,
    isLoadingTransactionByMember,
    isRefetchingTransactionByMember,
    refetchTransactionByMember,
  };
};

export default useTransaction;
