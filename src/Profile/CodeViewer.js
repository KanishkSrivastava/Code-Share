import React from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeViewer = ({ content, ext }) => {
  const height = window.innerHeight - 200;
  if (content.length === 0) return <div>No Selected Files</div>;
  else
    return (
      <div style={{ height, overflowY: 'scroll' }}>
        <SyntaxHighlighter language={ext} style={githubGist}>
          {content}
        </SyntaxHighlighter>
      </div>
    );
};
export default CodeViewer;
