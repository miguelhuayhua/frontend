"use client";
import { Button } from "antd";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link className="btn btn-dark" href={"/nuevocaso"}>
        Nuevo Caso prueba
      </Link>
      <Button onClick={()=>{
        axios.post(process.env.BACKEND_URL+"/").then(res=>{
          console.log(res)
        })
      }}>Prueba API</Button>
    </main>
  );
}
