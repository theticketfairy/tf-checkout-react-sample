import React from "react";
import { TicketsContainer } from "tf-checkout-react";
import { setTfCheckoutReactConfigs } from "../../../tf-checkout-config";
import Layout from "../../components/Layout";
import { getEvent } from "../../http_service/events";

setTfCheckoutReactConfigs()
const isWindowDefined = typeof window !== 'undefined'

const handleCartSuccessRedirect = (
  skip_billing_page,
  names_required,
  phone_required,
  hide_phone_field,
  age_required,
  event_id = '',
  hash,
  total,
  free_ticket,
  collect_mandatory_wallet_address,
  collect_optional_wallet_address
) => {
  if (skip_billing_page) {
    isWindowDefined &&
      window.localStorage.setItem(
        'checkoutData',
        JSON.stringify({ hash, total }),
      )
    window.location.href = `/billing/checkout?event_id=${event_id}`
  } else {
    event_id && isWindowDefined
      ? window.location.assign(
        `/billing/billing-info?phone_required=${phone_required}&age_required=${age_required}&names_required=${names_required}&hide_phone_field=${hide_phone_field}&event_id=${event_id}&free_ticket=${free_ticket}&collect_mandatory_wallet_address=${collect_mandatory_wallet_address}&collect_optional_wallet_address=${collect_optional_wallet_address}`,
      )
      : isWindowDefined &&
      window.location.assign(
        `/billing/billing-info?phone_required=${phone_required}&age_required=${age_required}&names_required=${names_required}&hide_phone_field=${hide_phone_field}&free_ticket=${free_ticket}&collect_mandatory_wallet_address=${collect_mandatory_wallet_address}&collect_optional_wallet_address=${collect_optional_wallet_address}`,
      )
  }
}

const Event = ({ serverData }) => {
  console.log(serverData)
  return <Layout>
    <TicketsContainer
      theme="light"
      eventId={12145}
      handleNotInvitedModalClose={() => { }}
      handleInvalidLinkModalClose={() => { }}
      onAddToCartSuccess={({
        skip_billing_page,
        names_required,
        phone_required,
        hide_phone_field,
        age_required,
        event_id,
        hash,
        total,
        free_ticket,
        collect_mandatory_wallet_address,
        collect_optional_wallet_address
      }) =>
        handleCartSuccessRedirect(
          skip_billing_page,
          names_required,
          phone_required,
          hide_phone_field,
          age_required,
          event_id,
          hash,
          total,
          free_ticket,
          collect_mandatory_wallet_address,
          collect_optional_wallet_address
        )
      }
      //isPromotionsEnabled={event?.is_promotions_enabled}
      // isAccessCodeEnabled={event?.is_access_code}
      onLogoutSuccess={() => {
        if (typeof window !== 'undefined') {
          window.location.href = '/'
        }
      }}
      // queryPromoCode={getQueryPromoCode()}
      hideSessionButtons={true}
      //onGetTicketsSuccess={() => {}}
      enableAddOns={false}
    />
  </Layout>
};

export default Event;

export async function getServerData(props) {
  const {
    params: { slug },
    query: { pk, eventId },
  } = props

  try {
    const event = await getEvent(slug, pk)

    return {
      props: {
        event,
        slug,
        pk,
        eventId,
        host: props.headers.get('host')
      },
    }
  } catch (error) {
    return {
      props: { error: true, message: error, slug, pk },
    }
  }
}