/**
 * dropIn.tsx
 * Airwallex Payment Demo - React Typescript.
 *
 * airwallex-payment-elements Dropin element integration in React Typescript
 * Comments with "Example" demonstrate how states can be integrated
 * with the element, they can be removed.
 *
 * Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/dropin.md
 */

"use client"

import { useEffect, useState, useRef } from "react"
// STEP #1: At the start of your file, import airwallex-payment-elements package
 ;
import { createElement, init } from '@airwallex/components-sdk';
import PayTestComponent from "./PayTestComponent";
import { PaymentIntentBody } from "@modules/checkout/page/components/AirwallexPaymentForm";
 
const Index: React.FC = () => { 
   
   
  const [data, setData] = useState<PaymentIntentBody | null>(null)
  useEffect(() => {
    setData({
      amount: 100,
      client_secret: "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NTY0NTMyNTUsImV4cCI6MTc1NjQ1Njg1NSwidHlwZSI6ImNsaWVudC1zZWNyZXQiLCJwYWRjIjoiSEsiLCJhY2NvdW50X2lkIjoiNTViZDAwOGUtYWRjYS00NjMzLTliOTEtYTdkNjAwMDRmZDVmIiwiaW50ZW50X2lkIjoiaW50X2hrZG0ycDV2dGhhbHpoaHIwNnYifQ.nAcMc3-QjFIhDbaCTp6B5wJ9ZJdno6Q3zo6p-16_Y2U",
      id: "int_hkdm2p5vthalzhhr06v",
      currency: "USD",
    })
  }, [])

  return (
    <div>
       <h1>Hello Payment Test</h1>

     { data && 
       <PayTestComponent 
         data={data}
       />
     }
    </div>
  );
};

export default Index;