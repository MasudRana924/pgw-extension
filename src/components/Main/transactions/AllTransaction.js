import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllTransactions from "./AllTransactions";
import {
  clearLastTransaction,
  fetchtransactions,
} from "../../../redux/reducers/transaction/transactionSlice";
import addNotification from "react-push-notification";
import { privateGet } from "../../../redux/utilities/apiCaller";
const AllTransaction = () => {
  const { loggeduser } = useSelector((state) => state.userDetails);
  const userToken = loggeduser.token;
  const dispatch = useDispatch();
  const { mytransactions, } = useSelector(
    (state) => state.transactions
  );
  const { isLoading } = useSelector((state) => state.transactions);
  useEffect(() => {
    dispatch(fetchtransactions({ userToken }));
  }, [dispatch, userToken]);

  // let content;
  // if (!isLoading && mytransactions?.length > 0) {
  //   content = mytransactions
  //     .slice(0, 2)
  //     .map((transaction) => (
  //       <AllTransactions key={transaction._id} transaction={transaction} />
  //     ));
  // }

  // useEffect(() => {
  //   if (lastTransaction) {
  //     addNotification({
  //       title: `${lastTransaction.type}`,
  //       message: `You got a payment of ${lastTransaction.amount} from ${lastTransaction.senderphone}`,
  //       native: true,
  //     });
  //     dispatch(clearLastTransaction());
  //   }
  // }, [lastTransaction, dispatch]);

  const [latestTransaction, setLatestTransaction] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await privateGet('/my/transactions', userToken);
        const transactions = response.transactions;
        console.log("transactions", transactions);
        if (transactions?.length > 0) {
          const latest = transactions[0];
          console.log("latest",latest);
          if (latest) {
            setLatestTransaction(latest);
            addNotification({
              title: `${latest.type}`,
              message: `You got a payment of ${latest.amount} from ${latest.senderphone}`,
              native: true,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [userToken, latestTransaction]);

  let content;
  if (!isLoading && mytransactions?.length > 0) {
    content = mytransactions
      .slice(0, 2)
      .map((transaction) => (
        <AllTransactions key={transaction._id} transaction={transaction} />
      ));
  }
  return (
    <div className="m-2">
      <div className="flex justify-between">
        <p className="text-start text-xs">Transactions Summary</p>
        <p className="text-start text-xs text-pink-500">see all</p>
      </div>
      {/* {isLoading ? (
        <div>
          <p className="text-pink-500 text-sm text-center">Loading !!!</p>
        </div>
      ) : (
        <div>{content}</div>
      )} */}
      <div>{content}</div>
    </div>
  );
};
export default AllTransaction;
