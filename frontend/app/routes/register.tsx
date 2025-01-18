import React, { useState, useTransition } from "react";
import "../styles/auth.scss";
import { Link, useNavigate } from "@remix-run/react";
import { useForm } from "react-hook-form";
import { registerSchema } from "~/lib/schema";
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

export const loader = async () => {
  return Response.json({ ok: true });
};

const Register = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {},
  });

  const [transition, startTransition] = useTransition();

  const isSubmitting = transition;

  const navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    startTransition(async () => {
      try {
        const body = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        };
        const { data } = await ApiRequest.post("/authorization/register", body);

        toast.success(data.status);

        navigate("/login");
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        }
      }
    });
  }

  const [isConsentAgreed, setIsConsentAgreed] = useState(false);

  return (
    <div className="register">
      <div className="register__left">
        <h1>Create your Marketly Account</h1>
        <p className="register__desc">
          Already have an accont? <Link to="/login">Log in</Link>
        </p>

        {/* Form Section */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="form__grid">
              {" "}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="form__label">First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="form__label">Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form__label">Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@mail.com" {...field} />
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
                    <Input placeholder="**********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form__label">
                    Confirm Password
                  </FormLabel>
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

            <div className="flex gap-3">
              <Input
                placeholder="**********"
                className="size-6 bg-[#5a0b4d]"
                type="checkbox"
                onChange={(e) => setIsConsentAgreed(e.target.checked)}
              />
              <p className="text-small">
                Signing up for a Selar account means you agree to our privacy
                policy and terms & conditions
              </p>
            </div>
            <Button
              className="w-full"
              type="submit"
              disabled={
                isSubmitting ||
                !isConsentAgreed ||
                Object.keys(form.formState.errors).length > 0
              }
            >
              {isSubmitting && <Loader size="16" className="ml-2" />}
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <div className="register__right"></div>
    </div>
  );
};

export default Register;
