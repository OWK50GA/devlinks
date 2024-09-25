import Link from "next/link";

export default function Home() {
  return (
    <div className="grid place-items-center">
        <Link href={'/signup'}>
          Sign Up
        </Link>
        <Link href={'/login'}>
          Login
        </Link>
    </div>
  );
}
