"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import DynamicInput from "../../../component/reusable-component/DynamicInput";
import { Button } from 'primereact/button';
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { authService } from "../../../services/authService";
import { useToast } from "../../../component/reusable-component/ToastProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const userSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof userSchema>;

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const methods = useForm<LoginForm>({
    resolver: zodResolver(userSchema),
    mode: "onBlur",
    reValidateMode: "onBlur"
  });
  const { handleSubmit } = methods;
  const toast = useToast();

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      const res = await authService.login(data);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      router.replace("/pages/dashboard");
    } catch (error: any) {
      console.log(error.response.data);
      toast.current?.show({ severity: "error", summary: "Login Failed", detail: error.response.data.error, life: 3000 });
    } finally {
      setLoading(false); // hide loader / enable button
    }
  }

  return (
    <div className="bg-linear-to-r from-[#98B2E2] to-[#D2E2BF] min-h-screen flex items-center justify-center">
      <div className="bg-white/50 p-10 rounded-[30px] shadow-lg w-110">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome to Portfolio</h1>
          <p className="text-[#667085] mt-2 text-md">Let's get started with Portfolio Dashboard</p>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} >
            <div className="mt-6 flex flex-col gap-6">
              <DynamicInput placeholder="Email***" type="email" name="email" icon="pi-user" />
              <DynamicInput placeholder="Password***" type="password" name="password" icon="pi-lock" />
              <Button loading={loading} type="submit" className="w-full !rounded-full h-12 !bg-[#1D7AFC] !text-sm" label="Log In" />
            </div>
          </form >
        </FormProvider>
        {/* <div>
          <p className="text-[#667085] mt-4 text-sm text-center">
            Don't have an account?{" "}
            <span className="text-[#1D7AFC] cursor-pointer hover:underline">Sign Up</span>
          </p>
        </div> */}
      </div>
    </div>
  );
}
