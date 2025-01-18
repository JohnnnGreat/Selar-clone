import React, { useState, useTransition } from "react";
import "../styles/auth.scss";
import { Link, redirect, useNavigate } from "@remix-run/react";
import { useForm } from "react-hook-form";
import { loginSchema } from "~/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { toast } from "sonner";
import { AxiosError } from "axios";
import ApiRequest from "~/lib/axios";
import { Loader } from "lucide-react";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import useUserInformation from "~/actions/user";

const LoginComponent = () => {
   const form = useForm<z.infer<typeof loginSchema>>({
      resolver: zodResolver(loginSchema),
      defaultValues: {},
   });
   const navigate = useNavigate();
   const [transition, startTransition] = useTransition();

   const { login } = useUserInformation((state) => state);
   const isSubmitting = transition;
   async function onSubmit(values: z.infer<typeof loginSchema>) {
      startTransition(async () => {
         try {
            const body = {
               email: values.email,
               password: values.password,
            };
            const { data } = await ApiRequest.post("/authorization/login", body);

            Cookies.set("auth-tokend", data.user.token, {
               expires: 30,
               secure: process.env.NODE_ENV === "production",
               sameSite: "lax",
            });

            login(data?.user);

            toast.success(data.status);

            navigate("/me/dashboard");
         } catch (error) {
            if (error instanceof AxiosError) {
               toast.error(error.response?.data.message);
            }
         }
      });
   }

   const [isConsentAgreed, setIsConsentAgreed] = useState(false);

   return (
      <div className="login">
         <div className="login__wrapper">
            <h1>Login to your Marketly Account</h1>
            <p className="login__desc">
               Already have an accont? <Link to="/register">Create new account</Link>
            </p>

            {/* Form Section */}
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
               >
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="form__label">Email Address</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="johndoe@mail.com"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="password"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="form__label">Password</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="**********"
                                 type="password"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <Button
                     className="w-full"
                     type="submit"
                     disabled={isSubmitting || Object.keys(form.formState.errors).length > 0}
                  >
                     {isSubmitting && (
                        <Loader
                           size="16"
                           className="ml-2"
                        />
                     )}
                     Login
                  </Button>
               </form>
            </Form>
         </div>
      </div>
   );
};

export default LoginComponent;
