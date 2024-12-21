import React from 'react'
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="px-4 w-full  mx-auto lg:w-[77%]">
      <div className="flex flex-col sm:flex-row pt-16 pb-16 md:pb-24 justify-center sm:justify-between border-b  border-slate-900">
        <div>
          <ul className="flex justify-center sm:justify-start flex-row gap-5 text-[16px] md:text-[18px] font-medium">
            <Link href={'/'}>
            <li className="hover:text-[#F24A25] text-[#F24A25]">Home</li>
            </Link>
            <Link href={'/courses'}>
            <li className="hover:text-[#F24A25]">Courses</li>
            </Link>
            <Link href={'/contact'}>
            <li className="hover:text-[#F24A25]">Contact Us</li>
            </Link>
            <Link href={'/'}>
            {/* <li className="hover:text-[#F24A25]">About Us</li> */}
            </Link>
          </ul>
        </div>
        <div className="flex justify-center  sm:justify-start gap-3 text-[20px] md:text-[25px] mt-6 md:mt-0">
          <div className="social-login-icons">
            <Link href='https://x.com/' target='_blank'>
              <div className="socialcontainer">
                <div className="icon social-icon-1-1">
                  <svg
                    viewBox="0 0 512 512"
                    height=".9em"
                    xmlns="http://www.w3.org/2000/svg"
                    className="svgIcontwit"
                    fill="white"
                  >
                    <path
                      d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                    ></path>
                  </svg>
                </div>

                <div className="social-icon-1">
                  <svg
                    viewBox="0 0 512 512"
                    height=".9em"
                    xmlns="http://www.w3.org/2000/svg"
                    className="svgIcontwit"
                    fill="white"
                  >
                    <path
                      d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                    ></path>
                  </svg>
                </div>
              </div>
            </Link>
            <Link href='https://www.instagram.com/' target='_blank'>
              <div className="socialcontainer">
                <div className="icon social-icon-2-2">
                  <svg
                    fill="white"
                    className="svgIcon"
                    viewBox="0 0 448 512"
                    height="1.05em "
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                    ></path>
                  </svg>
                </div>
                <div className="social-icon-2">
                  <svg
                    fill="white"
                    className="svgIcon"
                    viewBox="0 0 448 512"
                    height="1.05em "
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                    ></path>
                  </svg>
                </div>
              </div>
            </Link>
            <Link href='https://www.facebook.com/' target='_blank'>
              <div className="socialcontainer">
                <div className="icon social-icon-3-3">
                  <svg
                    viewBox="0 0 384 512"
                    fill="white"
                    height="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"
                    ></path>
                  </svg>
                </div>
                <div className="social-icon-3">
                  <svg
                    viewBox="0 0 384 512"
                    fill="white"
                    height="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"
                    ></path>
                  </svg>
                </div>
              </div>
            </Link>
            <Link href={'https://www.linkedin.com/'} target='_blank'>
              <div className="socialcontainer">
                <div className="icon social-icon-4-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                  </svg>
                </div>
                <div className="social-icon-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" className="bi bi-linkedin" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                  </svg>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </div>
      <div className="flex justify-center items-center py-3 text-slate-500 font-semibold text-[14px] md:text-[16px]">
      <p>Copyright © - All Rights Reserved By W3era Pvt Ltd.</p>
      </div>
    </div>

  )
}

export default Footer