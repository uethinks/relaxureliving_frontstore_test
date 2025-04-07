import { StoreProduct, StoreProductVariant } from "@medusajs/types"
import { useState } from "react"
import { AddAccessories } from "./AddAccessories"
export const AccesorriesPopupHeater = ({
  accessoryHeater,
  closePopup,
  addAccessoryHeater,
  selectedHeaterVariant,
}: {
  accessoryHeater: StoreProduct | null
  closePopup: (type: string) => void
  addAccessoryHeater: (
    selectedAccessoryHeater: StoreProductVariant | null,
    selectedAccessoryHeaterQuantity: number
  ) => void
  selectedHeaterVariant: {
    productVarant: StoreProductVariant | null
    quantity: number
  }
}): JSX.Element => {
  const closePopupHeater = () => {
    closePopup("Heating")
  }
  const productImage = accessoryHeater?.images?.[0].url
  const addAccessoryHeaterHandler = () => {
    addAccessoryHeater(currentHeaterVarant, currentHeaterVarantQuantity)
    closePopupHeater()
  }
  const [currentHeaterVarant, setCurrentHeaterVarant] =
    useState<StoreProductVariant | null>(
      selectedHeaterVariant.productVarant || null
    )
  const [currentHeaterVarantQuantity, setCurrentHeaterVarantQuantity] =
    useState(selectedHeaterVariant.quantity)
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black-50 z-50">
      <div className="relative bg-white rounded-[20px] p-10 max-w-[1269px] max-h-[90vh] overflow-auto">
        <button
          onClick={closePopupHeater}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex items-start gap-[30px]">
          <div
            className={`relative w-[466px] h-[467px] rounded-[20px] bg-cover bg-[50%_50%]`}
            style={{ backgroundImage: `url(${productImage})` }}
          />

          <div className="flex flex-col w-[733px] items-start gap-10">
            <div className="flex flex-col items-start gap-5 self-stretch w-full">
              <div className="flex flex-col items-start gap-2.5 self-stretch w-full">
                <div className="flex w-[105px] h-[41px] items-center justify-center gap-2.5 p-2.5 bg-[#072f6c] rounded-[30px] border border-solid border-[#a8a8a8]">
                  <div className="font-montserrat font-medium text-white text-base leading-6 whitespace-nowrap">
                    Exclusive
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-2.5 py-2.5 self-stretch w-full">
                <h2 className="self-stretch font-merriweather text-[#343a40] text-[28px] font-bold leading-[39.2px]">
                  {accessoryHeater?.title}
                </h2>
                <div className="w-full flex justify-between items-center gap-2">
                  <div className="self-stretch text-[#343a40] text-[22px] leading-[30.8px] font-montserrat font-medium">
                    {currentHeaterVarant?.calculated_price?.calculated_amount &&
                    currentHeaterVarantQuantity
                      ? "$" +
                        currentHeaterVarant?.calculated_price
                          ?.calculated_amount *
                          currentHeaterVarantQuantity
                      : ""}
                  </div>
                  <div className="relative h-12">
                    <div className="flex px-2 h-12 bg-[#ffffff] rounded-[20px] border border-solid border-[#e9e9e9]">
                      <div className="inline-flex items-center gap-[18px] relative">
                        {accessoryHeater?.variants?.map((varant) => (
                          <button
                            key={varant.id}
                            className={`inline-flex items-center justify-center gap-2.5 p-2 relative flex-[0_0_auto] cursor-pointer ${
                              currentHeaterVarant?.id === varant.id
                                ? "bg-[#dce7f8] rounded-[20px]"
                                : ""
                            }`}
                            onClick={() => setCurrentHeaterVarant(varant)}
                          >
                            <div
                              className={`relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-18 tracking-[0] leading-[27px] whitespace-nowrap ${
                                currentHeaterVarant?.id === varant.id
                                  ? "text-[#072f6c]"
                                  : "text-[#69727a]"
                              }`}
                            >
                              {varant.title}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="self-stretch text-[#343a40] text-lg leading-[25.2px] font-montserrat font-medium mt-2">
                  Description
                </div>

                <p className="self-stretch text-[#68717a] leading-[22.4px] font-montserrat text-base font-medium mt-2">
                  {accessoryHeater?.description}
                </p>

                <div className="flex items-center gap-2 self-stretch w-full mt-4">
                  <div className="flex items-center justify-center gap-2.5 py-2.5">
                    <p className="text-[#69727a] text-lg leading-[27px] whitespace-nowrap font-montserrat font-medium">
                      How many heaters do you need:
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-14 h-10 flex items-center justify-center rounded-[10px] border border-solid border-[#a8a8a8]">
                      <input
                        value={currentHeaterVarantQuantity}
                        onChange={(e) =>
                          setCurrentHeaterVarantQuantity(Number(e.target.value))
                        }
                        type="text"
                        className="text-[#69727a] leading-6 font-montserrat font-medium text-base focus:outline-none border-0 text-center w-full"
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between self-stretch w-full">
              <button className="flex items-center gap-1.5 py-3 rounded-[10px]">
                <img
                  className="w-6 h-6"
                  alt="Download icon"
                  src="https://c.animaapp.com/QOr7NHyD/img/frame-1000004698.svg"
                />
                <span className="text-[#69727a] font-montserrat font-medium text-sm leading-[21px]">
                  Download specs
                </span>
              </button>

              <AddAccessories
                buttonClassName="!text-sm !leading-[21px] !font-montserrat !font-semibold"
                className="!w-[235px]"
                property1="primary-button-l"
                text="Add accesory"
                addAccessory={addAccessoryHeaterHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
