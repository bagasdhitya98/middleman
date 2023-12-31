import { AddButton } from "../../../components/CustomButton";
import InputCustom from "../../../components/InputCustom";

import { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { getCookie } from "cookies-next";

import Head from "next/head";
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
    fetch("https://middleman.altapro.online/register", requestOptions)
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
      <Head>
        <title>MIDDLEMAN</title>
        <meta name="description" content="Middleman website" />
        <link rel="icon" href="/favicon.png" />
      </Head>
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
                id="input-name"
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Shop Name"
              />
              <InputCustom
                id="input-email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
              />
              <InputCustom
                id="input-phone"
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                placeholder="Phone Number"
              />
              <InputCustom
                id="input-password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
              <InputCustom
                id="input-address"
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="Address"
              />
            </div>
            <div className="mt-2">
              <AddButton id="to-register" loading={loading} title="sign up" />
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
