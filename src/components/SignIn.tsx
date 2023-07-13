import { signIn } from "next-auth/react";
import React from "react";

const SignIn: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="flex justify-center">
      <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
        <div className="mb-4 text-center">
          <h3 className="text-2xl leading-6 text-gray-900">{message}</h3>
        </div>
        <div className="mt-16">
          <button
            type="button"
            className="dark:focus:ring-[#4285F4]/55 mb-2 mr-2 flex w-full items-center justify-center rounded-lg bg-[#4285F4] px-5 py-2.5 text-center text-lg font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50"
            onClick={() => void signIn("google")}
          >
            <svg
              className="mr-2 h-4 w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 19"
            >
              <path
                fillRule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clipRule="evenodd"
              />
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
