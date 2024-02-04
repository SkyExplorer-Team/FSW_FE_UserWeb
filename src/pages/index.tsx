import React, { useState } from "react";
import Logo from "../components/Logo";
import { Button, ConfigProvider, DatePicker, DatePickerProps, Divider, Dropdown, Layout, Radio, RadioChangeEvent, Select, Space } from "antd";
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



const Index: React.FC = () => {
    const token = localStorage.getItem(
        'access_token',
    );


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

    const navigate = useNavigate();

    const dateFormat = 'dddd, DD MMM YYYY';

    const customFormat: DatePickerProps['format'] = (value) =>
        value.format(dateFormat);


    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            ),
        },
    ];

    const handleSignUp = () => {
        navigate("/signup")
    };

    const handleSearch = () => {
        console.log("Searching...");
    };



    const [trip, setTrip] = useState<string>('one-way');

    const onChange = (e: RadioChangeEvent) => {
        setTrip(e.target.value);
    };
    const fromChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const fromSearch = (value: string) => {
        console.log('search:', value);
    };

    // Filter `option.label` match the user type `input`
    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


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
                            <div className="absolute bottom left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                                <div className=" p-6 w-[1080px] bg-white rounded-[20px] shadow border border-gray-200 flex-col justify-center items-start gap-6 inline-flex">
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
                                        <div className="grow shrink basis-0 justify-start items-center gap-6 flex">
                                            <div className="justify-center items-center gap-6 flex">
                                                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                                    <div className="px-2 bg-white justify-start items-start gap-2.5 inline-flex">
                                                        <div className="text-gray-500 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">From</div>
                                                    </div>
                                                    <div className="px-5 py-[8px] rounded-xl border border-gray-100 justify-start items-center inline-flex">

                                                        <Select
                                                            showSearch
                                                            bordered={false}
                                                            title="From"
                                                            dropdownStyle={{ backgroundColor: 'white' }}
                                                            style={{
                                                                color: 'white',
                                                                borderColor: 'transparent',
                                                                border: '0px solid',
                                                                backgroundColor: 'transparent',
                                                            }}

                                                            placeholder="Select a person"
                                                            optionFilterProp="children"
                                                            onChange={fromChange}
                                                            onSearch={fromSearch}
                                                            filterOption={filterOption}
                                                            options={[
                                                                {
                                                                    value: 'jack',
                                                                    label: 'Jack',
                                                                },
                                                                {
                                                                    value: 'lucy',
                                                                    label: 'Lucy',
                                                                },
                                                                {
                                                                    value: 'tom',
                                                                    label: 'Tom',
                                                                },
                                                            ]}
                                                        />

                                                    </div>
                                                </div>
                                                <Button className="" type="primary" style={{ backgroundColor: "#38A993" }} shape="circle" icon={<SwapOutlined />} size="large" />
                                                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                                    <div className="px-2 bg-white justify-start items-start gap-2.5 inline-flex">
                                                        <div className="text-gray-500 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">To</div>
                                                    </div>
                                                    <div className="px-5 py-[8px] rounded-xl border border-gray-100 justify-start items-center inline-flex">

                                                        <Select
                                                            bordered={false}
                                                            title="To"
                                                            dropdownStyle={{ backgroundColor: 'white' }}
                                                            style={{
                                                                color: 'white',
                                                                borderColor: 'transparent',
                                                                border: '0px solid',
                                                                backgroundColor: 'transparent',
                                                            }}
                                                            showSearch
                                                            placeholder="Select a person"
                                                            optionFilterProp="children"
                                                            onChange={fromChange}
                                                            onSearch={fromSearch}
                                                            filterOption={filterOption}
                                                            options={[
                                                                {
                                                                    value: 'jack',
                                                                    label: 'Jack',
                                                                },
                                                                {
                                                                    value: 'lucy',
                                                                    label: 'Lucy',
                                                                },
                                                                {
                                                                    value: 'tom',
                                                                    label: 'Tom',
                                                                },
                                                            ]}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grow shrink basis-0 justify-start items-center gap-6 flex">
                                                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                                    <div className="px-2 bg-white justify-start items-start gap-2.5 inline-flex">
                                                        <div className="text-gray-500 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">Departure Date</div>
                                                    </div>

                                                    <div className="self-stretch px-5 py-[8px] rounded-xl border border-gray-100 justify-start items-center gap-3 inline-flex">


                                                        <DatePicker style={{ width: "100%" }} className="text-neutral-900 text-base font-semibold font-['Plus Jakarta Sans'] leading-normal" bordered={false} format={customFormat} />

                                                    </div>
                                                </div>
                                            </div>
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
