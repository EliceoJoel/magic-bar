interface IFormGroup {
  labelFor: string;
  textLabel: string;
  children: JSX.Element | React.ReactNode;
}

function FormGroup({ labelFor, textLabel, children }: IFormGroup) {
  return (
    <div className='w-full'>
      <label htmlFor={labelFor}>{textLabel}</label>
      {children}
    </div>
  )
}

export default FormGroup