import React from 'react';
import { connect } from 'react-redux';
import HashLoader from 'react-spinners/HashLoader';
import { css } from '@emotion/core';

const override = `${css}
  margin-left: 10px;
  margin-right: 10px;
`;

const Loading = ({ loading }) => (
  <div className='sweet-loading'>
    <HashLoader css={override} sizeUnit={'px'} size={30} color={'#f5a872'} loading={loading} />
  </div>
);

const mapStateToProps = ({ login, user }) => {
  return {
    loading: login.loading || user.loading
  };
};
export default connect(mapStateToProps)(Loading);
