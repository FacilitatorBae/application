import { BiMedal } from "react-icons/bi";
import { BsGift, BsTruck, BsMegaphone } from "react-icons/bs";
import { IconContext } from "react-icons";
import { Progress } from "@material-tailwind/react";

const Summary = () => {
  return (
    <div className="flex h-full w-[70%] flex-col justify-between bg-gray-300 p-5">
      <div className="pb-5 font-poppins text-3xl font-bold">Summary</div>
      <div className="flex w-full flex-col justify-between pb-5">
        <div className="flex justify-between bg-gray-100 p-2">
          <div className="flex h-full flex-col justify-center font-poppins">
            <div className="font-bold">John Doe</div>
            <div className="text-sm font-thin">New York</div>
          </div>
          <div className="flex h-full w-[40%] justify-between font-poppins text-lg font-semibold">
            <div className="flex h-full w-20 flex-col justify-center break-words text-center">
              <div>178</div>
              <div className="text-xs font-thin text-gray-700 ">Sales</div>
            </div>
            <hr className="h-[70%] self-center border-l-[1px] border-solid border-gray-700" />
            <div className="flex h-full w-20 flex-col justify-center break-words text-center">
              <div>123</div>
              <div className="text-xs font-thin text-gray-700">Comms</div>
            </div>
            <hr className="h-[70%] self-center border-l-[1px] border-solid border-gray-700" />
            <div className="flex h-full w-20 flex-col justify-center break-words text-center">
              <div>$8794</div>
              <div className="text-xs font-thin text-gray-700">Earnings</div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-5">
        <div className="flex h-28 flex-row justify-between bg-gray-100  p-2">
          <div className="flex w-[50%] flex-col justify-center text-center font-poppins text-sm font-thin">
            <div className="flex flex-row items-center justify-center font-poppins text-xl font-semibold">
              Bronze User
              <BiMedal color="brown" />
            </div>
            $789 in earnings to silver level
            <div className="flex w-[100%] justify-center">
              <div className="w-[90%]">
                <Progress value={10} />
              </div>
            </div>
          </div>
          <div className="flex w-[50%] flex-col justify-between pl-5 font-poppins text-xl font-semibold">
            <div className="text-center text-sm font-medium">
              Silver benefits include:
            </div>
            <div className="flex w-full justify-between">
              <div className="flex w-20 flex-col justify-around">
                <div className="flex h-10 w-full items-center justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-[1px] border-solid border-gray-300">
                    <IconContext.Provider
                      value={{ className: "text-gray-800" }}
                    >
                      <BsGift />
                    </IconContext.Provider>
                  </div>
                </div>
                <span className="w-full text-center text-[10px] font-thin">
                  Random Gifts
                </span>
              </div>
              <div className="flex w-20 flex-col justify-around">
                <div className="flex h-10 w-full items-center justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-[1px] border-solid border-gray-300">
                    <IconContext.Provider
                      value={{ className: "text-gray-800" }}
                    >
                      <BsMegaphone />
                    </IconContext.Provider>
                  </div>
                </div>
                <span className="w-full text-center text-[10px] font-thin">
                  Random Gifts
                </span>
              </div>
              <div className="flex w-20 flex-col justify-around">
                <div className="flex h-10 w-full items-center justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-[1px] border-solid border-gray-300">
                    <IconContext.Provider
                      value={{ className: "text-gray-800" }}
                    >
                      <BsTruck />
                    </IconContext.Provider>
                  </div>
                </div>
                <span className="w-full text-center text-[10px] font-thin">
                  Random Gifts
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-40 flex-row justify-between bg-red-100">
        <div className="flex h-40 w-full flex-row justify-between bg-gray-100">
          <div className="flex w-[50%] flex-col justify-center p-2 text-center font-poppins text-xl font-semibold">
            Your Top products
          </div>
          <div className="flex w-[50%] flex-wrap justify-end">
            <div className="h-20 w-20 bg-blue-100"></div>
            <div className="h-20 w-20 bg-blue-200"></div>
            <div className="h-20 w-20 bg-blue-300"></div>
            <div className="h-20 w-20 bg-blue-400"></div>
            <div className="h-20 w-20 bg-blue-500"></div>
            <div className="h-20 w-20 bg-blue-600"></div>
            <div className="h-20 w-20 bg-blue-700"></div>
            <div className="h-20 w-20 bg-blue-800"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
