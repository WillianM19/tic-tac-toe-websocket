import { useRouter } from "next/router";
import Image from "next/image";
import HomeImg from "/public/img/icon-home.svg";

export default function HomeBtn() {
  const router = useRouter();
  return (
    <div
      onClick={() => router.replace("/")}
      className="flex gap-[11px] text-[24px] font-bold absolute top-[22px] left-[40px] cursor-pointer"
    >
      <div className="bg-white w-max p-[12px] rounded-full flex">
        <Image src={HomeImg} alt="icon home" />
      </div>
      <p className="bg-white w-[130px] p[10px] rounded-br-[34px] rounded-tr-[34px] rounded-tl-[13px] flex items-center pl-[15px]">
        HOME
      </p>
    </div>
  );
}
