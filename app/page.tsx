import Image from "next/image";
import DynamicInput from "./component/reusable-component/DynamicInput";
import { Button } from 'primereact/button';

export default function Home() {
  return (
    <div className="bg-linear-to-r from-[#98B2E2] to-[#D2E2BF] min-h-screen flex items-center justify-center">
      <div className="bg-white/50 p-10 rounded-[30px] shadow-lg w-110">
        <div>
          <h1 className="text-2xl font-bold text-[#1D2939]">Welcome to Portfolio</h1>
          <p className="text-[#667085] mt-2 text-md">Let's get started with Portfolio Dashboard</p>
        </div>
        <div className="mt-6 flex flex-col gap-6">
          <DynamicInput placeholder="Email***" type="email" icon="pi-user" />
          <DynamicInput placeholder="Password***" type="password" icon="pi-lock" />
          <Button className="w-full !rounded-full h-12 !bg-[#1D7AFC] !text-sm" label="Log In" />
        </div>
        <div>
          <p className="text-[#667085] mt-4 text-sm text-center">
            Don't have an account?{" "}
            <span className="text-[#1D7AFC] cursor-pointer hover:underline">Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
}
