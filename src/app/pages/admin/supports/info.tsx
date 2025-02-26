interface handleCloseProps {
  handleClose: () => void;
  child: any;
}

const InfoSupport = ({ child }: handleCloseProps) => {
  return (
    <>
      <div className="d-flex flex-column flex-xl-row flex-row-fluid">
        <div className="flex-row-fluid py-lg-2 px-lg-6">
          <h3>{child.parentUser.name}</h3>
          <p>{child.message}</p>
          <hr />
          <p>{child.reply}</p>
          <p>{child.status}</p>
          <p>{child.createdAt}</p>
        </div>
      </div>
    </>
  );
};
export default InfoSupport;
