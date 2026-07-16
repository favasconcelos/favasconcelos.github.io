import Photos from "@/components/photos";
import Social from "@/components/social";
import Born from "@/components/icon/born";
import Home from "@/components/icon/home";
import flagBR from "@/assets/flag-brazil.svg";
import flagES from "@/assets/flag-spain.svg";

export default function Info() {
  return (
    <div className="p-6 flex flex-col flex-1">
      <div className="flex-1 max-md:text-center">
        <h1 className="font-light leading-[1.2] max-[374px]:text-[1.6em]">
          Felipe Vasconcelos is a{" "}
          <span className="font-bold">Software Developer</span>
        </h1>
        <h3 className="font-light mt-4 flex items-center flex-wrap gap-1 max-md:justify-center max-[374px]:text-[1em]">
          <Born className="inline-block w-4 h-4 align-middle fill-[#4a4a4a] max-md:fill-white mx-1" />
          <span className="font-bold">Recife</span>
          <img
            src={flagBR}
            className="inline-block w-4 h-4 align-middle mx-1"
            alt="Brazil"
            title="Brazil"
          />
          {" -- "}
          <Home className="inline-block w-4 h-4 align-middle fill-[#4a4a4a] max-md:fill-white mx-1" />
          <span className="font-bold">Zaragoza</span>
          <img
            src={flagES}
            className="inline-block w-4 h-4 align-middle mx-1"
            alt="Spain"
            title="Spain"
          />
        </h3>
        <hr className="hidden md:block border-0 border-t border-dashed border-[#4a4a4a] my-8" />
        <Photos />
        <hr className="hidden md:block border-0 border-t border-dashed border-[#4a4a4a] my-8" />
        <Social />
      </div>
      <div className="flex-none text-[0.7em] font-light w-full flex items-center justify-center mb-2 max-md:mb-0">
        COPYRIGHT © 2015 - FELIPE VASCONCELOS
      </div>
    </div>
  );
}
