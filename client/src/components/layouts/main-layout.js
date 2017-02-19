import React from 'react';

// Using "Stateless Functional Components"
export default function(props) {
  return (
    <div className="app">
      {props.children}
    </div>
    );
}
