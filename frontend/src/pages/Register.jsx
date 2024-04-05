import { useEffect, useState } from "react";
import { Form, Link, redirect, useParams } from "react-router-dom";
import { Button, Input } from "@nextui-org/react";
import { FaGoogle } from "react-icons/fa";
import { Logo } from "../components";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import Peer from "peerjs";
import Webcam from "react-webcam";
import { useRef } from "react";
import axios from "axios";
import Lottie from "react-lottie";
import logReg from "../animations/logReg.json";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());
  const { name, email, password, confirmPassword } = payload;
  if (!name || !email || !password || !confirmPassword) {
    return toast.error("Some fields are empty");
  }
  if (password !== confirmPassword) {
    return toast.error("Password not matched");
  }
  try {
    const result = await axios.post("/api/auth/register", payload);
    toast.success("Yay, user registered");
  } catch (error) {
    console.log(error);
    return null;
  }
  return redirect("/login");
};
const Register = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: logReg,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex justify-center h-[100vh] items-center gap-[50px]">
      <div className="hidden h-[450px] w-[400px] md:flex flex-col items-center gap-3 mt-[100px]">
        <Lottie options={defaultOptions} width={400} height={360} />
        <span className="text-xs text-center font-normal text-gray">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
          consequatur pariatur est laboriosam totam sequi vel eos excepturi
          minima expedita!
        </span>
      </div>
      <div className="w-10/12 md:w-[30%] min-w-[320px] max-w-[500px] p-5 flex flex-col gap-3 items-center justify-center">
        <Logo />
        <div className="self-start px-1">
          <h6 className="font-medium">Welcome</h6>
          <span className="text-gray text-sm">
            Fill out all the details to register.
          </span>
        </div>
        <Form className="w-[100%] flex flex-col gap-3" method="post">
          <Input
            isClearable
            radius="none"
            color="danger"
            type="text"
            name="name"
            variant="bordered"
            label="Full Name"
            size="md"
            defaultValue=""
            placeholder="Ex. Arihant Kamde"
            // isRequired
          />
          <Input
            isClearable
            type="email"
            variant="bordered"
            name="email"
            label="Email"
            defaultValue=""
            radius="none"
            color="danger"
            size="md"
            placeholder="Ex. arihant@yellow.com"
            // isRequired
          />
          <Input
            isClearable
            type="password"
            variant="bordered"
            label="Password"
            radius="none"
            color="danger"
            name="password"
            defaultValue=""
            size="md"
            placeholder="Ex. uRCutie"
            // isRequired
          />
          <Input
            isClearable
            type="password"
            radius="none"
            color="danger"
            variant="bordered"
            name="confirmPassword"
            label="Confirm Password"
            defaultValue=""
            size="md"
            placeholder="Ex. HeyCutie"
            // isRequired
          />
          <span className="px-1 self-start text-sm text-gray">
            Already registered ?{" "}
            <Link to={"/login"} className="underline">
              Login
            </Link>
          </span>
          <Button
            radius="sm"
            color="danger"
            size="lg"
            variant="bordered"
            className="w-full"
            type="submit"
          >
            Register
          </Button>
        </Form>
        <div className="w-full flex flex-col items-center mt-2 gap-4">
          <Button
            variant="bordered"
            startContent={<FaGoogle color="red" size={25} />}
            radius="sm"
            size="lg"
            className="w-full "
          >
            Google Login
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Register;
