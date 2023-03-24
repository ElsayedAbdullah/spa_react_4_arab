import './Loading.css';

function Loading() {
  return (
    <div>
      <main>
        <div className='lds-ellipsis'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </main>
    </div>
  );
}

export default Loading;
