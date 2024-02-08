import React, { useEffect, useRef, useState } from "react";
import Logo from "../components/Logo";
import { Button, ConfigProvider, DatePicker, DatePickerProps, Divider, Dropdown, Layout, Pagination, PaginationProps, Radio, RadioChangeEvent, Select, Space } from "antd";
import { MenuProps } from "antd/lib";
import { DownOutlined, TeamOutlined, DollarOutlined, SwapOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ReactCountryFlag from "react-country-flag"
import { useNavigate } from "react-router-dom";
import PassengerField from '../components/passenger_field';
import CabinField from "../components/cabin_field";
import SkeletonAvatar from "antd/lib/skeleton/Avatar";
import HomeInfo1 from "../components/home_info1";
import HomeFooter from "../components/home_footer";

dayjs.extend(customParseFormat);

const { Header, Content, Footer } = Layout;


const api_base_url = "https://be-java-production.up.railway.app"


interface Airport {
    nationalId: string;
    name: string;
    abv: string;
    lat: number | null;
    long: number | null;
}

interface Schedule {
    name: string;
    departureDate: dayjs.Dayjs;
    plane: string;
    arrivalDate: dayjs.Dayjs;
    duration: number;
}

const Index: React.FC = () => {
    const token = localStorage.getItem(
        'access_token',
    );

    let airports: Airport[] = [];
    let fromAirportDetails: { "label": string, "value": string }[] = [];
    let toAirportDetails: { "label": string, "value": string }[] = [];
    let fromAirport!: Airport;
    let toAirport!: Airport;
    let departureDate: dayjs.Dayjs;
    let returnDate: dayjs.Dayjs;
    let schedules: Schedule[] = [];
    async function fetchInitialAirport() {
        const payload = {}

        const response = await fetch(
            api_base_url + "/api/airport",
            {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            }
        );
        console.log(response)
        const responseJson = await response.json();
        if (response.status !== 200) {
            alert('error: ' + responseJson.message);
            return;
        }
        // make Sure this ok ==============
        console.log(responseJson);
        console.log("responseJson");

        airports = responseJson['Airport']
    }
    let accessToken: string | null;
    useRef(() => {
        accessToken = localStorage.getItem(
            'access_token',
        );
    })
    useEffect(() => {

        console.log(accessToken)
        // if (accessToken === null) {
        //     navigate('/login')
        // }
        fetchInitialAirport()

        airports.map((val) => {
            fromAirportDetails.push({ label: val.name, value: val.nationalId })
            toAirportDetails.push({ label: val.name, value: val.nationalId })
        })



    })

    const [seat, setSeat] = useState(new Map<string, number>(
        [
            ["adults", 0],
            ["children", 0],
            ["infant", 0]
        ]
    ));

    const [cabin, setCabin] = useState<number>(1);

    const changeSeats = (targetMap: Map<string, number>) => {
        setSeat(targetMap);
    }

    const changeCabin = (target: number) => {
        setCabin(target);
    }

    const onDepartureDatePick: DatePickerProps['onChange'] = (date) => {
        departureDate = date!;
        console.log(departureDate.toISOString());
    };
    const onReturnDatePick: DatePickerProps['onChange'] = (date) => {
        returnDate = date!;
        console.log(returnDate.toISOString());
    };

    const navigate = useNavigate();

    const dateFormat = 'dddd, DD MMM YYYY';

    const customFormat: DatePickerProps['format'] = (value) =>
        value.format(dateFormat);

    const fromChange = (value: string) => {
        fromAirport = airports.find((obj) => {
            return obj.name = value;
        })!

        console.log(`selected ${fromAirport.name} ${fromAirport.abv}`);
    };
    const toChange = (value: string) => {
        toAirport = airports.find((obj) => {
            return obj.name = value;
        })!

        console.log(`selected ${toAirport.name} ${toAirport.abv}`);
    };

    const fromSearch = (value: string) => {
        fromAirportDetails = fromAirportDetails.filter((obj) => {
            return obj.label.includes(value)
        })
        console.log('search:', value);
    };

    const toSearch = (value: string) => {
        toAirportDetails = toAirportDetails.filter((obj) => {
            return obj.label.includes(value)
        })

        console.log('search:', value);
    };


    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="/">
                    Items
                </a>
            ),
        },
    ];

    const handleSignUp = () => {
        navigate("/signup")
    };

    const handleSearch = async () => {
        console.log("Searching...");
        //case found:
        const payload = {}

        const url = new URL(api_base_url + "/schedule-detail/getSchedules")
        url.searchParams.append("cabinClassId", "1")
        url.searchParams.append("ticketTypeId", "1")
        url.searchParams.append("date", departureDate.toISOString())
        url.searchParams.append("fromAirportId", fromAirport.nationalId)
        url.searchParams.append("toAirportId", toAirport.nationalId)


        const response = await fetch(
            url.toString(),
            {

                method: 'get',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            }
        );
        console.log(response)
        const responseJson = await response.json();
        if (response.status !== 200) {
            alert('error: ' + responseJson.message);
            return;
        }
        // implement get schedules ==============
        schedules = responseJson['schedules'];
        setPage(1)
        setScheduleToRender(schedules.slice((page - 1) * 4, (page * 4) - 1))

    };

    const [page, setPage] = useState<number>(1);
    const [scheduleToRender, setScheduleToRender] = useState<Schedule[]>(schedules.slice(0, 3));
    const onChangePage: PaginationProps['onShowSizeChange'] = (current) => {
        console.log(page);
        setPage(current)
        setScheduleToRender(schedules.slice((page - 1) * 4, (page * 4) - 1))
    };



    const [trip, setTrip] = useState<string>('one-way');

    const onChange = (e: RadioChangeEvent) => {
        setTrip(e.target.value);
    };



    return (
        <ConfigProvider
            theme={{
                token: {
                    // Seed Token
                    colorPrimary: "#38A993",
                    borderRadius: 2,
                    colorPrimaryTextHover: "#38A993",

                    // Alias Token
                    colorBgContainer: '#f6ffed',

                },
            }}
        >
            <Layout>
                <Header style={{
                    top: 0, zIndex: 1, marginBottom: "12px", paddingTop: "4px", paddingBottom: "8px", position: 'sticky', display: 'flex', alignItems: 'center', backgroundColor: "white",
                }}>
                    <div className="justify-around flex w-full">

                        <div className="justify-start items-center gap-8 flex">
                            <Logo></Logo>
                            <div className="justify-start items-start gap-6 flex">
                                <div className="text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">Explore</div>
                                <div className="text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">Status</div>
                                <Dropdown className="flex hover:text-[#38A993] text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7" menu={{ items }}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <div className="pr-2">Cabin</div>
                                        <DownOutlined />
                                    </a>
                                </Dropdown>
                                <Dropdown className="flex hover:text-[#38A993] text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7 " menu={{ items }}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <div className="pr-2">Baggage</div>
                                        <DownOutlined />
                                    </a>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="gap-8 flex">
                            <a className="snap-center self-center align-middle hover:text-[#38A993] text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                                <div className="justify-start items-center gap-4 flex">
                                    <ReactCountryFlag
                                        countryCode="ID"
                                        svg
                                    />
                                    <div className="">IDR</div>
                                    <DownOutlined />
                                </div>
                            </a>

                            {
                                token ?
                                    <div className="snap-center self-center align-middle hover:text-[#38A993] text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                                        <SkeletonAvatar className="mr-4" />
                                        AAAAA
                                        <DownOutlined />
                                    </div> :
                                    <button
                                        onClick={handleSignUp}
                                        type="submit"
                                        className="my-4 justify-center rounded-md bg-primary disabled:bg-gray-400 hover:bg-primary-dark px-3 py-1.5 text-base font-bold leading-6 text-white shadow-sm">
                                        <p className="self-stretch text-center text-white text-base font-bold font-['Plus Jakarta Sans'] leading-normal p-2">
                                            Sign Up
                                        </p>
                                    </button>
                            }

                        </div>
                    </div>
                </Header>
                <Content>
                    <div>
                        {/* div infront */}
                        <div className="relative">
                            <img className="w-full" src="src/assets/Illustration.svg" ></img>
                            <div className="absolute w-full m-auto -bottom-[10%] snap-center self-center text-center ">
                                <div className=" p-6  bg-white rounded-[20px] shadow border border-gray-200 flex-col justify-center items-start gap-6 inline-flex">
                                    <div className="self-stretch justify-start items-center gap-6 inline-flex">
                                        <div className="justify-start items-start gap-9 flex">
                                            <Radio.Group buttonStyle="outline" size="large" className="text-[#38A993]" defaultValue={trip} onChange={onChange}>
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
                                            <Dropdown trigger={["click"]} className="gap-4 flex" menu={{}}
                                                dropdownRender={() => (
                                                    <PassengerField
                                                        seats={seat}

                                                        onChange={(target) => {
                                                            changeSeats(target)
                                                        }}
                                                    >

                                                    </PassengerField>
                                                )}
                                            >
                                                <a className="hover:text-[#38A993]" onClick={(e) => e.preventDefault()}>
                                                    <Space>
                                                        <TeamOutlined style={{ fontSize: 24 }} />
                                                        <div className="text-base font-semibold font-['Plus Jakarta Sans'] leading-normal">1 Seats</div>
                                                        <DownOutlined />
                                                    </Space>
                                                </a>
                                            </Dropdown>
                                            <Dropdown trigger={["click"]} className="gap-4 flex"
                                                dropdownRender={() => (
                                                    <CabinField chosen={
                                                        cabin
                                                    }
                                                        onChange={(target) => { changeCabin(target) }}
                                                    >

                                                    </CabinField>
                                                )}
                                            >
                                                <a className="hover:text-[#38A993]" onClick={(e) => e.preventDefault()}>
                                                    <Space>
                                                        <DollarOutlined style={{ fontSize: 24 }} />
                                                        <div className="text-base font-semibold font-['Plus Jakarta Sans'] leading-normal">Economy</div>
                                                        <DownOutlined />
                                                    </Space>
                                                </a>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    <div className="self-stretch justify-start items-center gap-6 inline-flex">
                                        <div className="grow shrink basis-0 justify-start items-center gap-3 flex">
                                            <div className=" justify-center items-center gap-2 flex">
                                                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                                    <div className="bg-white justify-start items-start gap-2.5 inline-flex">
                                                        <div className="text-gray-500 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">From</div>
                                                    </div>
                                                    <div className="px-5 py-[8px] rounded-xl border border-gray-100 justify-start items-center inline-flex">
                                                        <Select
                                                            showSearch
                                                            bordered={false}
                                                            title="Where From"
                                                            placeholder="Where From ?"
                                                            dropdownStyle={{ backgroundColor: 'white', width: 'fit-content', padding: '24px' }}
                                                            style={{
                                                                color: 'white',
                                                                borderColor: 'transparent',
                                                                border: '0px solid',
                                                                backgroundColor: 'transparent',
                                                            }}
                                                            value={fromAirport == undefined ? null : fromAirport.name}
                                                            optionFilterProp="children"
                                                            onChange={fromChange}
                                                            onSearch={fromSearch}
                                                            filterOption={filterOption}
                                                            options={fromAirportDetails}
                                                            notFoundContent={<>
                                                                <img className="p-8 w-[430px]" src="src/assets/not-found.svg">
                                                                </img>
                                                            </>}
                                                            optionRender={(option) => {
                                                                return <div>
                                                                    {
                                                                        option.value
                                                                    }
                                                                </div>
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <Button onClick={() => {
                                                    const temp = fromAirport;
                                                    fromAirport = toAirport
                                                    toAirport = temp
                                                }}
                                                    className="" type="primary" style={{ backgroundColor: "#38A993" }} shape="circle" icon={<SwapOutlined />} size="large" />
                                                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                                    <div className="bg-white justify-start items-start gap-2.5 inline-flex">
                                                        <div className="text-gray-500 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">To</div>
                                                    </div>
                                                    <div className="px-5 py-[8px] rounded-xl border border-gray-100 justify-start items-center inline-flex">

                                                        <Select
                                                            bordered={false}
                                                            title="To"
                                                            dropdownStyle={{ backgroundColor: 'white', padding: '24px', width: 'fit-content' }}
                                                            value={toAirport == undefined ? null : toAirport.name}
                                                            showSearch
                                                            placeholder="Select a person"
                                                            optionFilterProp="children"
                                                            onChange={toChange}
                                                            onSearch={toSearch}
                                                            style={{
                                                                color: 'white',
                                                                borderColor: 'transparent',
                                                                border: '0px solid',
                                                                backgroundColor: 'transparent',
                                                            }}
                                                            notFoundContent={<>
                                                                <img className="p-4 w-[430px]" src="src/assets/not-found.svg">
                                                                </img>
                                                            </>}
                                                            filterOption={filterOption}
                                                            optionRender={(option) => {
                                                                console.log(option.value)
                                                                return <div className="w-[382px] h-[68px] py-2 justify-center items-center gap-4 inline-flex">
                                                                    <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                                                                        <div className="text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">Jakarta, Indonesia</div>
                                                                        <div className="text-center text-neutral-900 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">Soekarno Hatta International</div>
                                                                    </div>
                                                                    <div className="p-2 bg-emerald-100 rounded flex-col justify-center items-center gap-1 inline-flex">
                                                                        <div className="text-center text-teal-700 text-xl font-bold font-['Plus Jakarta Sans'] leading-7">CGK</div>
                                                                    </div>
                                                                </div>
                                                            }}
                                                            options={toAirportDetails}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {trip == "one-way" ?
                                                <div className="grow shrink basis-0 justify-start items-center gap-3 flex">
                                                    <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                                        <div className="px-2 bg-white justify-start items-start gap-2.5 inline-flex">
                                                            <div className="text-gray-500 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">Departure Date</div>
                                                        </div>

                                                        <div className="self-stretch px-5 py-[8px] rounded-xl border border-gray-100 justify-start items-center gap-3 inline-flex">


                                                            <DatePicker onChange={onDepartureDatePick} style={{ width: "100%" }} className="text-neutral-900 text-base font-semibold font-['Plus Jakarta Sans'] leading-normal" bordered={false} format={customFormat} />

                                                        </div>
                                                    </div>
                                                </div> :
                                                <div className="flex-row ">
                                                    <div className="grow shrink basis-0 flex-col  justify-start items-start mr-3 gap-2 inline-flex">
                                                        <div className="bg-white justify-start items-start inline-flex">
                                                            <div className="text-gray-500 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">Departure Date</div>
                                                        </div>

                                                        <div className="py-[8px] rounded-xl border border-gray-100 justify-start items-center">


                                                            <DatePicker onChange={onDepartureDatePick} style={{ width: "100%" }} className="text-neutral-900 text-base font-semibold font-['Plus Jakarta Sans'] leading-normal" bordered={false} format={customFormat} />

                                                        </div>
                                                    </div>
                                                    <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                                        <div className="bg-white justify-start items-start inline-flex">
                                                            <div className="text-gray-500 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">Return Date</div>
                                                        </div>

                                                        <div className="py-[8px] rounded-xl border border-gray-100 justify-start items-center">


                                                            <DatePicker onChange={onReturnDatePick} style={{ width: "100%" }} className="text-neutral-900 text-base font-semibold font-['Plus Jakarta Sans'] leading-normal" bordered={false} format={customFormat} />

                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <button
                                            onClick={handleSearch}
                                            type="submit"
                                            className="my-4 justify-center rounded-xl flex-col bg-primary disabled:bg-gray-400 hover:bg-primary-dark px-3 py-1.5 text-base font-bold leading-6 text-white shadow-sm">
                                            <p className="self-stretch text-center text-white text-base font-bold font-['Plus Jakarta Sans'] leading-normal p-2">
                                                Search Flights
                                            </p>
                                        </button>,
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-32"></div>
                    {
                        schedules.length != 0 ? <div></div> :
                            <div className="flex w-full">
                                <div className="w-full flex-col justify-center items-center gap-5 inline-flex py-8">
                                    {
                                        // Make Sure schedule to render is implemented
                                        scheduleToRender.map(() => {
                                            return <div className="w-[646px] shadow justify-center items-center inline-flex">
                                                <div className="grow shrink basis-0 px-6 py-5 bg-white rounded-xl flex-col justify-center items-center gap-2.5 inline-flex">
                                                    <div className="self-stretch justify-start items-end gap-[5.01px] inline-flex">
                                                        <div className="w-[65px] flex-col justify-start items-start gap-1 inline-flex">
                                                            <div className="text-neutral-900 text-2xl font-bold font-['Plus Jakarta Sans'] leading-9">10:25</div>
                                                            <div className="text-emerald-400 text-2xl font-bold font-['Plus Jakarta Sans'] leading-9">CGK</div>
                                                            <div className="self-stretch text-gray-500 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">16 Jan</div>
                                                        </div>
                                                        <div className="grow shrink basis-0 self-stretch pt-3 flex-col justify-between items-center inline-flex">
                                                            <div className="text-center text-slate-800 text-[15.03px] font-medium font-['Inter']">1h 45m</div>
                                                            <div className="w-[225px] py-3 justify-center items-center gap-1 inline-flex">
                                                                <div className="w-[16.39px] h-[15.58px] relative">
                                                                    <div className="w-[16.39px] h-[15.58px] left-0 top-0 absolute opacity-50 bg-emerald-400 rounded-full" />
                                                                    <div className="w-[9.84px] h-[9.35px] left-[3.28px] top-[3.12px] absolute bg-emerald-400 rounded-full" />
                                                                </div>
                                                                <div className="grow shrink basis-0 h-[0px] border border-gray-200"></div>
                                                                <div className="w-5 h-5 origin-top-left rotate-90 justify-center items-center flex">
                                                                    <div className="w-5 h-5 relative">
                                                                    </div>
                                                                </div>
                                                                <div className="grow shrink basis-0 h-[0px] border border-gray-200"></div>
                                                                <div className="w-[16.39px] h-[15.58px] relative">
                                                                    <div className="w-[16.39px] h-[15.58px] left-0 top-0 absolute opacity-50 bg-emerald-400 rounded-full" />
                                                                    <div className="w-[9.84px] h-[9.35px] left-[3.28px] top-[3.12px] absolute bg-emerald-400 rounded-full" />
                                                                </div>
                                                            </div>
                                                            <div className="text-center text-slate-800 text-[15.03px] font-medium font-['Inter']">Direct</div>
                                                        </div>
                                                        <div className="w-[61px] flex-col justify-start items-end gap-1 inline-flex">
                                                            <div className="text-right text-neutral-900 text-2xl font-bold font-['Plus Jakarta Sans'] leading-9">13:10</div>
                                                            <div className="text-right text-emerald-400 text-2xl font-bold font-['Plus Jakarta Sans'] leading-9">SIN</div>
                                                            <div className="self-stretch text-right text-gray-500 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">16 Jan</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="self-stretch px-6 py-5 bg-white rounded-xl flex-col justify-center items-start gap-3 inline-flex">
                                                    <div className="self-stretch justify-start items-center gap-2 inline-flex">
                                                        <div className="w-8 h-8 justify-center items-center gap-[6.62px] flex">
                                                            <div className="w-[31.60px] h-[31.60px] relative">
                                                                <div className="w-[29.79px] h-[29.79px] left-[1.10px] top-[1.10px] absolute bg-emerald-400 rounded-full" />
                                                                <div className="w-[22.34px] h-[22.34px] left-[15.95px] top-0 absolute origin-top-left rotate-[45.56deg]">
                                                                    <div className="w-[22.34px] h-[22.34px] left-0 top-[-0px] absolute">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex-col justify-center items-start inline-flex">
                                                            <div className="text-center text-neutral-900 text-xs font-semibold font-['Plus Jakarta Sans'] leading-none">SE 955</div>
                                                            <div className="text-center text-gray-500 text-xs font-medium font-['Plus Jakarta Sans'] leading-none">Boeing 777-300ER</div>
                                                        </div>
                                                    </div>
                                                    <div className="self-stretch justify-start items-center gap-1 inline-flex">
                                                        <div className="text-emerald-400 text-xl font-bold font-['Plus Jakarta Sans'] leading-7">IDR 1,950K</div>
                                                        <div className="text-gray-500 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">/pax</div>
                                                    </div>
                                                </div>
                                                <Pagination onChange={onChangePage} defaultCurrent={1} total={schedules.length} pageSize={4} />
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                    }
                    <HomeInfo1 />

                </Content>
                <Footer style={{
                    padding: 0,
                }} >
                    <HomeFooter />
                </Footer>
            </Layout >  </ConfigProvider >
    );
};

export default Index;
