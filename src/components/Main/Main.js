import React, { useState } from "react";
import "./Main.css";
import Navbar from "../shared/Navbar";
import PaymentCategory from "./paymentcategory/PaymentCategory";
import AllTransaction from "./transactions/AllTransaction";
import io from "socket.io-client";
import { useEffect } from "react";
import axios from "axios";
import { formatDate } from "../../redux/utilities/helper";
import { Notifications  } from 'react-push-notification';
import addNotification from 'react-push-notification';
import { FiCopy } from "react-icons/fi";
const Main = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://10.10.1.77/DQR/public/merchant-data")
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    };
    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);
  console.log("data", data);


  const buttonClick = () => {
    addNotification({
        title: 'Payment Notification',
        message: 'You got a payment from 01952254063',
        native: true 
    });
};



  return (
    <div className="popup-container ">
      <Navbar />
      <PaymentCategory />
      <Notifications  />
      {/* <AllTransaction /> */}
      <div>
      {data.map((item, index) => (
        <div className="m-2 card col-span-12  md:col-span-3  gap-4 lg:col-span-4  2xl:col-span-3 ">
          <div className="text-start flex justify-between gap-5 bg-stone-100 border border-stone-100 rounded-lg p-2">
            <div className="flex">
              
              <div>
                <div>
                <p className="text-xs text-gray-500 font-medium ml-2 mt-1">
                    Payment
                  </p>
                  <p className="text-xs text-gray-500 font-medium ml-2 mt-1">
                     <span className="text-pink-500">{item.senderWallet}</span>
                  </p>
                </div>
                <div className="flex gap-4 mt-2">
                  <p className="text-xs font-medium ml-2 text-gray-500">
                    Trans ID : {item.transactionId}
                  </p>
                  <FiCopy className="text-sm text-violet-500 font-medium"></FiCopy>
                </div>
                <p className="text-xs font-medium ml-2 text-gray-500">
                    reference : {item.reference}
                  </p>
                <p className="text-xs font-medium ml-2 mt-1 mb-2 text-gray-500">
                  {formatDate(item.created_at)}
                </p>
              </div>
            </div>
            <div>
            <div>
                  <p className="text-xs font-medium mt-2 text-end text-green-500">
                    + <span >{item.amount}.00 TK</span>
                  </p>
                </div>
              <div>
                <p className="text-xs text-gray-500 font-medium text-end mt-5">
                  Charge ট 0.00
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>



    </div>
  );
};

export default Main;
