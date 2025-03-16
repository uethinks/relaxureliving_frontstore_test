/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

const cmsBaseUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL;
interface Props {
  image: string;
}

export const PropertyDefaultWrapper = ({
  image = "/img/rectangle-1273-2.svg",
}: Props): JSX.Element => {
  return (
    <div className="w-[270px] h-[298px] !absolute !left-[66px] !top-[410px]">
      <div
        className="w-[253px] h-[275px] rounded-[20px] bg-[#ffffff] relative "
      >
        <img
          className="w-[231px] left-[11px] top-2.5 object-cover h-[191px] absolute"
          alt="Rectangle"
          src={cmsBaseUrl + image}
        />

        <div className="w-[233px] flex left-[13px] items-center top-[218px] gap-2.5 absolute">
          <p className="[font-family:'Merriweather',Helvetica] mt-[-1.00px] tracking-[0] text-lg flex-1 text-[#343a40] font-bold leading-[25.2px] relative">
            A pergola for every occasion
          </p>
        </div>
      </div>
    </div>
  );
};
