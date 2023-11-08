
import React from "react";

import {
  logo_no_text,
  logo_with_text,
  bg_petaling1,
  petaling1,
  laptop,
  tablet,
  smartphone,
  itteacher,
  ittechnician,
} from "../assets";

import { useColorContext } from "../context/ColorContextProvider";

// import Navbar from '../components/Navbar';
import {
  Navbar,
  Button,
  Header,
  Subtitle,
  Card,
  LabelCircle,
  ResourceCard,
  ClickableCard,
  ResourceLogDash,
} from "../components";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import supabaseClient from "./utils/supabase";
ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard({ themeStyles }) {
  const [schoolData, setSchoolData] = React.useState()
  const getSchoolData = async() => {
    const {data:userData} = await supabaseClient.auth.getUser()

    const {data:schoolData} = await supabaseClient.from("school").select("*").eq("email",userData?.user.email).single()
    setSchoolData(schoolData)
    console.log(schoolData)
  }

  React.useEffect(()=>{
    getSchoolData()
  })
  const colors = useColorContext();

  const data = {
    labels: ["Laptop", "Tablet", "Smartphone", "Teacher", "IT Technician"],
    datasets: [
      {
        data: [10, 20, 30, 30, 20],
        backgroundColor: [
          colors.PieBlue,
          colors.PieBabyBlue,
          colors.PieLightBlue,
          colors.PieRed,
          colors.PieGreen,
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          generateLabels: function (chart) {
            return "";
          },
        },
      },
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <div
      className="min-h-screen"
      style={{ ...themeStyles, backgroundColor: colors.BGGrey }}
    >
      <Navbar />

      {/* <div className="bg-white ml-3 mr-3 p-6 rounded-lg shadow-lg text-center"> */}
      <div className="mx-8 pl-6 pr-6 pt-6 pb-2 flex justify-between items-center">
        <Header text="Welcome to School Inventory" />
        <Button text="Download Report" className="text-base" rounded={false} />
      </div>
      <Subtitle text="Manage and monitor the school resources." />

      {/* <div className="bg-white ml-14 mr-14 p-6 rounded-lg shadow-lg text-center"> */}
      <div
        className="mx-14 text-center grid grid-cols-5 gap-x-3"
        style={{ height: "auto" }}
      >
        <div className="grid grid-rows-4 col-span-4 gap-3 mb-4">
          {/* <div className={`text-black grid grid-cols-5 text-left rounded-2xl`} style={{ backgroundColor: colors.BGBlueSoft }}> */}
          <Card
            className={`text-black grid grid-cols-5 text-left`}
            bgColor={colors.BGBlueSoft}
          >
            <div className="flex justify-center items-center">
              <img
                src={schoolData?.image}
                className="w-auto h-48 p-10"
                alt="School Logo"
              />
            </div>
            <div className="col-span-4 p-6 grid grid-rows-3">
              <h1 className="text-4xl font-bold">
                {schoolData?.name}
              </h1>

              <div className="grid grid-cols-3">
                <p className="col-span-2 text-sm text-gray-700 font-medium">
                  <h1 className="font-bold text-gray-700 text-base">Address</h1>
                  {schoolData?.location}
                </p>
                <p className="font-bold text-right pr-8">📍 3.5 km</p>
              </div>
              <div className="grid grid-cols-2 font-medium text-gray-700 text-sm mt-3">
                <div>
                  <p>📧 {schoolData?.email}</p>
                </div>
                <div>
                  <p>📞 {schoolData?.phone}</p>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-3 gap-3">
            <Card className="col-span-2">
              <div className="py-5 px-10 grid grid-rows-3">
                <div className=" row-span-1 flex justify-start items-center font-bold">
                  RESOURCE: LAPTOP
                </div>
                <div className="row-span-2">
                  <ul
                    className="text-left font-medium"
                    style={{ color: colors.FontGrey }}
                  >
                    <li className="flex">
                      • Current Status:&nbsp;
                      <p style={{ color: colors.FontGreen }}>Good</p>
                    </li>
                    <li>
                      • Predicted Maintenance Required: None in the next 30 days
                    </li>
                    <li>• Last Maintenance: 45 days ago</li>
                    <li>
                      • Usage Patterns: High, especially during exam periods
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
            <Card className="py-5 px-10">
              <div>
                <div className="font-bold flex justify-start items-center">
                  RESOURCES %
                </div>
                <div className="grid grid-cols-2">
                  <div className=" flex items-center">
                    <ul
                      className="text-left font-medium"
                      style={{ color: colors.FontGrey }}
                    >
                      <li className="flex items-center gap-2">
                        <LabelCircle color={colors.PieBlue} />
                        Laptop
                      </li>
                      <li className="flex items-center gap-2">
                        <LabelCircle color={colors.PieBabyBlue} />
                        Tablet
                      </li>
                      <li className="flex items-center gap-2">
                        <LabelCircle color={colors.PieLightBlue} />
                        Smartphone
                      </li>
                      <li className="flex items-center gap-2">
                        <LabelCircle color={colors.PieRed} />
                        Teacher
                      </li>
                      <li className="flex items-center gap-2">
                        <LabelCircle color={colors.PieGreen} />
                        IT Technician
                      </li>
                    </ul>
                  </div>
                  <div className="h-40 flex items-center">
                    <Doughnut data={data} options={options} />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <ClickableCard className="border-4 border-[#da3801] hover:bg-[#E1DFF6] hover:cursor-pointer">
              <ResourceCard icon={laptop} iconTitle="LAPTOP" width="150" current="12" required="15" />
            </ClickableCard>
            <ClickableCard className="border-4 border-[#00b294] hover:bg-[#E1DFF6] hover:cursor-pointer">
              <ResourceCard icon={tablet} iconTitle="TABLET" width="140" current="15" required="12" />
            </ClickableCard>
            <ClickableCard className="border-4 border-[#00b294] hover:bg-[#E1DFF6] hover:cursor-pointer">
              <ResourceCard
                icon={smartphone}
                iconTitle="SMARTPHONE"
                width="140" current="72" required="67"
              />
            </ClickableCard>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <ClickableCard className="border-4 border-[#da3801] hover:bg-[#E1DFF6] hover:cursor-pointer">
              <ResourceCard
                icon={itteacher}
                iconTitle="IT TEACHER"
                width="140" current="11" required="13"
              />
            </ClickableCard>
            <ClickableCard className="border-4 border-[#00b294] hover:bg-[#E1DFF6] hover:cursor-pointer">
              <ResourceCard
                icon={ittechnician}
                iconTitle="IT TECHNICIAN"
                width="140" current="17" required="17"
              />
            </ClickableCard>
          </div>
        </div>
        <Card className="mb-4">
          <ResourceLogDash />
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
