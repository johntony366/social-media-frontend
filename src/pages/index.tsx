import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

export default function Home() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Redirect the user to /register
  return {
    redirect: {
      destination: "/register",
      permanent: false,
    },
  };
};
