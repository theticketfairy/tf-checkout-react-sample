import React from "react";
import { OrderDetailsContainer } from "tf-checkout-react";
import { setTfCheckoutReactConfigs } from "../../utils/tf-checkout-config";

setTfCheckoutReactConfigs()

const Order = () => {
    return <OrderDetailsContainer columns={[{ label: 'Items' }, { label: 'Price' }, { label: 'Quantity' }, { label: 'Total' }]} />

}

export default Order