import React from "react";
import { useColorContext } from "../context/ColorContextProvider"; // Import the hook

import {
  Navbar,
  Button,
  Header,
  Subtitle,
  Tabs,
  RecordRow,
} from "../components";

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
        {/* <Button
                    text='Download Report'
                    className='text-base'
                    rounded={false} /> */}
      </div>
      <Subtitle text="Find nearby schools and request resources as needed." />
      <div className="ml-14 mr-14 pl-6 pr-6 pt-6 pb-2 flex justify-between items-center bg-white h-[60rem] rounded-lg">
        <div>
          <RecordRow />
        </div>
      </div>
    </div>
  );
}

export default RequestLog;
