/**
 * @authors ZiQiangWang
 * @email   814120507@qq.com
 * @date    2017-07-14 15:18:30
 */


import React from 'react';
import PropTypes from 'prop-types';
import PreivewNav from './PreivewNav';
import MarkdownPreview from '../components/MarkdownPreview';

const Preivew = (props) => {
  return (
    <div className="preview-container"  style={{ display: props.showMode === 2 ? 'none' : 'block' }}>
      <PreivewNav />
      <MarkdownPreview 
        source={props.source}
        options={{breaks: true}}
      />
    </div>
  );
}

Preivew.propTypes = {
  showMode: PropTypes.number.isRequired,
  source: PropTypes.string.isRequired
}


export default Preivew;
