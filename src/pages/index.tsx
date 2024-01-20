import React, { useState } from "react";
import Logo from "../components/Logo";
import { ConfigProvider, DatePicker, DatePickerProps, Divider, Dropdown, Layout, Menu, Radio, RadioChangeEvent, Select, Space } from "antd";
import { MenuProps } from "antd/lib";
import { DownOutlined, TeamOutlined, DollarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const { Header, Content, Footer } = Layout;


const Index: React.FC = () => {

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

                    // Alias Token
                    colorBgContainer: '#f6ffed',

                },
            }}
        >
            <Layout>
                <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: "transparent" }}>
                    <div className="justify-start items-center gap-8 flex">
                        <Logo></Logo>
                        <div className="justify-start items-start gap-6 flex">
                            <Menu>

                            </Menu>
                            <div className="text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">Explore</div>
                            <div className="text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">Status</div>
                            <div className="text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">Cabin</div>
                            <div className="text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">Baggage</div>
                        </div>
                    </div>
                    <div className="justify-start items-center gap-8 flex">
                        <div className="justify-start items-center gap-4 flex">
                            <div className="shadow flex-col justify-start items-start inline-flex">
                                <div className="flex-col justify-start items-start flex">
                                    <div className="w-6 h-[17.45px] relative bg-white rounded-sm"></div>
                                </div>
                            </div>
                            <div className="text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">IDR</div>
                        </div>
                        <div className="w-[183px] p-4 bg-emerald-400 rounded-xl flex-col justify-center items-center gap-3 inline-flex">
                            <div className="self-stretch text-center text-white text-base font-bold font-['Plus Jakarta Sans'] leading-normal">Sign Up</div>
                        </div>
                    </div>
                </Header>
                <Content>
                    <div>

                        <div className="relative">
                            <img className="w-full" src="src/assets/Illustration.svg" ></img>
                            <div className="absolute bottom left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                                <div className=" p-6 bg-white rounded-[20px] shadow border border-gray-200 flex-col justify-center items-start gap-6 inline-flex">
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
                                            <Dropdown className="gap-4 flex" menu={{ items }}>
                                                <a onClick={(e) => e.preventDefault()}>
                                                    <Space>
                                                        <TeamOutlined style={{ fontSize: 24 }} />
                                                        <div className="text-base font-semibold font-['Plus Jakarta Sans'] leading-normal">1 Seats</div>
                                                        <DownOutlined />
                                                    </Space>
                                                </a>
                                            </Dropdown>
                                            <Dropdown className="gap-4 flex" menu={{ items }}>
                                                <a onClick={(e) => e.preventDefault()}>
                                                    <Space>
                                                        <DollarOutlined style={{ fontSize: 24 }} />
                                                        <div className="text-base font-semibold font-['Plus Jakarta Sans'] leading-normal">Economy</div>
                                                        <DownOutlined />
                                                    </Space>
                                                </a>
                                            </Dropdown>
                                        </div>
                                        <div className="justify-start items-center ">
                                            <div className="w-6 h-6 relative"></div>
                                            <div className="w-6 h-6 justify-center items-center flex">
                                                <div className="w-6 h-6 relative">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="self-stretch justify-start items-center gap-6 inline-flex">
                                        <div className="grow shrink basis-0 h-[60px] justify-start items-center gap-6 flex">
                                            <div className="h-[60px] justify-center items-center gap-6 flex">
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
                                                <div className="p-3 bg-emerald-400 rounded-full flex-col justify-center items-center gap-3 inline-flex">
                                                    <div className="w-[19px] h-[19px] justify-center items-center inline-flex">
                                                        <div className="w-[19px] h-[19px] relative">
                                                        </div>
                                                    </div>
                                                </div>
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
                                            <div className="grow shrink basis-0 h-[60px] justify-start items-center gap-6 flex">
                                                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                                    <div className="px-2 bg-white justify-start items-start gap-2.5 inline-flex">
                                                        <div className="text-gray-500 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">Departure Date</div>
                                                    </div>

                                                    <div className="self-stretch px-5 py-[8px] rounded-xl border border-gray-100 justify-start items-center gap-3 inline-flex">

                                                        <DatePicker className="text-neutral-900 text-base font-semibold font-['Plus Jakarta Sans'] leading-normal" bordered={false} format={customFormat} />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-emerald-400 rounded-xl flex-col justify-center items-center gap-3 inline-flex">
                                            <div className="self-stretch text-center text-white text-base font-bold font-['Plus Jakarta Sans'] leading-normal">Search Flights</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-20"></div>
                    <div className="">
                        <div className="snap-center self-center justify-center content-center text-center items-center">
                            <div className="w-full h-[441px] px-48 py-16 border-b border-gray-100 justify-between items-center inline-flex">
                                <div className="flex-col justify-start items-center gap-[25px] inline-flex">
                                    <div className="w-[275px] h-[193px] relative bg-gradient-to-b from-emerald-100 to-white rounded-2xl border border-gray-100">
                                        <div className="h-14 left-[27px] top-[93px] absolute rounded-xl"></div>
                                        <div className="w-[236.49px] h-[145px] left-[19.50px] top-[24px] absolute">
                                        </div>
                                    </div>
                                    <div className="flex-col justify-center items-center gap-4 flex">
                                        <div className="text-neutral-900 text-xl font-semibold font-['Plus Jakarta Sans'] leading-7">Find Your Journey in a Flash</div>
                                        <div className="w-[390px] text-center text-gray-500 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">Discover flights that suit your plans. Start your adventure with a simple search.</div>
                                    </div>
                                </div>
                                <div className="flex-col justify-start items-center gap-[27px] inline-flex">
                                    <div className="w-[275px] h-[193px] pl-[22.61px] pr-[23px] pt-[7px] pb-1.5 bg-gradient-to-b from-emerald-100 to-white rounded-2xl border border-gray-100 justify-center items-center inline-flex">
                                    </div>
                                    <div className="flex-col justify-center items-center gap-4 flex">
                                        <div className="text-neutral-900 text-xl font-semibold font-['Plus Jakarta Sans'] leading-7">Tailor Your Journey, Your Way</div>
                                        <div className="w-[390px] text-center text-gray-500 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">Make it uniquely yours. Add details, select seats, and choose your in-flight delights.</div>
                                    </div>
                                </div>
                                <div className="flex-col justify-start items-center gap-7 inline-flex">
                                    <div className="w-[275px] h-[193px] relative bg-gradient-to-b from-emerald-100 to-white rounded-2xl border border-gray-100">

                                    </div>
                                    <div className="flex-col justify-center items-center gap-4 flex">
                                        <div className="text-neutral-900 text-xl font-semibold font-['Plus Jakarta Sans'] leading-7">Smooth Boarding Awaits You</div>
                                        <div className="w-[390px] text-center text-gray-500 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">Ready for takeoff? Board with confidence using your digital boarding pass.</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </Content>
                <Footer>

                </Footer>
            </Layout>  </ConfigProvider>


    );
};

export default Index;
