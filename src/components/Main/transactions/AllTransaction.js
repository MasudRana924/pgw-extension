import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllTransactions from "./AllTransactions";
import {
  clearLastTransaction,
  fetchtransactions,
} from "../../../redux/reducers/transaction/transactionSlice";
import addNotification from "react-push-notification";
const AllTransaction = () => {
  const { loggeduser } = useSelector((state) => state.userDetails);
  const userToken = loggeduser.token;
  const dispatch = useDispatch();
  const { mytransactions, lastTransaction } = useSelector(
    (state) => state.transactions
  );
  const { isLoading } = useSelector((state) => state.transactions);
  useEffect(() => {
    dispatch(fetchtransactions({ userToken }));
    // const interval = setInterval(()=>{dispatch(fetchtransactions({ userToken }))}, 1000);
    // return () => clearInterval(interval);
  }, [dispatch, userToken]);

  let content;
  if (!isLoading && mytransactions?.length > 0) {
    content = mytransactions
      .slice(0, 2)
      .map((transaction) => (
        <AllTransactions key={transaction._id} transaction={transaction} />
      ));
  }

  useEffect(() => {
    if (lastTransaction) {
      addNotification({
        title: `${lastTransaction.type}`,
        message: `You got a payment of ${lastTransaction.amount} from ${lastTransaction.senderphone}`,
        native: true,
      });
      dispatch(clearLastTransaction());
    }
  }, [lastTransaction, dispatch]);
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
