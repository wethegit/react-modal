import PropTypes from "prop-types"

export const modalDefaultProps = {
  appendToBody: true,
  closeDelay: 200,
}

export const modalPropTypes = {
  appendToBody: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  className: PropTypes.string,
  closeDelay: PropTypes.number,
  onClose: PropTypes.func,
  onCloseStarted: PropTypes.func,
  onOpen: PropTypes.func,
  toggleFunction: PropTypes.func.isRequired,
  triggerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object }),
  ]).isRequired,
}
