"use client";
import { useEffect, createContext, useContext, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/api";
import Cookies from 'js-cookie';

// Define an interface for the dashboard data
interface DashboardData {
    // Add fields based on the structure of your API response
}

interface ApiContextType {
    dashboard: any;
    profile: any// Change to your actual data type
    fetch: any
    discount:any
    courseid:any
    setdiscount: React.Dispatch<React.SetStateAction<any>>;
    setcourseid: React.Dispatch<React.SetStateAction<any>>;
    basic_detail:any

}
const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
    const [dashboard, setDashboard] = useState<any>(null);
    const [profile, setprofile] = useState<any>()
    const [discount, setdiscount] = useState<any>(0)
    const [courseid, setcourseid] = useState<any>()
    const [basic_detail, setbasic_detail] = useState<any>()
    const fetch = async () => {



        try {
            // API call to fetch dashboard data
            const response = await axios.get(`${BASE_URL}basic-settings/`);
           
            setbasic_detail(response.data);  // Update state with fetched data
          } catch (err) {
            console.log("Dashboard error", err);  // Log the full error for debugging
            // Update error state with error message
          }



        // dashboard api==========================================
        try {
            const token = Cookies.get('login_access_token');
            if (!token) {
                // setError('No token found'); // Update error state
                console.error('No token found');
                return;
            }
            const response = await axios.get(`${BASE_URL}dashboard/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setDashboard(response.data); // Update state with fetched data
        } catch (error: any) {
            // Update error state with the error message
            console.log("dashboard error", error.message);
        }
        // profile api==========================================================

        try {
            const token = Cookies.get('login_access_token');

            if (!token) {
                console.error('No token found');
                return;
            }
            const response = await axios.get(`${BASE_URL}profile/`, {

                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setprofile(response.data); // Update state with fetched data
        } catch (error: any) {
            // Update error state with the error message
            console.log("profile error", error.message);
        }

    };


    useEffect(() => {
        fetch();
    }, []);

    return (
        <ApiContext.Provider value={{ dashboard, profile, fetch , discount , setdiscount ,setcourseid ,courseid ,basic_detail }}>
            {children}
           {/* Display error message if any */}
        </ApiContext.Provider>
    );
};

export const useapi = () => {
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error('useapi must be used within an ApiProvider');
    }
    return context;
};
