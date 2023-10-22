import React from "react";
import { CiFilter } from "react-icons/ci";

import { useColorContext } from "../context/ColorContextProvider";

function LogRecordPlus({ item, amount, percent, date }) {
  const colors = useColorContext();
  return (
    <>
      <div className="grid grid-cols-2 gap-1">
        <div className="grid grid-rows-2 justify-items-start">
          <div className="font-bold text-sm">{item}</div>
          <div className="font-medium text-sm" style={{ color: colors.FontGrey }}>
            Current Res.
          </div>
        </div>
        <div className="grid grid-rows-2 justify-items-start  pl-4  ">
          <div className="flex ">
            <div className="font-bold text-sm">{amount}</div>
            <div
              className="pl-4 font-bold text-sm"
              style={{ color: colors.PercentLabelGreen }}
            >
              {percent}
            </div>
          </div>
          <div className="font-medium text-sm" style={{ color: colors.FontGrey }}>
            {date}
          </div>
        </div>
      </div>
    </>
  );
}

function LogRecordMinus({ item, amount, percent, date }) {
  const colors = useColorContext();
  return (
    <>
      <div className="grid grid-cols-2 gap-1">
        <div className="grid grid-rows-2 justify-items-start">
          <div className="font-bold text-sm">{item}</div>
          <div className="font-medium text-sm" style={{ color: colors.FontGrey }}>
            Current Res.
          </div>
        </div>
        <div className="grid grid-rows-2 justify-items-start  pl-4  ">
          <div className="flex">
            <div className="font-bold text-sm">{amount}</div>
            <div
              className="pl-4 font-bold text-sm"
              style={{ color: colors.PercentLabelRed, textAlign: 'right'  }}
            >
              {percent}
            </div>
          </div>
          <div className="font-medium text-sm" style={{ color: colors.FontGrey }}>
            {date}
          </div>
        </div>
      </div>
    </>
  );
}

function ResourceLogDash() {
  return (
    <div className="grid grid-rows-10 p-8 gap-6">
      <div className="grid grid-cols-3 justify-items-start gap-2 items-center">
        <div className="font-bold col-span-2 text-sm">RECENT UPDATE</div>
        <div className="flex items-center col-span-1 gap-1 bg-slate-200 p-2 rounded-lg hover:cursor-pointer">
          <CiFilter />
          <div>Filter</div>
        </div>
      </div>
      <LogRecordPlus
        item="TABLET"
        amount="99"
        percent="+2"
        date="18 Sep 23"
      />
      <LogRecordMinus
        item="SMARTPHONE"
        amount="72"
        percent="-6"
        date="18 Sep 23"
      />
      <LogRecordPlus
        item="LAPTOP"
        amount="83"
        percent="+2"
        date="13 Sep 23"
      />
      <LogRecordMinus
        item="IT Teacher"
        amount="16"
        percent="-33"
        date="12 Sep 23"
      />
      <LogRecordPlus item="LAPTOP" amount="15" percent="+2" date="7 Sep 2023" />
      <LogRecordPlus
        item="TECHNICIAN"
        amount="14"
        percent="+10"
        date="7 Sep 2023"
      />
    </div>
  );
}

export default ResourceLogDash;
