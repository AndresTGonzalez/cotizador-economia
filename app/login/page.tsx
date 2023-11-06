import LoginForm from "@/components/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="flex w-screen h-screen items-center justify-center bg-neutral-100">
      <div className="w-3/4 h-4/5 bg-white rounded-xl shadow-lg flex flex-row">
        <div className="w-2/5 h-full rounded-s-xl relative">
          <Image
            src="/login_image.jpg"
            alt="Picture of the author"
            className="rounded-l-xl"
            sizes="100vw"
            fill
            objectFit="cover"
          />
        </div>
        <div className="w-3/5 h-full flex flex-col items-center justify-center rounded-r-xl">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
