import React from 'react'
import style from './TextField.module.css'

export const TextField = ({ name, label, error, ...props }) => {
  return (
    <div className={style.FieldContainer}>
      <label htmlFor={name}>{label}</label>
      <input className={style.Field} name={name} {...props} />
      {error && <span className={style.error}>{error}</span>}
    </div>
  )
}
