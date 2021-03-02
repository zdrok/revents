import ModalWrapper from "../../app/common/modals/ModalWrapper";

export default function TestModal({ data }) {
  return (
    <ModalWrapper size='mini' header='Test modal'>
      {/* <div className="">the data is: {modalProps}</div> */}
      <div className=''>the data is:{data} </div>
    </ModalWrapper>
  );
}
