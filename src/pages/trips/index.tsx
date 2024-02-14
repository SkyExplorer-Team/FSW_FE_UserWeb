import React, { useEffect, useState } from "react";
import Logo from "../../components/Logo";
import {Card, ConfigProvider, Dropdown, Layout, Tabs, Pagination, Menu } from "antd";
const { TabPane } = Tabs;
import { MenuProps } from "antd/lib";
import { DownOutlined, MenuOutlined, RightOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ReactCountryFlag from "react-country-flag"
import { useNavigate } from "react-router-dom";
import SkeletonAvatar from "antd/lib/skeleton/Avatar";
import HomeFooter from "../../components/home_footer";
import HomeNavSide from "../../components/home_navside";

dayjs.extend(customParseFormat);

const { Header, Content, Footer } = Layout;


const api_base_url = "https://be-java-production.up.railway.app"

const menu = (
    <Menu>
      <div className="px-2">
        <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
        <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-white group-hover:bg-[#EAFDF6]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M6.66734 18.3333H13.334C16.684 18.3333 17.284 16.9917 17.459 15.3583L18.084 8.69167C18.309 6.65833 17.7257 5 14.1673 5H5.834C2.27567 5 1.69234 6.65833 1.91734 8.69167L2.54234 15.3583C2.71734 16.9917 3.31734 18.3333 6.66734 18.3333Z" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.66406 4.99935V4.33268C6.66406 2.85768 6.66406 1.66602 9.33073 1.66602H10.6641C13.3307 1.66602 13.3307 2.85768 13.3307 4.33268V4.99935" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.6693 10.8333V11.6667C11.6693 11.675 11.6693 11.675 11.6693 11.6833C11.6693 12.5917 11.6609 13.3333 10.0026 13.3333C8.3526 13.3333 8.33594 12.6 8.33594 11.6917V10.8333C8.33594 10 8.33594 10 9.16927 10H10.8359C11.6693 10 11.6693 10 11.6693 10.8333Z" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M18.0391 9.16602C16.1141 10.566 13.9141 11.3993 11.6641 11.6827" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2.17969 9.39062C4.05469 10.674 6.17135 11.449 8.32969 11.6906" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div className="flex items-center justify-center text-center">
            <a href="#" className="font-medium text-base text-[#677084] group-hover:text-[#227879]">
                Trips
            </a>
        </div>
        </div>
        <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
        <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10.1302 9.05768C10.0469 9.04935 9.94687 9.04935 9.85521 9.05768C7.87187 8.99102 6.29688 7.36602 6.29688 5.36602C6.29687 3.32435 7.94687 1.66602 9.99687 1.66602C12.0385 1.66602 13.6969 3.32435 13.6969 5.36602C13.6885 7.36602 12.1135 8.99102 10.1302 9.05768Z" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.96563 12.134C3.94896 13.484 3.94896 15.684 5.96563 17.0257C8.25729 18.559 12.0156 18.559 14.3073 17.0257C16.324 15.6757 16.324 13.4757 14.3073 12.134C12.024 10.609 8.26562 10.609 5.96563 12.134Z" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div className="flex items-center justify-center text-center">
            <a href="#" className="font-medium text-base text-[#677084] group-hover:text-[#227879]">
                Profile
            </a>
        </div>
        </div>
        <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
        <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10.0175 2.42578C7.25914 2.42578 5.01747 4.66745 5.01747 7.42578V9.83411C5.01747 10.3424 4.80081 11.1174 4.54247 11.5508L3.58414 13.1424C2.99247 14.1258 3.40081 15.2174 4.48414 15.5841C8.07581 16.7841 11.9508 16.7841 15.5425 15.5841C16.5508 15.2508 16.9925 14.0591 16.4425 13.1424L15.4841 11.5508C15.2341 11.1174 15.0175 10.3424 15.0175 9.83411V7.42578C15.0175 4.67578 12.7675 2.42578 10.0175 2.42578Z" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round"/>
                <path d="M11.5599 2.66719C11.3016 2.59219 11.0349 2.53385 10.7599 2.50052C9.9599 2.40052 9.19323 2.45885 8.47656 2.66719C8.71823 2.05052 9.31823 1.61719 10.0182 1.61719C10.7182 1.61719 11.3182 2.05052 11.5599 2.66719Z" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.5156 15.8828C12.5156 17.2578 11.3906 18.3828 10.0156 18.3828C9.33229 18.3828 8.69896 18.0995 8.24896 17.6495C7.79896 17.1995 7.51562 16.5661 7.51562 15.8828" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10"/>
            </svg>
        </div>
        <div className="flex items-center justify-center text-center">
            <a href="#" className="font-medium text-base text-[#677084] group-hover:text-[#227879]">
                Notifications
            </a>
        </div>
        </div>
        <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
        <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M18.3346 3.89174V13.9501C18.3346 14.7501 17.6846 15.5001 16.8846 15.6001L16.6096 15.6334C14.793 15.8751 11.9929 16.8001 10.3929 17.6834C10.1763 17.8084 9.81798 17.8084 9.59298 17.6834L9.55961 17.6668C7.95961 16.7918 5.16799 15.8751 3.35966 15.6334L3.11796 15.6001C2.31796 15.5001 1.66797 14.7501 1.66797 13.9501V3.8834C1.66797 2.89173 2.47628 2.14174 3.46795 2.22508C5.21795 2.36674 7.86794 3.2501 9.35128 4.1751L9.55961 4.30007C9.80128 4.45007 10.2013 4.45007 10.443 4.30007L10.5846 4.20841C11.1096 3.88341 11.7763 3.55841 12.5013 3.26674V6.66676L14.168 5.55841L15.8346 6.66676V2.31678C16.0596 2.27511 16.2763 2.25008 16.4763 2.23342H16.5263C17.518 2.15008 18.3346 2.89174 18.3346 3.89174Z" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 4.57422V17.0742" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15.8333 2.31641V6.66638L14.1667 5.55803L12.5 6.66638V3.26637C13.5917 2.83303 14.8083 2.48307 15.8333 2.31641Z" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div className="flex items-center justify-center text-center">
            <a href="#" className="font-medium text-base text-[#677084] group-hover:text-[#227879]">
                Saved Travelers
            </a>
        </div>
        </div>
        <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
            <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M2.5 7.59115V12.3995C2.5 14.1661 2.5 14.1661 4.16667 15.2911L8.75 17.9411C9.44167 18.3411 10.5667 18.3411 11.25 17.9411L15.8333 15.2911C17.5 14.1661 17.5 14.1661 17.5 12.4078V7.59115C17.5 5.83281 17.5 5.83281 15.8333 4.70781L11.25 2.05781C10.5667 1.65781 9.44167 1.65781 8.75 2.05781L4.16667 4.70781C2.5 5.83281 2.5 5.83281 2.5 7.59115Z" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div className="flex items-center justify-center text-center">
                <a href="#" className="font-medium text-base text-[#677084]  group-hover:text-[#227879]">
                    Account Settings
                </a>
            </div>
        </div>
        <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
            <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7.41406 6.29922C7.6724 3.29922 9.21406 2.07422 12.5891 2.07422H12.6974C16.4224 2.07422 17.9141 3.56589 17.9141 7.29089V12.7242C17.9141 16.4492 16.4224 17.9409 12.6974 17.9409H12.5891C9.23906 17.9409 7.6974 16.7326 7.4224 13.7826" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12.499 10H3.01562" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M4.8737 7.20898L2.08203 10.0007L4.8737 12.7923" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div className="flex items-center justify-center text-center">
                <p className="font-medium text-base text-[#677084] group-hover:text-[#227879]">
                    Sign Out
                </p>
            </div>
        </div>
    </div>
    </Menu>
  );

const cardStyle = {
    borderRadius: '12px', 
    border: '1px solid #F2F4F7',
    backgroundColor: 'white',
    marginBottom: '16px',
  };

interface User {
    salutation: string;
    firstName: string;
    lastName: string;
    nationality: string;
    dob: string;
}

interface Airport {
    nationalId: string;
    city: string;
    name: string;
    abv: string;
    lat: number | null;
    long: number | null;
}

interface Schedule {
    departureDate : dayjs.Dayjs;
    from: Airport;
    plane : {name: string, code: string};
    arrivalDate : dayjs.Dayjs;
    to: Airport 
}

interface Booking {
    id: string;
    bookingDate: dayjs.Dayjs;
    status: boolean
    totalCost:  number
    passanger: string
    user: User
    schedule :Schedule;
    seat: string
    bagage: number
    meal: string
}

const Index: React.FC = () => {
    const token = localStorage.getItem(
        'access_token',
    );

    let airports: Airport[] = [];
    const fromAirportDetails: { "label": string, "value": string }[] = [];
    const toAirportDetails: { "label": string, "value": string }[] = [];
    const schedules: Booking[] = [
        {  
          id:'1',
          bookingDate: dayjs('2024-02-15T09:30:00'),
          status: true,
          totalCost: 350.00,
          passanger: 'Alice Smith',
          user: {
            salutation: 'Ms',
            firstName: 'Alice',
            lastName: 'Smith',
            nationality: 'UK',
            dob: '1985-05-20',
          },
          schedule: {
            departureDate: dayjs('2024-03-01T14:00:00'),
            from: { nationalId: 'ID001', city: 'Jakarta', name: 'Soekarno-Hatta International Airport', abv: 'CGK', lat: -6.1256, long: 106.6553 },
            plane: { name: 'Airbus A320', code: 'A320' },
            arrivalDate: dayjs('2024-03-01T17:30:00'),
            to: { nationalId: 'ID003', city: 'Sydney', name: 'Kingsford Smith Airport', abv: 'SYD', lat: -33.9462, long: 151.1772 },
          },
          seat: 'B12',
          bagage: 1,
          meal: 'Standard',
        },
        {
          id:'2',
          bookingDate: dayjs('2024-02-16T11:45:00'),
          status: true,
          totalCost: 420.00,
          passanger: 'Bob Johnson',
          user: {
            salutation: 'Mr',
            firstName: 'Bob',
            lastName: 'Johnson',
            nationality: 'US',
            dob: '1980-08-12',
          },
          schedule: {
            departureDate: dayjs('2024-03-10T08:30:00'),
            from: { nationalId: 'ID002', city: 'Singapore', name: 'Changi Airport', abv: 'SIN', lat: 1.3644, long: 103.9915 },
            plane: { name: 'Boeing 777', code: 'B777' },
            arrivalDate: dayjs('2024-03-10T11:45:00'),
            to: { nationalId: 'ID004', city: 'Tokyo', name: 'Narita International Airport', abv: 'NRT', lat: 35.7647, long: 140.3864 },
          },
          seat: 'C07',
          bagage: 2,
          meal: 'Vegetarian',
        },
        {
          id:'3',
          bookingDate: dayjs('2024-02-17T15:20:00'),
          status: false,
          totalCost: 280.00,
          passanger: 'Charlie Brown',
          user: {
            salutation: 'Mr',
            firstName: 'Charlie',
            lastName: 'Brown',
            nationality: 'CA',
            dob: '1992-03-25',
          },
          schedule: {
            departureDate: dayjs('2024-03-20T18:15:00'),
            from: { nationalId: 'ID003', city: 'Sydney', name: 'Kingsford Smith Airport', abv: 'SYD', lat: -33.9462, long: 151.1772 },
            plane: { name: 'Airbus A330', code: 'A330' },
            arrivalDate: dayjs('2024-03-20T21:30:00'),
            to: { nationalId: 'ID001', city: 'Jakarta', name: 'Soekarno-Hatta International Airport', abv: 'CGK', lat: -6.1256, long: 106.6553 },
          },
          seat: 'D19',
          bagage: 1,
          meal: 'Halal',
        },
        {
            id:'4',
            bookingDate: dayjs('2024-02-15T09:30:00'),
            status: dayjs().isAfter('2024-03-01T14:00:00'),
            totalCost: 350.00,
            passanger: 'Alice Smith',
            user: {
              salutation: 'Ms',
              firstName: 'Alice',
              lastName: 'Smith',
              nationality: 'UK',
              dob: '1985-05-20',
            },
            schedule: {
              departureDate: dayjs('2024-03-01T14:00:00'),
              from: { nationalId: 'ID001', city: 'Jakarta', name: 'Soekarno-Hatta International Airport', abv: 'CGK', lat: -6.1256, long: 106.6553 },
              plane: { name: 'Airbus A320', code: 'A320' },
              arrivalDate: dayjs('2024-03-01T17:30:00'),
              to: { nationalId: 'ID003', city: 'Sydney', name: 'Kingsford Smith Airport', abv: 'SYD', lat: -33.9462, long: 151.1772 },
            },
            seat: 'B12',
            bagage: 1,
            meal: 'Standard',
          },
          {
            id:'5',
            bookingDate: dayjs('2024-02-15T09:30:00'),
            status: dayjs().isAfter('2024-03-01T14:00:00'),
            totalCost: 350.00,
            passanger: 'Alice Smith',
            user: {
              salutation: 'Ms',
              firstName: 'Alice',
              lastName: 'Smith',
              nationality: 'UK',
              dob: '1985-05-20',
            },
            schedule: {
              departureDate: dayjs('2024-03-01T14:00:00'),
              from: { nationalId: 'ID001', city: 'Jakarta', name: 'Soekarno-Hatta International Airport', abv: 'CGK', lat: -6.1256, long: 106.6553 },
              plane: { name: 'Airbus A320', code: 'A320' },
              arrivalDate: dayjs('2024-03-01T17:30:00'),
              to: { nationalId: 'ID003', city: 'Sydney', name: 'Kingsford Smith Airport', abv: 'SYD', lat: -33.9462, long: 151.1772 },
            },
            seat: 'B12',
            bagage: 1,
            meal: 'Standard',
          },
          {
            id:'6',
            bookingDate: dayjs('2024-02-16T11:45:00'),
            status: dayjs().isAfter('2024-03-10T08:30:00'),
            totalCost: 420.00,
            passanger: 'Bob Johnson',
            user: {
              salutation: 'Mr',
              firstName: 'Bob',
              lastName: 'Johnson',
              nationality: 'US',
              dob: '1980-08-12',
            },
            schedule: {
              departureDate: dayjs('2024-03-10T08:30:00'),
              from: { nationalId: 'ID002', city: 'Singapore', name: 'Changi Airport', abv: 'SIN', lat: 1.3644, long: 103.9915 },
              plane: { name: 'Boeing 777', code: 'B777' },
              arrivalDate: dayjs('2024-03-10T11:45:00'),
              to: { nationalId: 'ID004', city: 'Tokyo', name: 'Narita International Airport', abv: 'NRT', lat: 35.7647, long: 140.3864 },
            },
            seat: 'C07',
            bagage: 2,
            meal: 'Vegetarian',
          },
          {
            id:'7',
            bookingDate: dayjs('2024-02-17T15:20:00'),
            status: dayjs().isAfter('2024-03-20T18:15:00'),
            totalCost: 280.00,
            passanger: 'Charlie Brown',
            user: {
              salutation: 'Mr',
              firstName: 'Charlie',
              lastName: 'Brown',
              nationality: 'CA',
              dob: '1992-03-25',
            },
            schedule: {
              departureDate: dayjs('2024-03-20T18:15:00'),
              from: { nationalId: 'ID003', city: 'Sydney', name: 'Kingsford Smith Airport', abv: 'SYD', lat: -33.9462, long: 151.1772 },
              plane: { name: 'Airbus A330', code: 'A330' },
              arrivalDate: dayjs('2024-03-20T21:30:00'),
              to: { nationalId: 'ID001', city: 'Jakarta', name: 'Soekarno-Hatta International Airport', abv: 'CGK', lat: -6.1256, long: 106.6553 },
            },
            seat: 'D19',
            bagage: 1,
            meal: 'Halal',
          },
          {
            id:'8',
            bookingDate: dayjs().subtract(7, 'days'),
            status: true,
            totalCost: 300.00,
            passanger: 'Eva Rodriguez',
            user: {
              salutation: 'Ms',
              firstName: 'Eva',
              lastName: 'Rodriguez',
              nationality: 'ES',
              dob: '1993-10-15',
            },
            schedule: {
              departureDate: dayjs().add(5, 'days').hour(10).minute(30).second(0),
              from: { nationalId: 'ID005', city: 'Barcelona', name: 'Barcelona-El Prat Airport', abv: 'BCN', lat: 41.2974, long: 2.0833 },
              plane: { name: 'Airbus A350', code: 'A350' },
              arrivalDate: dayjs().add(5, 'days').hour(13).minute(45).second(0),
              to: { nationalId: 'ID001', city: 'Jakarta', name: 'Soekarno-Hatta International Airport', abv: 'CGK', lat: -6.1256, long: 106.6553 },
            },
            seat: 'D08',
            bagage: 1,
            meal: 'Vegetarian',
          },
          {
            id:'9',
            bookingDate: dayjs().subtract(3, 'days'),
            status: false,
            totalCost: 250.00,
            passanger: 'Luis Fernandez',
            user: {
              salutation: 'Mr',
              firstName: 'Luis',
              lastName: 'Fernandez',
              nationality: 'MX',
              dob: '1988-07-28',
            },
            schedule: {
              departureDate: dayjs().subtract(1, 'day').hour(15).minute(45).second(0),
              from: { nationalId: 'ID006', city: 'Mexico City', name: 'Benito Juárez International Airport', abv: 'MEX', lat: 19.4361, long: -99.0719 },
              plane: { name: 'Boeing 787', code: 'B787' },
              arrivalDate: dayjs().subtract(1, 'day').hour(20).minute(0).second(0),
              to: { nationalId: 'ID002', city: 'Singapore', name: 'Changi Airport', abv: 'SIN', lat: 1.3644, long: 103.9915 },
            },
            seat: 'A15',
            bagage: 2,
            meal: 'Standard',
          },
      ];
    
    async function fetchInitialAirport() {
        const payload = {}

        const response = await fetch(
            api_base_url + "/api/booking",
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
        airports = responseJson['Airport']
    }

    useEffect(() => {

        fetchInitialAirport()

        airports.map((val) => {
            fromAirportDetails.push({ label: val.name, value: val.nationalId })
            toAirportDetails.push({ label: val.name, value: val.nationalId })
        })



    })

    const handleSignUp = () => {
        navigate("/signup")
    };

    const navigate = useNavigate();

    const [currentPageActive, setCurrentPageActive] = useState(1);
    const [currentPageExpired, setCurrentPageExpired] = useState(1);
    const pageSize = 3;

    const handlePageChangeActive = (page : number) => {
        setCurrentPageActive(page);
    };
    const activeSchedules = schedules.filter(schedule => schedule.status === true)
    const paginatedSchedulesActive = activeSchedules.slice((currentPageActive - 1) * pageSize, currentPageActive * pageSize);

    const handlePageChangeExpired = (page : number) => {
        setCurrentPageExpired(page);
    };
    const ExpiredSchedules = schedules.filter(schedule => schedule.status === false)
    const paginatedSchedulesExpired = ExpiredSchedules.slice((currentPageExpired - 1) * pageSize, currentPageExpired * pageSize);


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
                    paddingLeft: "16px", paddingRight: "16px", top: 0, zIndex: 1, marginBottom: "12px", paddingTop: "4px", paddingBottom: "8px", position: 'sticky', display: 'flex', alignItems: 'center', backgroundColor: "white",
                }}>
                    <div className="grid grid-cols-12 w-full">
                        <div className="col-start-1 col-end-7 xl:col-end-10 justify-start items-center md:gap-8 flex px-4">
                            <Logo></Logo>
                            <div className="hidden xl:flex justify-start items-start md:gap-6">
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
                            <div className="flex xl:hidden justify-start items-start md:gap-6">
                                <Dropdown className="flex hover:text-[#38A993] text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7" menu={{ items }}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <div className="md:pr-2">Explore</div>
                                        <DownOutlined />
                                    </a>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="col-start-7 xl:col-start-10 col-end-13 gap-4 flex item-end justify-end">
                            <a className="snap-center self-center align-middle hover:text-[#38A993] text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                                <div className="justify-start items-center px-2 md:gap-4 flex">
                                    <ReactCountryFlag
                                        countryCode="ID"
                                        svg
                                    />
                                    <div>IDR</div>
                                    <DownOutlined className="hidden md:block"/>
                                </div>
                            </a>

                            {
                                token ?
                                    <div className="snap-center self-center align-middle text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                                        <div className="grid grid-cols-12 md:gap-4 border border-gray-200 rounded-[5px] p-2">
                                            <div className="col-start-1 col-end-11 hover:text-[#38A993] flex">
                                                <div className="grid grid-cols-12 gap-2">
                                                    <div className="col-start-1 md:col-end-3 hover:text-[#38A993] flex"><SkeletonAvatar /></div>
                                                    <div className="col-start-5 md:col-start-3 col-end-13 hover:text-[#38A993] flex">Lewis</div>
                                                </div>
                                            </div>
                                            <div className="col-start-11 col-end-13 hover:text-[#38A993]">
                                                <Dropdown overlay={menu} placement="bottomRight">
                                                    <a onClick={(e) => e.preventDefault()}>
                                                        <MenuOutlined/>
                                                    </a>
                                                </Dropdown>
                                            </div>
                                        </div> 
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
                    <div className="my-5">
                        <div className="grid grid-cols-10 gap-5">
                            <HomeNavSide/>
                            <div className="col-start-1 col-span-10 xl:col-start-4 xl:col-span-6 px-6 py-3 bg-white rounded-[16px] shadow border border-gray-200 flex-col justify-center items-start inline-flex">
                                <div className="text-start text-[#111] font-medium font-['Plus Jakarta Sans'] font-semibold text-3xl">Trips</div>
                                <Tabs defaultActiveKey="1" tabBarGutter={28} style={{ width: '100%' }}>
                                    <TabPane tab="Active" key="1">
                                        {paginatedSchedulesActive.length === 0 ? (
                                                <div className="min-h-[562px] flex justify-center items-center">
                                                    <div className="grid grid-cols-10">
                                                        <div className="col-start-4 col-span-4">
                                                            <img src="src/assets/background-complete.svg" width={290} height={210} alt="Background" />
                                                            <h1 className="text-center text-[#111] font-medium font-['Plus Jakarta Sans'] font-bold text-xl my-3">No Trips Found</h1>
                                                            <p className="text-center text-[#677084] font-medium font-['Plus Jakarta Sans'] font-medium text-sm">When you book your next flight, you can check the details in here</p>
                                                            <button
                                                                onClick={handleSignUp}
                                                                className="my-4 w-full justify-center rounded-md bg-primary disabled:bg-gray-400 hover:bg-primary-dark px-3  text-base font-bold leading-6 text-white shadow-sm">
                                                                <p className="self-stretch text-center text-white text-base font-bold font-['Plus Jakarta Sans'] leading-normal text-sm font-bold p-2">
                                                                    Explore
                                                                </p>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="min-h-[562px]">
                                                        {paginatedSchedulesActive.map((schedule, index) => {
                                                            const durationInMinutes = schedule.schedule.arrivalDate.diff(schedule.schedule.departureDate, 'minutes');
                                                            const hours = Math.floor(durationInMinutes / 60);
                                                            const minutes = durationInMinutes % 60;
                                                            const formattedDuration = `${hours}h ${minutes}m`;
                                                        return <>
                                                                <div className="grid grid-cols-11">
                                                                        <Card style={cardStyle} className="col-start-1 col-span-8 shadow border border-gray-200 " key={index}>
                                                                        <Card.Grid hoverable={false} style={{width:'25%', height: '100%', boxShadow: 'none', padding: '10px'}}>
                                                                            <div className="text-center text-[#111] font-medium font-['Plus Jakarta Sans'] font-semibold text-lg  md:text-3xl">{schedule.schedule.departureDate.format('HH:mm')}</div>
                                                                            <div className="text-center text-[#38A993] font-medium font-['Plus Jakarta Sans'] font-semibold text-lg  md:text-3xl">{schedule.schedule.from.abv}</div>
                                                                            <div className="text-center text-[#808991] font-medium font-['Plus Jakarta Sans'] font-semibold text-lg">{schedule.schedule.departureDate.format('D MMM')}</div>
                                                                        </Card.Grid>
                                                                        <Card.Grid hoverable={false} style={{width:'50%', height: '100%', boxShadow: 'none', padding: '10px'}}>
                                                                            <div className="text-center text-[#22313F] text-base font-medium font-['Plus Jakarta Sans'] text-lg my-1">{formattedDuration}</div>
                                                                            <div className="grid grid-cols-7 gap-1">
                                                                                <div className="col-start-0 col-span-1 py-3 bg-white justify-center items-center inline-flex">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                                                        <ellipse opacity="0.5" cx="8.69725" cy="7.99924" rx="8.19725" ry="7.79221" fill="#38A993"/>
                                                                                        <ellipse cx="8.69569" cy="7.99955" rx="4.91835" ry="4.67533" fill="#38A993"/>
                                                                                    </svg>
                                                                                </div>
                                                                                <div className="col-start-2 col-span-2  py-3 bg-white justify-center items-center inline-flex">
                                                                                    <hr className="w-full border-t-4 border-dashed border-[#EAECF0] mx-auto" />
                                                                                </div>
                                                                                <div className="col-start-4 col-span-1 py-3 justify-center items-center inline-flex">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                                        <path d="M11.1422 16.7085L12.8172 12.8168L13.1839 11.9501C13.2505 11.8168 13.4255 11.7001 13.5755 11.7001H16.1255C16.9255 11.7001 17.8755 11.1085 18.2422 10.3918C18.3672 10.1418 18.3672 9.8418 18.2422 9.5918C17.8755 8.88346 16.9172 8.2918 16.1172 8.2918H13.5672C13.4172 8.2918 13.2422 8.17513 13.1755 8.0418L11.1339 3.2918C10.9172 2.7668 10.2589 2.3418 9.69219 2.3418H8.59219C7.88385 2.3418 7.53385 2.87513 7.81719 3.53346L9.61719 7.70846C9.75885 8.03346 9.58385 8.30013 9.22552 8.30013H8.30052H6.80052C6.60885 8.30013 6.33385 8.1918 6.20052 8.05846L4.25885 6.12513C4.05885 5.92513 3.66719 5.83346 3.38385 5.92513L2.25052 6.30013C1.75885 6.45013 1.52552 7.00846 1.75885 7.4668L3.42552 9.45013C3.68386 9.75013 3.68386 10.2418 3.42552 10.5418L1.75885 12.5251C1.53386 12.9835 1.75885 13.5418 2.25052 13.7085L3.38385 14.0835C3.65885 14.1751 4.05885 14.0835 4.25885 13.8835L6.20052 11.9501C6.33385 11.8085 6.60885 11.7001 6.80052 11.7001H9.22552C9.58385 11.7001 9.75052 11.9585 9.61719 12.2918L7.81719 16.4668C7.53385 17.1251 7.88385 17.6585 8.59219 17.6585H9.69219C10.2589 17.6585 10.9172 17.2335 11.1422 16.7085Z" fill="#38A993"/>
                                                                                    </svg>
                                                                                </div>
                                                                                <div className="col-start-5 col-span-2 py-3 justify-center items-center inline-flex">
                                                                                    <hr className="w-full border-t-4 border-dashed border-[#EAECF0] mx-auto" />
                                                                                </div>
                                                                                <div className="col-start-7 col-span-1 py-3  justify-center items-center inline-flex">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                                                        <ellipse opacity="0.5" cx="8.69725" cy="7.99924" rx="8.19725" ry="7.79221" fill="#38A993"/>
                                                                                        <ellipse cx="8.69569" cy="7.99955" rx="4.91835" ry="4.67533" fill="#38A993"/>
                                                                                    </svg>
                                                                                </div>
                                                                            </div>
                                                                            <div className="text-center text-[#22313F] text-base font-medium font-['Plus Jakarta Sans'] text-lg">Direct</div>
                                                                        </Card.Grid>
                                                                        <Card.Grid hoverable={false} style={{width:'25%', height: '100%', boxShadow: 'none', padding: '10px'}}>
                                                                            <div className="text-center text-[#111] font-medium font-['Plus Jakarta Sans'] font-semibold text-lg  md:text-3xl">{schedule.schedule.arrivalDate.format('HH:mm')}</div>
                                                                            <div className="text-center text-[#38A993] font-medium font-['Plus Jakarta Sans'] font-semibold text-lg  md:text-3xl">{schedule.schedule.to.abv}</div>
                                                                            <div className="text-center text-[#808991] tfont-medium font-['Plus Jakarta Sans'] font-semibold text-lg">{schedule.schedule.arrivalDate.format('D MMM')}</div>
                                                                        </Card.Grid>
                                                                        </Card>
                                                                        <Card style={cardStyle} className="col-start-9 col-span-4 shadow border border-gray-200 " key={index}>
                                                                            <Card.Grid hoverable={false} style={{width:'100%', height: '100%', boxShadow: 'none' , padding: '10px'}}>
                                                                            <div className="text-center text-[#111] text-base font-medium font-['Plus Jakarta Sans'] md:my-2">
                                                                                <div className="justify-center h-[51.79px] items-center flex">
                                                                                    <div className="w-[29.793px] h-[29.793px] top-[2px]  bg-emerald-400 rounded-full items-center mx-2">
                                                                                        <img src="src/assets/airplane.svg" className=" w-full h-full "></img>
                                                                                    </div>
                                                                                    <div className="text-center text-sm  md:text-xl font-semibold font-['Plus Jakarta Sans'] leading-[54px]">{schedule.schedule.plane.code}</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="text-center text-[#111] text-base font-medium font-['Plus Jakarta Sans'] mx-0 md:mx-4">
                                                                            <button
                                                                                onClick={()=> {navigate(`/trips-detail`)}}
                                                                                className="my-4 justify-center rounded-md bg-white disabled:bg-gray-400 hover:text-base font-bold leading-6 text-primary-dark">
                                                                                <p className="text-center text-primary text-sm md:text-base font-bold font-['Plus Jakarta Sans'] md:p-2 ">
                                                                                    Details <RightOutlined className="ml-1 md:ml-5"/>
                                                                                </p>
                                                                            </button>
                                                                            </div>
                                                                            </Card.Grid>
                                                                        </Card>
                                                                </div>
                                                            </>
                                                        })}
                                                    </div>
                                                    <div style={{ textAlign: 'center' }}>
                                                        <Pagination
                                                            total={activeSchedules.length}
                                                            defaultPageSize={pageSize}
                                                            current={currentPageActive}
                                                            onChange={handlePageChangeActive}
                                                            showSizeChanger={false}
                                                            showQuickJumper={false}
                                                            hideOnSinglePage={true}
                                                            className="my-1"
                                                        />
                                                    </div>
                                                </>
                                            )}
                                    </TabPane>
                                    <TabPane tab="Expired" key="2">
                                        {paginatedSchedulesExpired.length === 0 ? (
                                                <div className="min-h-[562px] flex justify-center items-center">
                                                    <div className="grid grid-cols-10">
                                                        <div className="col-start-4 col-span-4">
                                                            <img src="src/assets/background-complete.svg" width={290} height={210} alt="Background" />
                                                            <h1 className="text-center text-[#111] font-medium font-['Plus Jakarta Sans'] font-bold text-xl my-3">No Trips Found</h1>
                                                            <p className="text-center text-[#677084] font-medium font-['Plus Jakarta Sans'] font-medium text-sm">When you book your next flight, you can check the details in here</p>
                                                            <button
                                                                onClick={handleSignUp}
                                                                className="my-4 w-full justify-center rounded-md bg-primary disabled:bg-gray-400 hover:bg-primary-dark px-3  text-base font-bold leading-6 text-white shadow-sm">
                                                                <p className="self-stretch text-center text-white text-base font-bold font-['Plus Jakarta Sans'] leading-normal text-sm font-bold p-2">
                                                                    Explore
                                                                </p>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="min-h-[562px]">
                                                        {paginatedSchedulesExpired.map((schedule, index) => {
                                                            const durationInMinutes = schedule.schedule.arrivalDate.diff(schedule.schedule.departureDate, 'minutes');
                                                            const hours = Math.floor(durationInMinutes / 60);
                                                            const minutes = durationInMinutes % 60;
                                                            const formattedDuration = `${hours}h ${minutes}m`;
                                                        return <>
                                                                <div className="grid grid-cols-11">
                                                                        <Card style={cardStyle} className="col-start-1 col-span-8 shadow border border-gray-200 " key={index}>
                                                                        <Card.Grid hoverable={false} style={{width:'25%', height: '100%', boxShadow: 'none', padding: '10px'}}>
                                                                            <div className="text-center text-[#111] font-medium font-['Plus Jakarta Sans'] font-semibold text-lg  md:text-3xl">{schedule.schedule.departureDate.format('HH:mm')}</div>
                                                                            <div className="text-center text-[#38A993] font-medium font-['Plus Jakarta Sans'] font-semibold text-lg  md:text-3xl">{schedule.schedule.from.abv}</div>
                                                                            <div className="text-center text-[#808991] font-medium font-['Plus Jakarta Sans'] font-semibold text-lg">{schedule.schedule.departureDate.format('D MMM')}</div>
                                                                        </Card.Grid>
                                                                        <Card.Grid hoverable={false} style={{width:'50%', height: '100%', boxShadow: 'none', padding: '10px'}}>
                                                                            <div className="text-center text-[#22313F] text-base font-medium font-['Plus Jakarta Sans'] text-lg my-1">{formattedDuration}</div>
                                                                            <div className="grid grid-cols-7 gap-1">
                                                                                <div className="col-start-0 col-span-1 py-3 bg-white justify-center items-center inline-flex">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                                                        <ellipse opacity="0.5" cx="8.69725" cy="7.99924" rx="8.19725" ry="7.79221" fill="#38A993"/>
                                                                                        <ellipse cx="8.69569" cy="7.99955" rx="4.91835" ry="4.67533" fill="#38A993"/>
                                                                                    </svg>
                                                                                </div>
                                                                                <div className="col-start-2 col-span-2  py-3 bg-white justify-center items-center inline-flex">
                                                                                    <hr className="w-full border-t-4 border-dashed border-[#EAECF0] mx-auto" />
                                                                                </div>
                                                                                <div className="col-start-4 col-span-1 py-3 justify-center items-center inline-flex">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                                        <path d="M11.1422 16.7085L12.8172 12.8168L13.1839 11.9501C13.2505 11.8168 13.4255 11.7001 13.5755 11.7001H16.1255C16.9255 11.7001 17.8755 11.1085 18.2422 10.3918C18.3672 10.1418 18.3672 9.8418 18.2422 9.5918C17.8755 8.88346 16.9172 8.2918 16.1172 8.2918H13.5672C13.4172 8.2918 13.2422 8.17513 13.1755 8.0418L11.1339 3.2918C10.9172 2.7668 10.2589 2.3418 9.69219 2.3418H8.59219C7.88385 2.3418 7.53385 2.87513 7.81719 3.53346L9.61719 7.70846C9.75885 8.03346 9.58385 8.30013 9.22552 8.30013H8.30052H6.80052C6.60885 8.30013 6.33385 8.1918 6.20052 8.05846L4.25885 6.12513C4.05885 5.92513 3.66719 5.83346 3.38385 5.92513L2.25052 6.30013C1.75885 6.45013 1.52552 7.00846 1.75885 7.4668L3.42552 9.45013C3.68386 9.75013 3.68386 10.2418 3.42552 10.5418L1.75885 12.5251C1.53386 12.9835 1.75885 13.5418 2.25052 13.7085L3.38385 14.0835C3.65885 14.1751 4.05885 14.0835 4.25885 13.8835L6.20052 11.9501C6.33385 11.8085 6.60885 11.7001 6.80052 11.7001H9.22552C9.58385 11.7001 9.75052 11.9585 9.61719 12.2918L7.81719 16.4668C7.53385 17.1251 7.88385 17.6585 8.59219 17.6585H9.69219C10.2589 17.6585 10.9172 17.2335 11.1422 16.7085Z" fill="#38A993"/>
                                                                                    </svg>
                                                                                </div>
                                                                                <div className="col-start-5 col-span-2 py-3 justify-center items-center inline-flex">
                                                                                    <hr className="w-full border-t-4 border-dashed border-[#EAECF0] mx-auto" />
                                                                                </div>
                                                                                <div className="col-start-7 col-span-1 py-3  justify-center items-center inline-flex">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                                                        <ellipse opacity="0.5" cx="8.69725" cy="7.99924" rx="8.19725" ry="7.79221" fill="#38A993"/>
                                                                                        <ellipse cx="8.69569" cy="7.99955" rx="4.91835" ry="4.67533" fill="#38A993"/>
                                                                                    </svg>
                                                                                </div>
                                                                            </div>
                                                                            <div className="text-center text-[#22313F] text-base font-medium font-['Plus Jakarta Sans'] text-lg">Direct</div>
                                                                        </Card.Grid>
                                                                        <Card.Grid hoverable={false} style={{width:'25%', height: '100%', boxShadow: 'none', padding: '10px'}}>
                                                                            <div className="text-center text-[#111] font-medium font-['Plus Jakarta Sans'] font-semibold text-lg  md:text-3xl">{schedule.schedule.arrivalDate.format('HH:mm')}</div>
                                                                            <div className="text-center text-[#38A993] font-medium font-['Plus Jakarta Sans'] font-semibold text-lg  md:text-3xl">{schedule.schedule.to.abv}</div>
                                                                            <div className="text-center text-[#808991] tfont-medium font-['Plus Jakarta Sans'] font-semibold text-lg">{schedule.schedule.arrivalDate.format('D MMM')}</div>
                                                                        </Card.Grid>
                                                                        </Card>
                                                                        <Card style={cardStyle} className="col-start-9 col-span-4 shadow border border-gray-200 " key={index}>
                                                                            <Card.Grid hoverable={false} style={{width:'100%', height: '100%', boxShadow: 'none' , padding: '10px'}}>
                                                                            <div className="text-center text-[#111] text-base font-medium font-['Plus Jakarta Sans'] md:my-2">
                                                                                <div className="justify-center h-[51.79px] items-center flex">
                                                                                    <div className="w-[29.793px] h-[29.793px] top-[2px]  bg-emerald-400 rounded-full items-center mx-2">
                                                                                        <img src="src/assets/airplane.svg" className=" w-full h-full "></img>
                                                                                    </div>
                                                                                    <div className="text-center text-sm  md:text-xl font-semibold font-['Plus Jakarta Sans'] leading-[54px]">{schedule.schedule.plane.code}</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="text-center text-[#111] text-base font-medium font-['Plus Jakarta Sans'] mx-0 md:mx-4">
                                                                            <button
                                                                                onClick={()=> {navigate("/trips-detail")}}
                                                                                className="my-4 justify-center rounded-md bg-white disabled:bg-gray-400 hover:text-base font-bold leading-6 text-primary-dark">
                                                                                <p className="text-center text-primary text-sm md:text-base font-bold font-['Plus Jakarta Sans'] md:p-2 ">
                                                                                    Details <RightOutlined className="ml-1 md:ml-5"/>
                                                                                </p>
                                                                            </button>
                                                                            </div>
                                                                            </Card.Grid>
                                                                        </Card>
                                                                </div>
                                                            </>
                                                        })}
                                                    </div>
                                                    <div style={{ textAlign: 'center' }}>
                                                        <Pagination
                                                            total={ExpiredSchedules.length}
                                                            defaultPageSize={pageSize}
                                                            current={currentPageExpired}
                                                            onChange={handlePageChangeExpired}
                                                            showSizeChanger={false}
                                                            showQuickJumper={false}
                                                            hideOnSinglePage={true}
                                                            className="my-1"
                                                        />
                                                    </div>
                                                </>
                                            )}
                                    </TabPane>
                                </Tabs>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            
                        </div>
                    </div>
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
