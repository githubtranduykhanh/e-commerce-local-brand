import { memo } from "react";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
const { MdEmail,FaMapMarkerAlt,FaPhoneAlt,FaFacebookF,FaTwitter,FaPinterest,FaGooglePlusG,FaLinkedinIn,FaFlickr } = icons

const Footer = () => {
  return <div className="w-full">
    <div className="bg-main py-[25px]">
        <div className="w-main m-auto flex justify-between items-center">
            <div className="flex flex-col">
                <span className="text-white uppercase text-[20px]">Sign up to Newsletter</span>
                <span className="text-xs text-[#b7b7b7]">Subscribe now and receive weekly newsletter</span>
            </div>
            <div className="w-[50%] footer-input-email">
                <input className="text-white w-full h-[50px] px-[20px] bg-[#ffffff1a] rounded-full border-none outline-none" type="email" placeholder="Email address" />
                <MdEmail className="text-white footer-input-icon" size={20}/>
            </div>
        </div>
    </div>
    <div className="h-[407px] w-full bg-gray-900 py-[50px]">
        <div className="w-main flex m-auto text-white gap-4">
            <div className="flex-2">
                <h3 className="font-semibold pl-[10px] ml-[4px] mb-4 border-l-4 border-l-main">ABOUT US</h3>
                <ul className="text-xs flex flex-col gap-4">
                    <li className="flex justify-start items-center text-gray-400">
                        <FaMapMarkerAlt className="mr-2 text-white" />
                        <strong className=" text-white">Address</strong>
                        : 474 Ontario St Toronto, ON M4X 1M7 Canada
                    </li>
                    <li className="flex justify-start items-center text-gray-400">
                        <FaPhoneAlt className="mr-2 text-white" />
                        <strong className=" text-white">Phone</strong>
                        : (+1234)56789xxx
                    </li>
                    <li className="flex justify-start items-center text-gray-400">
                        <MdEmail className="mr-2 text-white" />
                        <strong className=" text-white">Mail</strong>
                        : tadathemes@gmail.com
                    </li>
                    <li className="flex justify-start gap-2 items-center">
                        <Link className="bg-[#ffffff1a] p-[11px] rounded"><FaFacebookF size={17}></FaFacebookF></Link>
                        <Link className="bg-[#ffffff1a] p-[11px] rounded"><FaTwitter size={17}></FaTwitter></Link>
                        <Link className="bg-[#ffffff1a] p-[11px] rounded"><FaPinterest size={17}></FaPinterest></Link>
                        <Link className="bg-[#ffffff1a] p-[11px] rounded"><FaGooglePlusG size={17}></FaGooglePlusG></Link>
                        <Link className="bg-[#ffffff1a] p-[11px] rounded"><FaLinkedinIn size={17}></FaLinkedinIn></Link>
                        <Link className="bg-[#ffffff1a] p-[11px] rounded"><FaFlickr size={17}></FaFlickr></Link>
                    
                    </li>
                </ul>
            </div>
            <div className="flex-1">
                <h3 className="font-semibold pl-[10px] mb-4 border-l-4 border-l-main">INFORMATION</h3>
                <ul className="text-xs flex flex-col gap-4 text-gray-400 ">
                    <Link className="hover:text-white">Typography</Link>
                    <Link className="hover:text-white">Gallery</Link>
                    <Link className="hover:text-white">Store Location</Link>
                    <Link className="hover:text-white">Today's Deals</Link>
                    <Link className="hover:text-white">Contact</Link>
                </ul>
            </div>
            <div className="flex-1">
                <h3 className="font-semibold pl-[10px] mb-4 border-l-4 border-l-main">INFORMATION</h3>
                <ul className="text-xs flex flex-col gap-4 text-gray-400 ">
                    <Link className="hover:text-white">Help</Link>
                    <Link className="hover:text-white">Free Shipping</Link>
                    <Link className="hover:text-white">FAQs</Link>
                    <Link className="hover:text-white">Return & Exchange</Link>
                    <Link className="hover:text-white">Testimonials</Link>
                </ul>
            </div>
            <div className="flex-1">
                <h3 className="font-semibold pl-[10px] mb-4 border-l-4 border-l-main">#DIGITALWORLDSTORE</h3>
            </div>

        </div>
        <div className="w-main m-auto pt-7 mt-10 border-t border-t-[#ffffff33] ">
            <h3 className="font-semibold text-white pl-[10px] mb-4 border-l-4 border-l-main">PRODUCT TAGS</h3>
            <ul className="flex flex-wrap justify-start items-center text-gray-400 text-sm gap-[10px]">
                <li >
                    <Link>10-20</Link>
                </li>
                <li className="pl-[10px]  border-l border-l-[#ffffff33]">
                    <Link>100-200</Link>
                </li>
                <li className="pl-[10px]  border-l border-l-[#ffffff33]">
                    <Link>20-50</Link>
                </li>
                <li className="pl-[10px]  border-l border-l-[#ffffff33]">
                    <Link>200-300</Link>
                </li>
                <li className="pl-[10px]  border-l border-l-[#ffffff33]">
                    <Link>300-400</Link>
                </li>
                <li className="pl-[10px]  border-l border-l-[#ffffff33]">
                    <Link>400-500</Link>
                </li>
                <li className="pl-[10px]  border-l border-l-[#ffffff33]">
                    <Link>50-100</Link>
                </li>
                <li className="pl-[10px]  border-l border-l-[#ffffff33]">
                    <Link>500-600</Link>
                </li>
                <li className="pl-[10px]  border-l border-l-[#ffffff33]">
                    <Link>600-700</Link>
                </li>
                <li className="pl-[10px]  border-l border-l-[#ffffff33]">
                    <Link>700-800</Link>
                </li>
                <li className="pl-[10px]  border-l border-l-[#ffffff33]">
                    <Link>800-900</Link>
                </li>
                <li className="pl-[10px]  border-l border-l-[#ffffff33]">
                    <Link>900-1000</Link>
                </li>
                <li className="pl-[10px]  border-l border-l-[#ffffff33]">
                    <Link>Accessories</Link>
                </li>
                <li className="pl-[10px]  border-l border-l-[#ffffff33]">
                    <Link>Acer</Link>
                </li>
            </ul>
        
        </div>
    </div>
  </div>;
};

export default memo(Footer);
