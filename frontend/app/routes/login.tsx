import React, { useState, useTransition } from "react";
import "../styles/auth.scss";
import LoginComponent from "~/components/login.client";
import { ClientOnly } from "remix-utils/client-only";

export const loader = async () => {
   return Response.json({ ok: true });
};

const Login = () => {
   return <ClientOnly>{() => <LoginComponent />}</ClientOnly>;
};

export default Login;
