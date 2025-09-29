// 服务配置接口定义
interface ServiceConfig {
  title: string
  price: string
  originalPrice: string
  descriptions: {
    icon: string
    alt: string
    text: string
  }[]
}

// 服务配置数据
const serviceConfigs: ServiceConfig[] = [
  {
    title: "Shipping",
    price: "Free",
    originalPrice: "$395-$750",
    descriptions: [
      {
        icon: "/img/shipping.svg",
        alt: "shipping",
        text: "Free shipping + Insurance"
      },
      {
        icon: "/img/package.svg",
        alt: "package", 
        text: "delivered in 4 weeks"
      }
    ]
  },
  {
    title: "Full Insurance",
    price: "Free",
    originalPrice: "$295",
    descriptions: [
      {
        icon: "/img/shipping.svg",
        alt: "shipping",
        text: "includes complimentary insurance coverage."
      },
      {
        icon: "/img/package.svg",
        alt: "package",
        text: "Your delivery should arrive in about four weeks."
      }
    ]
  },
  {
    title: "Warranty", 
    price: "Free",
    originalPrice: "$749-$1798",
    descriptions: [
      {
        icon: "/img/shipping.svg",
        alt: "shipping",
        text: "100-Day Risk-Free Trial"
      },
      {
        icon: "/img/warranty.svg",
        alt: "warranty",
        text: "Lifetime warranty included"
      }
    ]
  }
]

export default function V2ServiceDescription() {
  return (
    <div className="mt-6 space-y-5">
      {serviceConfigs.map((service, index) => (
        <div key={index} className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <span className="text-[#000000] font-medium">
              {service.title}: <span className="text-highlight">{service.price}</span>
            </span>
            <span className="text-[#8C877C] line-through">{service.originalPrice}</span>
          </div>
          <p className="text-[#8c8c8c] text-sm">
            {service.descriptions.map((desc, descIndex) => (
              <span key={descIndex}>
                <img
                  src={desc.icon}
                  alt={desc.alt}
                  className="w-4 h-4 inline-block mr-2 mb-1"
                />
                <span className="ml-2">{desc.text}</span>
                {descIndex < service.descriptions.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  )
}
