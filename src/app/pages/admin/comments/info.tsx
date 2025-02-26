interface handleCloseProps {
  handleClose: () => void
  child: any
}

const InfoSupport = ({child}: handleCloseProps) => {
  return (
    <>
      <h1>{child.parentUser.name}</h1>
      <p>{child.message}</p>
      <hr />
      <p>{child.reply}</p>
      <p>{child.status}</p>
      <p>{child.createdAt}</p>
    </>
  )
}
export default InfoSupport
