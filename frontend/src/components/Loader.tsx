import { SyncLoader } from 'react-spinners';

export default function Loader() {
  return <div className="absolute size-full bg-[rgba(44,44,44,0.6)] z-20 flex justify-center items-center">
    <SyncLoader color={'#135bb4'} loading={true} size={20} />
  </div>;
}