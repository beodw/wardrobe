import React, { ForwardedRef } from 'react'
import clsx from 'clsx'
import styles from './Button.module.css'

type buttonType = React.ComponentProps<'button'> & React.ComponentProps<'a'>
interface ButtonProps extends buttonType {
  danger?: Boolean
  outlined?: boolean
}

const Button = React.forwardRef(
  (
    { children, className, outlined, href, ...forwardedProps }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement> | undefined
  ) => {
    //Check if elem has href and render html element  accoordingly.
    const elementType = href ? 'a' : 'button'
    const isDisabledLink = elementType === 'a' && forwardedProps.disabled
    // Intercept forwarded onClick function
    const forwardedOnClick = forwardedProps.onClick
    let handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (isDisabledLink) {
        e.preventDefault()
        return
      }
      forwardedOnClick && forwardedOnClick(e)
    }

    className = clsx(
      styles.button,
      {
        [styles.buttonOutlined]: outlined,
      },
      `${className} ${isDisabledLink ? styles.noCursorDisabledForLinks : ''}`
    )
    let onClick = handleClick
    let button = React.createElement(elementType, {
      children,
      className,
      outlined,
      href,
      ...forwardedProps,
      onClick,
      ref,
    })
    return button
  }
)

Button.displayName = 'Button'

export default Button
