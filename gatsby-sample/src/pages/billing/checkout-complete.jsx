import React from "react";
import { ConfirmationContainer } from 'tf-checkout-react'
import Layout from "../../components/Layout";
import { setTfCheckoutReactConfigs } from "../../../tf-checkout-config";

setTfCheckoutReactConfigs()

const CheckoutComplete = () => {
    return <Layout>
        <ConfirmationContainer
            referralPromotions={[]}
            shareButtons={[]}
            shareLink={''}
            isReferralEnabled={true}
            showDefaultShareButtons={true}
            hasCopyIcon={false}
            confirmationLabels={confirmationLabels}
            clientLabel=""
            showCopyInfoModal={true}
            showPricingNoteSection={true}
        />
    </Layout>
}

export default CheckoutComplete

const confirmationLabels = {
    confirmationTitle: 'Your order has been confirmed!',
    confirmationMain: (
        <>
            Check the email address you provided for your order confirmation, along
            with your PDF ticket. You’ll be asked to present your ticket at the venue
            to receive your wristband. If you misplace your order confirmation email
            or PDF ticket, you may view your order and reprint your PDF ticket at any
            time by visiting the{' '}
            <a href='/orders'>
                <b>My Tickets </b>
            </a>
            section.
        </>
    ),
    confirmationHelper: (
        <span>
            <br />
            If you have any questions about your order, please contact{' '}
            <a style={{ color: 'inherit' }} href='mailto:tickets@.com'>
                tickets@manacommon.com
            </a>
        </span>
    ),
}