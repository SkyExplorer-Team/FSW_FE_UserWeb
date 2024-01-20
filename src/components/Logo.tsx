import React from "react"

const Logo: React.FC = () => {
    return <div className="w-[250px] h-[51.79px] justify-center items-center gap-[10.71px] flex">
        <div className="w-[52px] h-[52px] relative">
            <div className="w-[46px] h-[46px] left-[1.79px] top-[4px] absolute bg-emerald-400 rounded-full"></div>
            <img src="src/assets/airplane.svg" className="pl-[4px] pt-[4.5px] w-[46 px] rotate-0"></img>

        </div>
        <div className="text-neutral-900 text-4xl font-semibold font-['Plus Jakarta Sans'] leading-[54px]">SkyExplorer</div>
    </div>
}

export default Logo