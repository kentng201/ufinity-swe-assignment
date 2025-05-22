import ReactLoading from 'react-loading';

export default function Loader() {
  return <div className="absolute size-full bg-[rgb(44,44,44)] bg-opacity-20 z-2 flex justify-center items-center">
    <ReactLoading type={'spinningBubbles'} color={'#135bb4'} height={'8%'} width={'8%'} />
  </div>;
}