import Button from "@/components/Button";
import Logo from "@/components/Logo";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-40 md:mt-20 w-5/6 mx-auto">

      <Logo />
      <div className="text-2xl md:text-3xl text-center my-8">
        Join a community of developers and other Devlinks users to easily share your profile to communities, hirers, etc.
      </div>

      <div className="flex mx-auto w-fit gap-4">
        <Link href={'/signup'}>
          <Button dark={false} text="Sign Up"/>
        </Link>
        <Link href={'/login'}>
          <Button dark={true} text="Login"/>
        </Link>
      </div>
    </div>
  );
}
