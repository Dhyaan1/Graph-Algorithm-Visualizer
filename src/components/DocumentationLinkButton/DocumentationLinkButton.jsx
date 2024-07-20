import WebsiteLogo from "../../assets/icon-1.svg";

export default function DocumentationLinkButton() {
  return (
    <>
      <a
        href="https://drive.google.com/file/d/13_UUkqcGD7KFx85PR4pgCD9R1sAPelnN/view?usp=drive_link"
        target="_blank"
        className="m-4 absolute top-0 max-[1330px]:px-2 max-[1308px]:px-5 max-[1308px]:top-20 max-[711px]:top-0 max-[551px]:relative right-0 z-10 inline-flex items-center justify-center gap-4 px-5 py-2 text-base font-medium rounded-lg text-gray-400 bg-[#0B132B] border-[2px] border-[#3A506B] hover:bg-gray-700 hover:text-white"
      >
        <img className="w-8 h-8" src={WebsiteLogo} alt="InspectElementLogo1" />
        <div className="flex items-center justify-center">
          <span className="w-full">Read the Docs</span>
          <svg
            className="w-4 h-4 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </div>
      </a>
    </>
  );
}
