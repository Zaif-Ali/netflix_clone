import AuthBox from "@/components/AuthBox";

/* eslint-disable @next/next/no-img-element */
const index = ({}) => {
  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-70">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-8 md:h-12" />
        </nav>
        <div className="flex justify-center">
          <AuthBox />
        </div>
      </div>
    </div>
  );
};

export default index;
