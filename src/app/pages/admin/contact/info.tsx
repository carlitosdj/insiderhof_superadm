interface handleCloseProps {
  handleClose: () => void
  child: any
}

const InfoSupport = ({child}: handleCloseProps) => {
  return (
    <>
      {/* <h1>{child.parentUser.name}</h1> */}
      <p>{child.name}</p>
      <hr />
      <p>{child.email}</p>
      <p>{child.subject}</p>
      <p>{child.message}</p>
    </>
  )
}
export default InfoSupport
