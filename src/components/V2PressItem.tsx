interface IItem {
  url: string
  title: string
  link: string
}

export default function V2PressItem({ item }: { item: IItem }) {
  return (
    <div
      className={
        "flex items-center gap-x-5 p-5 flex-grow-1 flex-shrink-1 basis-auto w-full lg:w-[464px]"
      }
      style={{
        background: "linear-gradient(270deg, #FFFFFF 0%, #EFEEEB 100%)",
      }}
    >
      <div
        className={
          "w-[128px] h-[128px] lg:w-40 lg:h-40 flex items-center flex-grow-0 flex-shrink-0 basis-auto overflow-hidden"
        }
      >
        <img
          src={item.url}
          alt={item.title}
          className="object-contain w-full"
        />
      </div>
      <div className={"flex flex-col justify-between h-[107px] pr-6 lg:pr-5"}>
        <p className={"text-[#2F2A1E] text-base font-semibold line-clamp-3"}>
          <span className={"text-[#FFBF3C]"}>"</span>
          {item.title}
          <span className={"text-[#FFBF3C]"}>"</span>
        </p>
        <a
          href={item.link}
          className={"underline text-[#FFBF3C] text-xs font-semibold"}
        >
          Read more
        </a>
      </div>
    </div>
  )
}
