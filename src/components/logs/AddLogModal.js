import React, { useState } from 'react';
import TechSelectOptions from '../techs/TechSelectOptions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLog } from '../../actions/logActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const AddLogModal = ({ addLog }) => {
  const [count, setMessage] = useState(' ');
  const [person, setTech] = useState('');

  const onSubmit = () => {
    if (count === '' || person === '') {
      M.toast({ html: 'Please enter a message and tech' });
    } else {
      const newLog = {
        count,
        person,
        date: new Date(),
      };

      addLog(newLog);

      M.toast({ html: `Log added by ${person}` });

      // Clear Fields
      setMessage(' ');
      setTech('');
    }
  };

  return (
    <div id='add-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Add a Speaker</h4>
        <div className='row' hidden>
          <div className='input-field'>
            <input
              type='text'
              name='message'
              value={count}
              onChange={(e) => setMessage(e.target.value)}
            />
            {/*             <label htmlFor='message' className='active'>
              Log Message
            </label> */}
          </div>
        </div>

        <div className='row'>
          <div className='input-field'>
            <select
              name='person'
              value={person}
              className='browser-default'
              onChange={(e) => setTech(e.target.value)}
            >
              <option value='' disabled>
                Select Speaker
              </option>
              <TechSelectOptions />
            </select>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='modal-close waves-effect blue waves-light btn'
        >
          Enter
        </a>
      </div>
    </div>
  );
};

AddLogModal.propTypes = {
  addLog: PropTypes.func.isRequired,
};

const modalStyle = {
  width: '75%',
  height: '75%',
};

export default connect(null, { addLog })(AddLogModal);
