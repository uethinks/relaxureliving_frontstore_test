import React, { useState } from "react"

// Lightweight skeleton while payment intent is being prepared
export const PaymentLoadingSkeleton: React.FC<{ isFormValid: boolean }> = ({ isFormValid }) => {
  return (
    <div className="w-full">
        {/* Form validation message */}
        {!isFormValid && (
          <div className="mb-8 p-3 bg-primary border border-gray-200 rounded-md ">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-primary-700">
                  Please fill in all required contact and delivery information above to continue with payment
                </p>
              </div>
            </div>
          </div>
        )}

      <div className={`w-full p-6 bg-white border border-[#e5e7eb] ${isFormValid ? 'animate-pulse' : ''}`}>
      
        
        {/* Google Pay button skeleton */}
        <div className="mb-3">
          <div className="h-12 bg-gray-800 rounded-md flex items-center justify-center">
            <div className="h-6 w-24 bg-gray-700 rounded flex items-center justify-center text-gray text-[#9c9c9c]">
              Google Pay
            </div>
          </div>
        </div>
        
        {/* Apple Pay button skeleton */}
        <div className="mb-4">
          <div className="h-12 bg-gray-800 rounded-md flex items-center justify-center">
            <div className="h-6 w-24 bg-gray-700 rounded flex items-center justify-center text-[#9c9c9c]">
              Apple Pay
            </div>
          </div>
        </div>
        
        {/* "Or pay with" divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <div className="px-3 text-sm text-gray-500">Or pay with</div>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        
        {/* Payment method tabs skeleton */}
        <div className="flex mb-4 space-x-2">
          <div className="flex-1 h-16 bg-yellow-100 border-2 border-yellow-400 rounded-lg flex items-center justify-center">            
            <div className="h-6 w-16 bg-yellow-300 rounded flex items-center justify-center text-gray text-[#9c9c9c]">
              Card
            </div>
          </div>
          <div className="flex-1 h-16 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center">
            <div className="h-6 w-16 bg-gray-300 rounded flex items-center justify-center text-gray text-[#9c9c9c]">
              Klarna
            </div>
          </div>
          <div className="flex-1 h-16 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center">
            <div className="h-6 w-16 bg-gray-300 rounded flex items-center justify-center text-gray text-[#9c9c9c]">
              Afterpay
            </div>
          </div>
        </div>
        
        {/* Card information section */}
        <div className="mb-4">
          <div className="mb-2 text-sm font-medium text-gray-700">Card information</div>
          
          {/* Card number field */}
          <div className="h-12 bg-gray-100 border border-yellow-400 rounded-md mb-3 flex items-center px-3">
            <div className="h-6 w-32 bg-gray-300 rounded mr-auto"></div>
            <div className="flex space-x-1">
              <div className="h-6 w-8 bg-blue-200 rounded"></div>
              <div className="h-6 w-8 bg-red-200 rounded"></div>
              <div className="h-6 w-8 bg-blue-200 rounded"></div>
              <div className="h-6 w-8 bg-gray-300 rounded"></div>
            </div>
          </div>
          
          {/* Expiry and CVC fields */}
          <div className="flex space-x-3">
            <div className="flex-1 h-12 bg-gray-100 border border-gray-300 rounded-md flex items-center px-3">
              <div className="h-6 w-16 bg-gray-300 rounded"></div>
            </div>
            <div className="flex-1 h-12 bg-gray-100 border border-gray-300 rounded-md flex items-center px-3">
              <div className="h-6 w-12 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
        
        {/* Name on card field */}
        <div className="mb-6">
          <div className="mb-2 text-sm font-medium text-gray-700">Name on card</div>
          <div className="h-12 bg-gray-100 border border-gray-300 rounded-md flex items-center px-3">
            <div className="h-6 w-24 bg-gray-300 rounded"></div>
          </div>
        </div>
        
        {/* Pay button skeleton */}
        <div className="h-12 bg-primary rounded-md flex items-center justify-center">
          <div className="h-6 w-16 bg-yellow-500 rounded"></div>
        </div>
         
      </div>
    </div>
  )
}