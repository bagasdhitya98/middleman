import { AddButton } from "../../../components/CustomButton";
import InputCustom from "../../../components/inputCustom";

import { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { getCookie } from "cookies-next";

import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const token = getCookie("token");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      name,
      email,
      password,
      phone,
      address,
    };
    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch("https://postme.site/register", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { code, message } = result;
        if (code === 201) {
          router.push("/auth/login");
        }
        alert(message);
      })
      .catch((err) => {
        console.log(err);
        alert(err.toString());
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div className="min-h-screen bg-base-100 flex justify-center flex-col items-center">
        <div className="hidden md:block my-10"></div>
        <div className="h-1/2 ">
          <div className="mb-10">
            <h1 className="text-black font-Roboto font-extrabold text-5xl md:text-6xl">
              Hi!
            </h1>
            <h4 className="text-black/50 font-Roboto text-2xl italic md:text-3xl">
              Create a new account
            </h4>
          </div>

          {/* form */}
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="lg:min-w-full">
              <InputCustom
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Name shop"
              />
              <InputCustom
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
              />
              <InputCustom
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                placeholder="Phone Number"
              />
              <InputCustom
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
              <InputCustom
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="Addres"
              />
            </div>
            <div className="mt-2">
              <AddButton loading={loading} id="to-register" title="sign up" />
            </div>
          </form>
          <div className="flex mt-4 lg:pb-10 font-Poppins font-normal md:text-lg lg:justify-center lg:text-xl">
            <h5 className="text-black ">Already have an account?</h5>
            <Link href="/auth/login">
              <a id="to-login" className="text-primary ml-2">
                Login
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
