const React = require('react')
const CheckoutRouteBoundary = require('./src/components/CheckoutRouteBoundary').default

exports.wrapPageElement = ({ element, props }) =>
  React.createElement(CheckoutRouteBoundary, { location: props.location }, element)
