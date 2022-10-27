import { Input } from '../input'
import React from 'react'
import styles from './Combobox.module.css'

interface ComboboxProps extends React.ComponentProps<'input'> {
  maxOptionsHeight?: string
  onFilter?: (option: any, query: string) => boolean
  onSelect?: (option: any) => void
  options: any[]
  optionRender?: (option: any) => React.ReactNode
}

function defaultOptionRender(option: string) {
  return <div className={styles.option}>{option}</div>
}

function defaultFilter(option: string, query: string) {
  return option.toLowerCase().includes(query.toLowerCase())
}

const Combobox = React.forwardRef(
  (
    {
      maxOptionsHeight,
      onFilter = defaultFilter,
      onSelect,
      options,
      optionRender = defaultOptionRender,
      // Exclude type
      type,
      ...inputProps
    }: ComboboxProps,
    ref?: React.ForwardedRef<any>
  ) => {
    const [showOptions, setShowOptions] = React.useState(false)

    const filteredOptions = React.useMemo(() => {
      return options.filter((option) =>
        onFilter(option, inputProps.value as string)
      )
    }, [inputProps.value, options])

    function handleOptionSelect(option: any) {
      onSelect?.(option)
    }

    function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
      inputProps.onBlur?.(event)
      setShowOptions(false)
    }

    function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
      setShowOptions(true)
      inputProps.onFocus?.(event)
    }

    return (
      <div className={styles.combobox}>
        <Input
          {...inputProps}
          onBlur={handleBlur}
          onFocus={handleFocus}
          ref={ref}
          type="search"
        />

        {showOptions && Boolean(filteredOptions.length) && (
          <ul
            className={styles.options}
            style={{ maxHeight: maxOptionsHeight }}
          >
            {/* TODO: Accept key field name (or key getter) */}
            {filteredOptions.map((option, index) => (
              <li
                className={styles.optionItem}
                key={index}
                onMouseDown={() => handleOptionSelect(option)}
              >
                {optionRender(option)}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
)

Combobox.displayName = 'Combobox'

export default Combobox
