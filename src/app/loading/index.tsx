// import Spinner from 'react-bootstrap/Spinner'

const Loading = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        // height: '60vh',
      }}
    >
      {/* <Spinner animation="border" variant="primary" /> */}
      <span className='spinner-border spinner-border-sm'></span>
    </div>
  )
}

export default Loading
