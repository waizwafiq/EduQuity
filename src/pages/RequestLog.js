import React from "react";
import { useColorContext } from "../context/ColorContextProvider"; // Import the hook

import {
  Navbar,
  Button,
  Header,
  Subtitle,
  Tabs,
  RecordRow,
  DataTable,
} from "../components";

import { upcoming } from "../assets";

function RequestLog({ themeStyles }) {
  const colors = useColorContext();
  return (
    <div
      className="min-h-screen"
      style={{ ...themeStyles, backgroundColor: colors.BGGrey }}
    >
      <Navbar />

      {/* <div className="bg-white ml-3 mr-3 p-6 rounded-lg shadow-lg text-center"> */}
      <div className="ml-8 mr-8 pl-6 pr-6 pt-6 pb-2 flex justify-between items-center">
        <Header text="Request Logs" />
      </div>
      <Subtitle text="Find nearby schools and request resources as needed." />
      {/* <h1 className="text-center font-bold text-4xl">Upcoming! 🛠️</h1> */}
      <div className="flex justify-center align-center my-8">
        <div className="mx-14 px-6 py-6 bg-white h-full w-full rounded-[20px]">
          <DataTable />
        </div>
      </div>
    </div>
  );
}

export default RequestLog;
