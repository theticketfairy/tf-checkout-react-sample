import React from "react";
import { MyTicketsContainer } from "tf-checkout-react";
import Layout from "../../components/Layout";
import { setTfCheckoutReactConfigs } from "../../utils/tf-checkout-config";

setTfCheckoutReactConfigs()

const Orders = () => {

    return <Layout>
        <MyTicketsContainer
            // logo={Logo}
            theme='light'
            handleDetailsInfo={(orderId) => {
                if (typeof window !== 'undefined') {
                    window.location.assign(`/order/?o=${orderId}`)
                }
            }}
        />
    </Layout>
}

export default Orders