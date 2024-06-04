import React, { useState } from "react";
import "./Main.css";
import Navbar from "../shared/Navbar";
import PaymentCategory from "./paymentcategory/PaymentCategory";
import AllTransaction from "./transactions/AllTransaction";
import { useEffect } from "react";
import axios from "axios";
import { formatDate } from "../../redux/utilities/helper";
import { Notifications  } from 'react-push-notification';
import addNotification from 'react-push-notification';
import { FiCopy } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
const Main = () => {
  const { loggeduser } = useSelector((state) => state.userDetails);
  const userToken = loggeduser.token;
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

  return (
    <div className="popup-container ">
      <Navbar />
      <PaymentCategory />
      <Notifications  />
      <div>
        <Link to="/main/recent">Recent</Link>
        <Link to="/main/search">Search</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Main;
