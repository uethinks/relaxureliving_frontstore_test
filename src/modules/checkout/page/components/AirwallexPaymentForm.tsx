 

"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
// STEP #1: At the start of your file, import airwallex-payment-elements package
 ;
import { createElement, init, Payment } from '@airwallex/components-sdk';
import { StoreCart, StoreOrder } from "@medusajs/types";
import { captureOrderWebhook, listOrders, retrieveOrder, retrieveOrderByPaymentIntentId } from "@lib/data/orders"
import { removeCartId } from "@lib/data/cookies";
import { clearCartCookie } from "@lib/data/cart";
import { min } from "lodash";

type CheckoutFormData = {
  email: string
  shipping_address: {
    first_name: string
    last_name: string
    address_1: string
    city: string
    province: string
    postal_code: string
    phone: string
    country_code: string
  }
}

export type PaymentIntentBody = {
    amount: number;
    client_secret: string;
    id: string;
    currency: string;
  };
  
interface AirwallexPaymentFormProps {  
  paymentIntent: PaymentIntentBody;
  formValidation: () => boolean
  deliveryInfo: CheckoutFormData
  updateCartDeliveryInfo: (deliveryInfo?: CheckoutFormData) => Promise<StoreCart | null>
  comlpeleCartAndCreateOrder: () => Promise<StoreOrder | null>
}
 
