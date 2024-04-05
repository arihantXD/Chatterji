import axios from "axios";
import { Form, Link, redirect } from "react-router-dom";
import logReg from "../animations/logReg2.json";
import Lottie from "react-lottie";
import { Logo } from "../components";
import { Button, Input } from "@nextui-org/react";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
export const action = async ({ request }) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());
  const { email, password } = payload;
  if (!email || !password) {
    return toast.error("Some fields are empty");
  }
  try {
    await axios.post("/api/auth/login", payload);
    toast.success("Yay, user logged in");
  } catch (error) {
    console.log(error);
    return null;
  }
  return redirect("/dashboard");
};
const Login = () => {
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
      <div className="hidden  h-[450px] w-[400px] md:flex flex-col items-center gap-3 mt-[100px]">
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
        <Form className="w-[100%] flex flex-col gap-5" method="post">
          <Input
            isClearable
            type="email"
            variant="bordered"
            name="email"
            label="Email"
            radius="none"
            color="danger"
            size="md"
            defaultValue="leo@gone.com"
            placeholder="Ex. arihant@yellow.com"
          />
          <Input
            isClearable
            type="password"
            variant="bordered"
            defaultValue="1234"
            label="Password"
            radius="none"
            color="danger"
            name="password"
            size="md"
            placeholder="Ex. uRCutie"
          />
          <span className="px-1 self-start text-sm text-gray md:mt-[80px]">
            Already registered ?{" "}
            <Link to={"/register"} className="underline">
              Register
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
            Login
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
export default Login;
