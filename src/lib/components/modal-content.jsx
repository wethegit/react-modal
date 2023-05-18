import PropTypes from "prop-types"

// utils
import { classnames } from "../utils/classnames"

export const ModalContent = ({ children, className, ...props }) => {
  return (
    <div className={classnames(["modal__content", className])} {...props}>
      {children}
    </div>
  )
}

ModalContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}
