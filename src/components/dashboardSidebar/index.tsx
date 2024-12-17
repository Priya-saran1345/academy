"use client";
import React, { useState, useEffect } from "react";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineMenuBook, MdOutlineContactSupport } from "react-icons/md";
import { PiCertificateLight } from "react-icons/pi";
import { GrSettingsOption } from "react-icons/gr";
import { RiUserSettingsLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { BsBoxArrowLeft } from "react-icons/bs";
import { GoBook } from "react-icons/go";
import { useRouter, usePathname } from "next/navigation";

const DashboardSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeOption, setActiveOption] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // lg breakpoint in Tailwind is 1024px
    };
    
    handleResize(); // Check initially
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (pathname.includes("/dashboard/mycourses")) {
      setActiveOption("myCourses");
    } else if (pathname.includes("/dashboard/allcourses")) {
      setActiveOption("other-courses");
    } else if (pathname.includes("/dashboard/certificate")) {
      setActiveOption("certificate");
    } else if (pathname.includes("/dashboard/updates")) {
      setActiveOption("updates");
    } else if (pathname.includes("/dashboard/profile")) {
      setActiveOption("profile");
    } else if (pathname.includes("/dashboard/support")) {
      setActiveOption("help");
    } else {
      setActiveOption("dashboard");
    }
  }, [pathname]);

  const getItemClass = (option:any) => {
    return `flex gap-3 items-center text-[16px] h-[48px] cursor-pointer font-medium py-3 px-2 rounded-md my-2 transition-all duration-300 ${
      activeOption === option
        ? "bg-orange text-white"
        : "bg-[#F9F9F9] text-[#545454] hover:bg-orange hover:text-white"
    }`;
  };

  const handleNavigation = (option:any, path:any) => {
    setActiveOption(option);
    router.push(path);
  };

  const logout = () => {
    document.cookie = "login_access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "login_refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  };

  const sidebarVariants = {
    expanded: { width: "245px" ,  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)"  },
    collapsed: { width: "55px" },
  };

  return (
    <motion.div
      className="group w-fit z-50 sticky  top-16 min-h-[93vh] h-[90vh] overflow-hidden flex flex-col"
      initial="collapsed"
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={sidebarVariants}
      onMouseOver={() => isLargeScreen && setIsExpanded(true)}
      onClick={() => !isLargeScreen && setIsExpanded(true)}
      onMouseLeave={() => isLargeScreen && setIsExpanded(false)}
    
    >
      <div className="bg-[#F7F7F7] h-full px-2 flex flex-col justify-between overflow-hidden">
        <ul className="pt-4">
          {[
            { option: "dashboard", icon: RxDashboard, label: "Dashboard", path: "/dashboard" },
            { option: "myCourses", icon: MdOutlineMenuBook, label: "My Courses", path: "/dashboard/mycourses" },
            { option: "other-courses", icon: GoBook, label: "Explore More", path: "/dashboard/allcourses" },
            { option: "certificate", icon: PiCertificateLight, label: "Certificates", path: "/dashboard/certificate" },
            { option: "updates", icon: GrSettingsOption, label: "Updates", path: "/dashboard/updates" },
            { option: "profile", icon: RiUserSettingsLine, label: "Profile and Settings", path: "/dashboard/profile" },
            { option: "help", icon: MdOutlineContactSupport, label: "Help & Support", path: "/dashboard/support" },
          ].map(({ option, icon: Icon, label, path }, index) => (
            <motion.li
              key={option}
              className={getItemClass(option)}
              onClick={() => handleNavigation(option, path)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Icon className="text-[23px]" />
              {isExpanded && <motion.span className="w-[150px]">{label}</motion.span>}
            </motion.li>
          ))}
        </ul>

        {/* Logout button positioned at the bottom */}
        <motion.div
          className="text-orange w-full text-[18px] cursor-pointer font-medium flex gap-3 items-center mx-4 mb-5"
          onClick={logout}
        >
          <BsBoxArrowLeft className="text-[23px] font-bold" />
          {isExpanded && <motion.span className="w-[150px]">Log out</motion.span>}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardSidebar;
