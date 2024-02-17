import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  ConfigProvider,
  DatePicker,
  DatePickerProps,
  Divider,
  Dropdown,
  Layout,
  Pagination,
  PaginationProps,
  Radio,
  RadioChangeEvent,
  Select,
  Space,
} from "antd";
import { MenuProps } from "antd/lib";
import {
  DownOutlined,
  SwapOutlined,
  TeamOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import customParseFormat from "dayjs/plugin/customParseFormat";
import ReactCountryFlag from "react-country-flag";
import { useLocation, useNavigate } from "react-router-dom";
import SkeletonAvatar from "antd/lib/skeleton/Avatar";
import Logo from "../../components/Logo";
import HomeFooter from "../../components/home_footer";
import CabinField from "../../components/cabin_field";
import PassengerField from "../../components/passenger_field";
import LogoImage from "../../components/LogoImage";

dayjs.extend(customParseFormat);

const { Header, Content, Footer } = Layout;
interface Airport {
  id: string | undefined;
  name: string | undefined;
  abv: string | undefined;
  city: string | undefined;
}

interface Schedule {
  name: string;
  departureDate: dayjs.Dayjs;
  plane: string;
  arrivalDate: dayjs.Dayjs;
  duration: number;
}
const api_base_url = "https://be-java-production.up.railway.app";

const accessToken = localStorage.getItem("access_token");

const Index: React.FC = () => {
  const location = useLocation();
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const [fromAirportDetails, setFromAirportDetails] = useState<
    { label: string; value: string }[]
  >([]);
  const [toAirportDetails, setToAirportDetails] = useState<
    { label: string; value: string }[]
  >([]);
  const [fromAirport, setFromAirport] = useState<Airport>(location.state.fromAirport);
  const [toAirport, setToAirport] = useState<Airport>(location.state.toAirport);

  const [departureDate, setDepartureDate] = useState<dayjs.Dayjs>(dayjs(location.state.departureDate, "YYYY-MM-DD"));
  const [returnDate, setReturnDate] = useState<dayjs.Dayjs>(dayjs(location.state.returnDate, "YYYY-MM-DD"));

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [trip, setTrip] = useState<string>(location.state.trip);
  const [airports, setAirports] = useState<Airport[]>([]);

  const [seat, setSeat] = useState(location.state.seats);

  const [page, setPage] = useState<number>(1);
  const [scheduleToRender, setScheduleToRender] = useState<Schedule[]>([]
  );
  const [airportDetails, setAirportDetails] = useState<
    { label: string; value: string }[]
  >([]);




  async function fetchInitialAirport() {

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + accessToken);
    myHeaders.append("Content-Type", "application/json");

    const response = await fetch(api_base_url + "/api/airport", {
      method: "get",
      headers: myHeaders,
    });
    const responseJson = await response.json();
    if (response.status !== 200) {
      alert("error: " + responseJson.message);
      return;
    }
    // make Sure this ok ==============
    setAirports(responseJson.data["airports"]);

    const det = airports.map((val) => {
      return { label: val.name ?? "", value: val.id ?? "" };
    });
    setAirportDetails(det);
    setFromAirportDetails(det);
    setToAirportDetails(det);
  }

  useRef(() => {

  })

  useEffect(() => {
    fetchInitialAirport();
    handleSearch();
  }), [];

  const cabinClass = [{
    "name": "ECONOMY",
    "id": "78324468-f3a8-45a2-b0bb-393979ad98ef"
  },
  {
    "name": "BUSINESS",
    "id": "c7697502-59af-42c1-ae07-cb4839207c2a"
  },
  {
    "name": "FIRST",
    "id": "16ca89c7-242d-4f5f-aabc-43504c4d4bfb"
  }
  ]

  const ticketType = [{
    "name": "SAVER",
    "id": "228aaef8-8dd1-45fa-8b0d-7b8e03abc765"
  },
  {
    "name": "FLEXI",
    "id": "1bed4209-2022-4f46-ab59-516a1ae6af15"
  },
  {
    "name": "PLUS",
    "id": "abe66727-0be4-405b-8b9b-f4798f5ab1a1"
  }
  ]

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/">
          Items
        </a>
      ),
    },
  ];

  const handleSignUp = () => {
    navigate("/signup");
  };

  const [cabin, setCabin] = useState<number>(1);

  const changeSeats = (targetMap: Map<string, number>) => {
    setSeat(targetMap);
  };

  const changeCabin = (target: number) => {
    setCabin(target);
  };

  const onDepartureDatePick: DatePickerProps["onChange"] = (date) => {
    setDepartureDate(date!);
    console.log(departureDate?.toISOString() ?? "");
  };
  const onReturnDatePick: DatePickerProps["onChange"] = (date) => {
    setReturnDate(date!);
    console.log(returnDate?.toISOString() ?? "");
  };
  const dateFormat = "dddd, DD MMM YYYY";

  const customFormat: DatePickerProps["format"] = (value) =>
    value.format(dateFormat);


  const fromChange = (value: string) => {
    setFromAirport(
      airports.find((obj) => {
        return (obj.id == value);
      })!
    );
  };
  const toChange = (value: string) => {
    setToAirport(
      airports.find((obj) => {
        return (obj.id == value);
      })!
    );

  };

  const fromSearch = (value: string) => {
    setFromAirportDetails(
      airportDetails.filter((obj) => {
        return obj.label.includes(value);
      })
    );
  };

  const toSearch = (value: string) => {
    setToAirportDetails(
      airportDetails.filter((obj) => {
        return obj.label.includes(value);
      })
    );
  };
  const handleSearch = async () => {

    console.log("Searching...", dayjs.isDayjs(departureDate));
    //case found:
    const url = new URL(api_base_url + "/api/schedule-detail/getSchedules");
    url.searchParams.append("cabinClassId", cabinClass[0].id);
    url.searchParams.append("ticketTypeId", ticketType[0].id);
    url.searchParams.append("date", departureDate?.format("YYYY-MM-DD") ?? "");
    url.searchParams.append("fromAirportId", fromAirport?.id ?? "");
    url.searchParams.append("toAirportId", toAirport?.id ?? "");

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + accessToken);
    myHeaders.append("Content-Type", "application/json");

    const response = await fetch(url.toString(), {
      method: "get",
      headers: myHeaders,
    });
    console.log(response);
    const responseJson = await response.json();
    if (response.status !== 200) {
      alert("error: " + responseJson.message);
      return;
    }
    // implement get schedules ==============
    setSchedules(responseJson["schedules"]);
    setPage(1);
    if (responseJson["schedules"]) {

      setScheduleToRender(schedules.slice((page - 1) * 4, page * 4 - 1));
    }
  };
  const onChangePage: PaginationProps["onShowSizeChange"] = (current) => {
    console.log(page);
    setPage(current);
    setScheduleToRender(schedules.slice((page - 1) * 4, page * 4 - 1));
  };

  const onChange = (e: RadioChangeEvent) => {
    setTrip(e.target.value);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#38A993",
          borderRadius: 2,
          colorPrimaryTextHover: "#38A993",

          // Alias Token
          colorBgContainer: "#f6ffed",
        },
      }}
    >
      <Layout className="">
        <Header
          style={{
            top: 0,
            zIndex: 1,
            paddingTop: "4px",
            paddingBottom: "8px",
            position: "sticky",
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <div className="justify-around flex w-full">
            <div className="justify-start items-center gap-8 flex">
              <Logo></Logo>
              <div className="justify-start items-start gap-6 flex">
                <div className="text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                  Explore
                </div>
                <div className="text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                  Status
                </div>
                <Dropdown
                  className="flex hover:text-primary text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7"
                  menu={{ items }}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <div className="pr-2">Cabin</div>
                    <DownOutlined />
                  </a>
                </Dropdown>
                <Dropdown
                  className="flex hover:text-primary text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7 "
                  menu={{ items }}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <div className="pr-2">Baggage</div>
                    <DownOutlined />
                  </a>
                </Dropdown>
              </div>
            </div>
            <div className="gap-8 flex">
              <a className="snap-center self-center align-middle hover:text-primary text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                <div className="justify-start items-center gap-4 flex">
                  <ReactCountryFlag countryCode="ID" svg />
                  <div className="">IDR</div>
                  <DownOutlined />
                </div>
              </a>

              {token ? (
                <div className="snap-center self-center align-middle hover:text-primary text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                  <SkeletonAvatar className="mr-4" />
                  AAAAA
                  <DownOutlined />
                </div>
              ) : (
                <button
                  onClick={handleSignUp}
                  type="submit"
                  className="my-4 justify-center rounded-md bg-primary disabled:bg-gray-400 hover:bg-primary-dark px-3 py-1.5 text-base font-bold leading-6 text-white shadow-sm"
                >
                  <p className="self-stretch text-center text-white text-base font-bold font-['Plus Jakarta Sans'] leading-normal p-2">
                    Sign Up
                  </p>
                </button>
              )}
            </div>
          </div>
        </Header>

        <Content className="flex-col">
          <div
            style={{
              position: "sticky",
              display: "flex",
              alignItems: "center",
            }}
            className="w-full px-8 py-6  bg-white border border-gray-100 flex-col justify-center items-start gap-6 inline-flex"
          >
            <div className="w-full self-stretch items-center gap-6 inline-flex">
              <div className="justify-start items-start gap-9 flex">
                <Radio.Group
                  buttonStyle="outline"
                  size="large"
                  className="text-primary"
                  defaultValue={trip}
                  onChange={onChange}
                >
                  <Radio value="one-way">
                    <p className="text-primary text-base font-semibold font-['Plus Jakarta Sans'] leading-normal">
                      One - Way
                    </p>
                  </Radio>
                  <Radio value="round">
                    <p className="text-primary text-base font-semibold font-['Plus Jakarta Sans'] leading-normal">
                      Round Trip
                    </p>
                  </Radio>
                </Radio.Group>
                <Divider type="vertical" className="h-6"></Divider>
                <Dropdown
                  trigger={["click"]}
                  className="gap-4 flex"
                  menu={{}}
                  dropdownRender={() => (
                    <PassengerField
                      seats={seat}
                      onChange={(target) => {
                        changeSeats(target);
                      }}
                    ></PassengerField>
                  )}
                >
                  <a
                    className="hover:text-primary"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Space>
                      <TeamOutlined style={{ fontSize: 24 }} />
                      <div className="text-base font-semibold font-['Plus Jakarta Sans'] leading-normal">
                        Seats
                      </div>
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
                <Dropdown
                  trigger={["click"]}
                  className="gap-4 flex"
                  dropdownRender={() => (
                    <CabinField
                      chosen={cabin}
                      onChange={(target) => {
                        changeCabin(target);
                      }}
                    ></CabinField>
                  )}
                >
                  <a
                    className="hover:text-primary"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Space>
                      <DollarOutlined style={{ fontSize: 24 }} />
                      <div className="text-base font-semibold font-['Plus Jakarta Sans'] leading-normal">
                        {cabin == 1 ? (
                          <>Economy</>
                        ) : cabin == 2 ? (
                          <>Business</>
                        ) : (
                          <>First</>
                        )}
                      </div>
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </div>
            </div>
            <div className="self-stretch justify-start items-center gap-6 inline-flex">
              <div className="grow shrink basis-0 justify-start items-center gap-3 flex">
                <div className=" justify-center flex-grow items-center gap-2 flex">
                  <div className="flex-grow basis-0 flex-col justify-start items-start gap-2 inline-flex">
                    <div className="bg-white justify-start items-start gap-2.5 inline-flex">
                      <div className="text-gray-500 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                        From
                      </div>
                    </div>
                    <div className="px-5 py-[8px] w-full rounded-xl border border-gray-100 justify-start items-center inline-flex">
                      <Select
                        showSearch
                        bordered={false}
                        title="Where From"
                        placeholder="Where From ?"
                        dropdownStyle={{
                          backgroundColor: "white",
                          width: "fit-content",
                          padding: "24px",
                        }}
                        style={{
                          color: "white",
                          borderColor: "transparent",
                          border: "0px solid",
                          backgroundColor: "transparent",
                        }}
                        className="w-full"
                        value={
                          fromAirport == undefined
                            ? null
                            : fromAirport.name
                        }
                        optionFilterProp="children"
                        onChange={fromChange}
                        onSearch={fromSearch}
                        filterOption={filterOption}
                        options={fromAirportDetails}
                        notFoundContent={
                          <>
                            <img
                              className="p-8 w-[430px]"
                              src="src/assets/not-found.svg"
                            ></img>
                          </>
                        }
                        optionRender={(_, i) => {
                          const target = toAirportDetails[i.index];
                          const a = airports.find(
                            (a) => a.id == target.value
                          );
                          return (
                            <div className="w-[382px] h-[68px] py-2 justify-center items-center gap-4 inline-flex">
                              <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                                <div className="text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                                  {a?.city ?? ""}, Indonesia
                                </div>
                                <div className="text-center text-neutral-900 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">
                                  {a?.name}
                                </div>
                              </div>
                              <div className="p-2 bg-emerald-100 rounded flex-col justify-center items-center gap-1 inline-flex">
                                <div className="text-center text-teal-700 text-xl font-bold font-['Plus Jakarta Sans'] leading-7">
                                  {a?.abv}
                                </div>
                              </div>
                            </div>
                          );
                        }}
                      />
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      const temp = fromAirport;
                      setFromAirport(toAirport);
                      setToAirport(temp);
                    }}
                    className=""
                    type="primary"
                    style={{ backgroundColor: "#38A993" }}
                    shape="circle"
                    icon={<SwapOutlined />}
                    size="large"
                  />
                  <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                    <div className="bg-white justify-start items-start gap-2.5 inline-flex">
                      <div className="text-gray-500 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                        To
                      </div>
                    </div>
                    <div className="px-5 w-full py-[8px] rounded-xl border border-gray-100 justify-start items-center inline-flex">
                      <Select
                        bordered={false}
                        title="To"
                        dropdownStyle={{
                          backgroundColor: "white",
                          padding: "24px",
                          width: "fit-content",
                        }}
                        value={toAirport == undefined ? null : toAirport.name}
                        showSearch
                        className="w-full"
                        placeholder="Where to ?"
                        optionFilterProp="children"
                        onChange={toChange}
                        onSearch={toSearch}
                        style={{
                          color: "white",
                          borderColor: "transparent",
                          border: "0px solid",
                          backgroundColor: "transparent",
                        }}
                        options={toAirportDetails}
                        notFoundContent={
                          <>
                            <img
                              className="p-4 w-[430px]"
                              src="src/assets/not-found.svg"
                            ></img>
                          </>
                        }
                        filterOption={filterOption}
                        optionRender={(_, i) => {
                          const target = toAirportDetails[i.index];
                          const a = airports.find(
                            (a) => a.id == target.value
                          );
                          return (
                            <div className="w-[382px] h-[68px] py-2 justify-center items-center gap-4 inline-flex">
                              <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                                <div className="text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                                  {a?.city ?? ""}, Indonesia
                                </div>
                                <div className="text-center text-neutral-900 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">
                                  {a?.name}
                                </div>
                              </div>
                              <div className="p-2 bg-emerald-100 rounded flex-col justify-center items-center gap-1 inline-flex">
                                <div className="text-center text-teal-700 text-xl font-bold font-['Plus Jakarta Sans'] leading-7">
                                  {a?.abv}
                                </div>
                              </div>
                            </div>
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
                {trip == "one-way" ? (
                  <div className="grow shrink basis-0 justify-start items-center gap-3 flex">
                    <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                      <div className="px-2 bg-white justify-start items-start gap-2.5 inline-flex">
                        <div className="text-gray-500 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                          Departure Date
                        </div>
                      </div>

                      <div className="self-stretch px-5 py-[8px] rounded-xl border border-gray-100 justify-start items-center gap-3 inline-flex">
                        <DatePicker
                          value={departureDate}
                          onChange={onDepartureDatePick}
                          style={{ width: "100%" }}
                          className="text-neutral-900 text-base font-semibold font-['Plus Jakarta Sans'] leading-normal"
                          bordered={false}
                          format={customFormat}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-row ">
                    <div className="grow shrink basis-0 flex-col  justify-start items-start mr-3 gap-2 inline-flex">
                      <div className="bg-white justify-start items-start inline-flex">
                        <div className="text-gray-500 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                          Departure Date
                        </div>
                      </div>

                      <div className="py-[8px] rounded-xl border border-gray-100 justify-start items-center">
                        <DatePicker
                          onChange={onDepartureDatePick}
                          style={{ width: "100%" }}
                          className="text-neutral-900 text-base font-semibold font-['Plus Jakarta Sans'] leading-normal"
                          bordered={false}
                          format={customFormat}
                        />
                      </div>
                    </div>
                    <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                      <div className="bg-white justify-start items-start inline-flex">
                        <div className="text-gray-500 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                          Return Date
                        </div>
                      </div>

                      <div className="py-[8px] rounded-xl border border-gray-100 justify-start items-center">
                        <DatePicker
                          onChange={onReturnDatePick}
                          style={{ width: "100%" }}
                          className="text-neutral-900 text-base font-semibold font-['Plus Jakarta Sans'] leading-normal"
                          bordered={false}
                          format={customFormat}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={handleSearch}
                type="submit"
                className="my-4 justify-center rounded-xl flex-col bg-primary disabled:bg-gray-400 hover:bg-primary-dark px-3 py-1.5 text-base font-bold leading-6 text-white shadow-sm"
              >
                <p className="self-stretch text-center text-white text-base font-bold font-['Plus Jakarta Sans'] leading-normal p-2">
                  Search Flights
                </p>
              </button>
              ,
            </div>
          </div>
          {schedules?.length != 0 ? (
            <div className="flex-col min-h-[50vh]">
              <img
                className="p-8 m-auto w-[430px]"
                src="src/assets/not-found.svg"
              ></img>
            </div>
          ) : (
            <div className="flex w-full">
              <div className="w-full flex-col justify-center items-center gap-5 inline-flex py-8">
                {scheduleToRender.map((value) => {
                  const hours = Math.floor(value.duration / 60);
                  const minutes = value.duration % 60;
                  return (
                    <div className="justify-center items-center">
                      <div className=" shadow justify-center items-center inline-flex">
                        <div className="grow shrink basis-0 px-6 pb-5 bg-white rounded-xl flex-col justify-center items-center gap-2.5 inline-flex">
                          <div className="self-stretch justify-start items-end gap-[5.01px] inline-flex">
                            <div className="w-[65px] flex-col justify-start items-start gap-1 inline-flex">
                              <div className="text-neutral-900 text-2xl font-bold font-['Plus Jakarta Sans'] leading-9">
                                {value.arrivalDate.format("HH:mm")}
                              </div>
                              <div className="text-primary text-2xl font-bold font-['Plus Jakarta Sans'] leading-9">
                                CGK
                              </div>
                              <div className="self-stretch text-gray-500 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                                {value.arrivalDate.format("D MMM")}
                              </div>
                            </div>
                            <div className="grow shrink basis-0 self-stretch pt-3 flex-col justify-between items-center inline-flex">
                              <div className="text-center text-slate-800 text-[15.03px] font-medium font-['Plus Jakarta Sans'] ">
                                {" "}
                                {hours}h {minutes}m{ }
                              </div>
                              <div className="w-[225px] pt-3 justify-center items-center gap-1 inline-flex">
                                <div className="w-[16.39px] h-[15.58px] relative">
                                  <div className="w-[16.39px] h-[15.58px] left-0 top-0 absolute opacity-50 bg-primary rounded-full" />
                                  <div className="w-[9.84px] h-[9.35px] left-[3.28px] top-[3.12px] absolute bg-primary rounded-full" />
                                </div>
                                <div className="grow shrink basis-0 h-[0px] border border-gray-200"></div>
                                <div className="w-10 rotate-45 justify-center items-center flex">
                                  <img src="airplane.svg" alt="" />
                                </div>
                                <div className="grow shrink basis-0 h-[0px] border border-gray-200"></div>
                                <div className="w-[16.39px] h-[15.58px] relative">
                                  <div className="w-[16.39px] h-[15.58px] left-0 top-0 absolute opacity-50 bg-primary rounded-full" />

                                  <div className="w-[9.84px] h-[9.35px] left-[3.28px] top-[3.12px] absolute bg-primary rounded-full" />
                                </div>
                              </div>
                              <div className="text-center text-slate-800 text-[15.03px] font-medium font-['Plus Jakarta Sans'] ">
                                Direct
                              </div>
                            </div>
                            <div className="w-[61px] flex-col justify-start items-end gap-1 inline-flex">
                              <div className="text-right text-neutral-900 text-2xl font-bold font-['Plus Jakarta Sans'] leading-9">
                                {value.arrivalDate
                                  .add(value.duration, "minute")
                                  .format("HH:mm")}
                              </div>
                              <div className="text-right text-primary text-2xl font-bold font-['Plus Jakarta Sans'] leading-9">
                                SIN
                              </div>
                              <div className="self-stretch text-right text-gray-500 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                                {value.arrivalDate
                                  .add(value.duration, "minute")
                                  .format("D MMM")}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="self-stretch px-6 py-5 bg-white rounded-xl flex-col justify-center items-start gap-3 inline-flex">
                          <div className="self-stretch justify-start items-center gap-2 inline-flex">
                            <div className="w-[31.60px] h-[31.60px] relative">
                              <LogoImage />
                            </div>
                            <div className="flex-col justify-center items-start inline-flex">
                              <div className="text-center text-neutral-900 text-xs font-semibold font-['Plus Jakarta Sans'] leading-none">
                                SE 955
                              </div>
                              <div className="text-center text-gray-500 text-xs font-light font-['Plus Jakarta Sans'] leading-none">
                                Boeing 777-300ER
                              </div>
                            </div>
                          </div>
                          <div className="self-stretch justify-start items-center gap-1 inline-flex">
                            <div className="text-primary text-xl font-bold font-['Plus Jakarta Sans'] leading-7">
                              IDR 1,950K
                            </div>
                            <div className="text-gray-500 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">
                              /pax
                            </div>
                          </div>
                        </div>
                      </div>
                      <Pagination
                        className="text-center pt-8"
                        onChange={onChangePage}
                        defaultCurrent={1}
                        total={schedules.length}
                        pageSize={4}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Content>

        <Footer
          style={{
            padding: 0,
          }}
        >
          <HomeFooter />
        </Footer>
      </Layout>{" "}
    </ConfigProvider>
  );
};

export default Index;
