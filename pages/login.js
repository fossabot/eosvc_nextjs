import Head from "next/head";
import Layout from "../layout/layout";
import Link from "next/link";
import styles from "../styles/Form.module.css";
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import login_validate from "../lib/validate";

export default function Login() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  //console.log(process.env.APP_URL, "PROD");

  // formik hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: login_validate,
    onSubmit,
  });
  //Login with username(email)/password
  async function onSubmit(values) {
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });

    if (status.ok) router.push(status.url);
  }
  // Google Handler function
  async function handleGoogleSignin() {
    signIn("google", {
      callbackUrl: process.env.APP_URL,
    });
  }

  // Github Login
  async function handleGithubSignin() {
    signIn("github", { callbackUrl: process.env.APP_URL });
  }

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Explore</h1>
          <p className="w-3/4 mx-auto text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
            officia?
          </p>
        </div>
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div
            className={`${styles.input_group} ${
              formik.errors.email && formik.touched.email
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input_text}
              {...formik.getFieldProps("email")}
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>
          <div className={styles.input_group}>
            <input
              type={`${show ? "text" : "password"}`}
              name="password"
              placeholder="passwords"
              className={styles.input_text}
              {...formik.getFieldProps("password")}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow(!show)}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>
          <div className="input-button">
            <button type="submit" className={styles.button}>
              Login
            </button>
          </div>
          <div>
            <button
              className={styles.button_custom}
              onClick={handleGoogleSignin}
            >
              Sign In with Google
              <Image
                src={"/assets/google.svg"}
                width="20"
                height={20}
                alt="Google logo"
              ></Image>
            </button>
          </div>
          <div>
            <button
              className={styles.button_custom}
              onClick={handleGithubSignin}
            >
              Sign In with GitHub
              <Image
                src={"/assets/github.svg"}
                width={25}
                height={25}
                alt="GitHub logo"
              ></Image>
            </button>
          </div>
        </form>
        <p className="text-center text-gray-400 ">
          don't have an account yet? <Link href={"/register"}>Sign Up </Link>
        </p>
      </section>
    </Layout>
  );
}