const AirwallexPaymentForm: React.FC<AirwallexPaymentFormProps> = ({ 
    paymentIntent,
    comlpeleCartAndCreateOrder,
    formValidation,
    deliveryInfo,
    updateCartDeliveryInfo,
 }) => { 
  const router = useRouter();
  const [isPolling, setIsPolling] = useState(false);
  // Option 2: Use ref to store latest deliveryInfo values
  const deliveryInfoRef = useRef<CheckoutFormData>(deliveryInfo);
  
  // Update ref whenever deliveryInfo changes
  useEffect(() => {
    deliveryInfoRef.current = deliveryInfo;
  }, [deliveryInfo]);
 

  async function pollOrderPaymentStatus(paymentIntentId: string) {
    const maxAttempts = 30; // e.g., poll for 1 minute (30 attempts * 2s interval)
    let attempts = 0;
    
    setIsPolling(true);
      
      while (attempts < maxAttempts) {
        try {
          console.log("pollOrderPaymentStatus start",  paymentIntentId)
          const orders = await retrieveOrderByPaymentIntentId(paymentIntentId);
          
          console.log("pollOrderPaymentStatus orders", orders, paymentIntentId)
          
          if (orders.length > 0) {
            // Order created, redirect to confirmation
            setIsPolling(false);
            router.push(`/checkout/success?order_id=${orders[0].id}`)
            // window.location.href = `/order/confirmed/${orders[0].id}`;
            return;
          }
        } catch (e) {
          console.log('Polling attempt failed:', e);
        }
        
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2s intervals
      }
      
      // If we reach here, polling timed out
      setIsPolling(false);
  }

  useEffect(() => {
    const loadDropInElement = async () => {
        console.log("loadDropInElement", new Date().toISOString(), "paymentIntent", paymentIntent, "deliveryInfo", deliveryInfo, "NEXT_PUBLIC_AIRWALLEX_ENV", process.env.NEXT_PUBLIC_AIRWALLEX_ENV)
      try {
        // STEP #2: Initialize Airwallex on mount with the appropriate production environment and other configurations
        await init({
          env: process.env.NEXT_PUBLIC_AIRWALLEX_ENV as 'demo' | 'prod', //'demo', // Can choose other production environments, 'staging | 'demo' | 'prod'
          // enabledElements: ['payments'],
          // For more detailed documentation at https://github.com/airwallex/airwallex-payment-demo/tree/master/docs#loadAirwallex
        });
        // STEP #3: Create payment intent using data from props
         
        const { id, client_secret, currency } = paymentIntent;
        const dropInConfig: Payment.DropInElementOptions = {
          // Required, dropIn use intent Id, client_secret and currency to prepare checkout
          intent_id: id,
          client_secret,
          currency,
          country_code: "US",
          methods: ['card', 'applepay', 'googlepay', 'klarna', 'afterpay'], // Specify the payment methods you want to accept
          layout: {
            type: "tab"
          },
          appearance: {
            mode: 'light',
            variables: {
              colorBrand: '#f6af1f',
              colorBackground: '#ffffff',
              colorText: '#000000',
            },
            // rules: {
            //   '.Button': {
            //     width: '100px',
            //     height: '40px',
            //   }
            // }
          },
          applePayRequestOptions: {
            countryCode: 'US',
            buttonType: 'pay', 
            buttonColor: 'black', 
          },
          googlePayRequestOptions: {
            countryCode: 'US',
            merchantInfo: {
            merchantName: "Example Merchant",
            },
            buttonType: 'pay', 
          }

          // customize the visual appearance of the dropIn element, more information can be found: https://www.airwallex.com/docs/js/payments/hosted-payment-page/#properties-appearance
          
        };
        console.log("dropInConfig", dropInConfig)
        // STEP #4: Create the drop-in element
        const element = await createElement('dropIn', dropInConfig);
        // STEP #5: Mount the drop-in element to the empty container created previously
        element?.mount('dropIn'); // This 'dropIn' id MUST MATCH the id on your empty container created in Step 4
      } catch (error) {
        console.error(error);
      }
    };
    loadDropInElement();
    // STEP #6: Add an event listener to handle events when the element is mounted
    const onReady = (event: CustomEvent): void => {
      /**
       * Handle events on element mount
       */
      console.log(`Element is mounted: ${JSON.stringify(event.detail)}`);
     
    //   
      
    };

    // STEP #7: Add an event listener to handle events when the payment is successful.
    const onSuccess = (event: CustomEvent): void => {
      /**
       * Handle events on success
       */
      console.log(`Confirm success with ${JSON.stringify(event.detail)}`);
      const customEvent = event as CustomEvent 


      //handlePaymentSuccess(customEvent.detail, deliveryInfoRef.current)                  
      clearCartCookie()
      
      console.log("Payment successful! confirming...")
      pollOrderPaymentStatus(paymentIntent.id) 
    };
 
    // STEP #8: Add an event listener to handle events when the payment has failed.
    const onError = (event: CustomEvent) => {
      /**
       * Handle events on error
       */
      const { error } = event.detail;
      console.error('There is an error', error);
    };
    const domElement = document.getElementById('dropIn');
    domElement?.addEventListener('onReady', onReady as EventListener);
    domElement?.addEventListener('onSuccess', onSuccess as EventListener);
    domElement?.addEventListener('onError', onError as EventListener);
    return () => {
      domElement?.removeEventListener('onReady', onReady as EventListener);
      domElement?.removeEventListener('onSuccess', onSuccess as EventListener);
      domElement?.removeEventListener('onError', onError as EventListener);
    };
  }, [paymentIntent]); // Only depend on paymentIntent since we use ref for deliveryInfo (Option 2)


  const captureOrder = async (orderId: string) => {
    try {
      const order = await retrieveOrder(orderId)
      const paymentSessionId =
        order.payment_collections?.[0]?.payments?.[0]?.payment_session?.id
      if (paymentSessionId) {
        const captureOrder = await captureOrderWebhook(paymentSessionId)
        console.log("captureOrder", captureOrder)
        return true
      }
      return false
    } catch (error) {
      console.error("Error capturing order:", error)
      return false
    }
  }


  const handlePaymentSuccess = async (paymentResult: any, currentDeliveryInfo: CheckoutFormData) => {
    try {

        
    console.log("handlePaymentSuccess updateCartDeliveryInfo deliveryInfo", currentDeliveryInfo)
      await updateCartDeliveryInfo(currentDeliveryInfo)
      
      // Create order
      console.log("handlePaymentSuccess updateCartDeliveryInfo deliveryInfo", currentDeliveryInfo)
      const order = await comlpeleCartAndCreateOrder()
      console.log("handlePaymentSuccess comlpeleCartAndCreateOrder order", order)
      if (!order) {
        // setPaymentError('Failed to create order')
        return
      }

      router.push(`/checkout/success?order_id=${order.id}`)

      // // Capture the order
      // const captureSuccess = await captureOrder(order.id)
      // console.log("handlePaymentSuccess captureOrder captureSuccess", captureSuccess)
      
      // if (captureSuccess) {
      //   // Redirect to success page
      //   router.push(`/checkout/success?order_id=${order.id}`)
      // } else {
      //   // Redirect to success page with capture error
      //   router.push(`/checkout/success?order_id=${order.id}&error=capture_failed`)
      // }
    } catch (error) {
      console.error('Error handling payment success:', error)
      window.alert((error as any).detail.error.message)
    //   setPaymentError('Error processing payment success')
    } finally {
    //   setIsLoading(false)
    }
  }


  // Example: Custom styling for the dropIn container, can be placed in css
  const containerStyle = {
    width: "100%",    
    // width: '540px',
    padding: '48px',
    backgroundColor: '#ffffff',
    borderRadius: "12px", // rounded corners
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // soft shadow
        
  };

  // console.log("deliveryInfo", deliveryInfo)

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Loading overlay */}
      {isPolling && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '40px',
              borderRadius: '12px',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
              maxWidth: '400px',
              width: '90%',
            }}
          >
            {/* Loading spinner */}
            <div
              style={{
                width: '40px',
                height: '40px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #343a40',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 20px',
              }}
            />
            <h3
              style={{
                margin: '0 0 10px',
                color: '#343a40',
                fontSize: '20px',
                fontWeight: '600',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              Payment Successful!
            </h3>
            <p
              style={{
                margin: 0,
                color: '#6c757d',
                fontSize: '16px',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              Processing your order, please wait...
            </p>
          </div>
        </div>
      )}
      
      {/* Add CSS keyframes for spinner animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/**
       * STEP #4a: Add an empty container for the dropin element to be placed into
       * - Ensure this is the only element in your document with this id,
       *   otherwise the element may fail to mount.
       */}
      <div
        id="dropIn"
        style={{
          ...containerStyle, // Example: container styling can be moved to css
        }}
      />
      
    </div>
  );
};

export default AirwallexPaymentForm;