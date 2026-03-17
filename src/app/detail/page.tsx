"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function detail() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const code = localStorage.getItem("code");

    try {
      axios.get(`https://restcountries.com/v3.1/alpha/${code}`).then((res) => {
        setData(res.data[0]);
      });
    } catch (error) {}
  }, []);

  console.log(data);
  return <></>;
}
