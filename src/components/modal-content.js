import PropTypes from "prop-types"

// utils
import { classnames } from "../lib/classnames"

const ModalContent = ({ children, className, ...props }) => {
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

export default ModalContent
