import './EditTask.css';

import { Helmet } from 'react-helmet-async';
import Header from '../../comp/Header/Header';
import Footer from '../../comp/Footer/Footer';

const EditTask = () => {
  return (
    <div>
      <Helmet>
        <title>edit task Page</title>
      </Helmet>

      <Header />
      <div className='edit-task'>
        {/* Title */}
        <section className='title center'>
          <h1>
            <input defaultValue={'ali hassan'} className='title-input center' type='text' />
            <i className='fa-regular fa-pen-to-square'></i>
          </h1>
        </section>

        {/* Sub-tasks section */}
        <section className='sub-task mt-2'>
          <div className='parent-time'>
            <p className='time'>Created: 6 days ago</p>
            <div>
              <input id='checkbox' type='checkbox' />
              <label htmlFor='checkbox'>Completed </label>
            </div>
          </div>

          <ul>
            <li className='card-task flex'>
              <p> Sub taskk </p>
              <i className='fa-solid fa-trash'></i>
            </li>

            <li className='card-task flex'>
              <p> Sub taskk </p>
              <i className='fa-solid fa-trash'></i>
            </li>
          </ul>
        </section>

        {/* Add-more BTN && Delete BTN */}

        <section className='center mt-2'>
          <button className='add-more-btn teal-btn'>
            Add more <i className='fa-solid fa-plus'></i>
          </button>

          <div>
            <button className='del mt-1'>Delete task</button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default EditTask;
