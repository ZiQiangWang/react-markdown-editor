/**
 * @authors ZiQiangWang
 * @email   814120507@qq.com
 * @date    2017-07-06 18:09:09
 */

import React from 'react';
import { render } from 'react-dom';
import MarkdownEditor from './containers/MarkdownEditor';


// {
//     name: PropTypes.string,
//     defaultValue: PropTypes.string,
//     codemirrorOptions: PropTypes.object,
//     onChange: PropTypes.func,
//     onCursorActivity: PropTypes.func,
//     onFocusChange: PropTypes.func,
//     onScroll: PropTypes.func,

//     height:12,
// markBtns
// registMarkBtns
//     markedOptions:{

//     }
// }
render(
    <MarkdownEditor 
      height='350px'
    />,
    document.getElementById('root')
);
