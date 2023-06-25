import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link className="btn btn-dark" href={"/nuevocaso"}>
        Nuevo Caso prueba
      </Link>
    </main>
  );
}
