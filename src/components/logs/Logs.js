import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
import PropTypes from 'prop-types';
import { getLogs } from '../../actions/logActions';

const Logs = ({ log: { logs, loading }, getLogs }) => {
  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

  if (loading || logs === null) {
    return <Preloader />;
  }

  return (
    <ul className='collection with-header'>
      <li className='collection-header' style={{ backgroundColor: '#E9FFF5' }}>
        <h4 className='center' style={{ fontWeight: 'bold' }}>
          Ah - Counter
          <br />
        </h4>
        <p style={{ display: 'flex', justifyContent: 'center' }}>
          created by &nbsp;{' '}
          <span style={{ fontWeight: 'bold' }}>SilvesterSpath</span>
        </p>
      </li>
      {!loading && logs.length === 0 ? (
        <div>
          <p className='center'>No speaker to show..</p>
          <p className='center'>
            Hover over the blue plus sign in the bottom right corner to start
            adding speakers!
          </p>
        </div>
      ) : (
        logs.map((log) => <LogItem log={log} key={log._id} />)
      )}
    </ul>
  );
};

Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  log: state.log,
});

export default connect(mapStateToProps, { getLogs })(Logs);
