import Image from "next/image"
import { cn } from "@lib/utils"

type ContactSupportCardProps = {
  className?: string
}

export function ContactSupportCard({ className }: ContactSupportCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-5 py-4 px-8 bg-white border border-[#efeeeb]",
        className
      )}
    >
      <div className="flex items-start lg:items-center justify-center gap-4 w-full">
        <Image
          unoptimized
          src="/img/icon-contact.svg"
          alt="Contact support"
          width={40}
          height={40}
        />
        <div className="text-left">
          <p className="text-[#140E02] text-base">
            Need help as a current customer? Our support team is here for you
          </p>
          <p className="text-[#8C877C] text-xs">
            10:00 AM – 6:00 PM EST / 6:00 AM – 2:00 PM PST (Mon–Sun)
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs">
        <p className="flex items-center justify-center gap-1">
          <Image
            unoptimized
            src="/img/icon-contact-phone.svg"
            alt=""
            width={16}
            height={16}
          />
          <a href="tel:1-213-566-8658" className="underline">
            1-213-566-8658
          </a>
        </p>
        <p className="flex items-center justify-center gap-1">
          <Image
            unoptimized
            src="/img/icon-contact-email.svg"
            alt=""
            width={16}
            height={16}
          />
          <a
            href="mailto:info@relaxureliving.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            info@relaxureliving.com
          </a>
        </p>
      </div>
    </div>
  )
}
