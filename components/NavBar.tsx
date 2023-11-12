"use client";
import { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { database } from "@/app/firebase";
import Image from "next/image";

type Company = {
  id: string;
  name: string;
  logo: string;
  secure: string;
};

type ImageLoaderProps = {
  src: string;
};

export default function NavBar() {
  const [loading, setLoading] = useState<boolean>(true);
  const [nombre, setNombre] = useState("");
  const [logo, setLogo] = useState("");

  async function fetchData() {
    setLoading(true);
    const productsCollection = collection(database, "company");
    const productQuery = query(productsCollection);
    const querySnapshot = await getDocs(productQuery);
    const fetchedData: Array<Company> = [];
    querySnapshot.forEach((doc) => {
      fetchedData.push({ id: doc.id, ...doc.data() } as Company);
    });
    setNombre(fetchedData[0].name);
    setLogo(fetchedData[0].logo);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const ImageLoader = ({ src }: ImageLoaderProps) => {
    return `${src}`;
  };

  return (
    <nav className="w-screen h-20 bg-cyan-900 flex flex-row items-center p-10">
      <Image
        loader={ImageLoader}
        src={logo}
        alt="Logo"
        width={50}
        height={50}
        className="w-10 h-10 mr-10"
      />
      <h1 className="text-white font-medium text-lg">{nombre}</h1>
    </nav>
  );
}
