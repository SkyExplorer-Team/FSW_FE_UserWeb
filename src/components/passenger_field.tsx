import { Button } from "antd";
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const PassengerField: React.FC = () => {

    return (
        <div className="w-[430px] h-[416px] p-6 bg-white rounded-2xl shadow border border-gray-100 flex-col justify-center items-start gap-4 inline-flex">
            <div className="text-primary text-2xl font-semibold font-['Plus Jakarta Sans'] leading-9">Passengers</div>
            <div className="h-[236px] flex-col justify-center items-start gap-6 flex">
                <div className="self-stretch h-[236px] flex-col justify-center items-center gap-2 flex">
                    <div className="w-[367px] py-2 justify-center items-center gap-4 inline-flex">
                        <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                            <div className="text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">Adults</div>
                            <div className="text-center text-neutral-900 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">12 years old and above</div>
                        </div>
                        <div className="justify-center items-center gap-1 flex">
                            <Button className="p-2 rounded-[100px] border border-gray-300 justify-center items-center gap-2 flex">
                                <MinusOutlined />

                            </Button>

                            <div className="w-10 text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">1</div>
                            <Button className="p-2 rounded-[100px] border border-gray-300 justify-center items-center gap-2 flex">
                                <PlusOutlined />
                            </Button>
                        </div>
                    </div>
                    <div className="w-[367px] py-2 justify-center items-center gap-4 inline-flex">
                        <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                            <div className="text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">Children</div>
                            <div className="text-center text-neutral-900 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">2-11 years old</div>
                        </div>
                        <div className="justify-center items-center gap-1 flex">
                            <Button className="p-2 rounded-[100px] border border-gray-300 justify-center items-center gap-2 flex">
                                <MinusOutlined />

                            </Button>
                            <div className="w-10 text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">0</div>
                            <Button className="p-2 rounded-[100px] border border-gray-300 justify-center items-center gap-2 flex">
                                <PlusOutlined />
                            </Button>
                        </div>
                    </div>
                    <div className="w-[367px] py-2 justify-center items-center gap-4 inline-flex">
                        <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                            <div className="text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">Infant</div>
                            <div className="text-center text-neutral-900 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">Below 2 years old</div>
                        </div>
                        <div className="justify-center items-center gap-1 flex">
                            <Button className="p-2 rounded-[100px] border border-gray-300 justify-center items-center gap-2 flex">
                                <MinusOutlined />

                            </Button>
                            <div className="w-10 text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">0</div>
                            <Button className="p-2 rounded-[100px] border border-gray-300 justify-center items-center gap-2 flex">
                                <PlusOutlined />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <button
                type="submit"
                className="my-4 justify-center rounded-md bg-primary disabled:bg-gray-400 hover:bg-primary-dark px-3 py-1.5 text-base font-bold leading-6 text-white shadow-sm">
                <p className="self-stretch text-center text-white text-base font-bold font-['Plus Jakarta Sans'] leading-normal p-2">
                    Save
                </p>
            </button>
        </div>
    );
};

export default PassengerField;
