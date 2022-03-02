import React from 'react';

function MetaRecord({ icons, records }) {
  return (
    <div>
      {icons.map((icon, index) => (
        <img key={index} src={icon} alt="icon" style={{width:70}} />
      ))}
      <div className="result">
        <div className="win">win : {records.w}</div>
        <div className="draw">draw : {records.d}</div>
        <div className="lose">lose : {records.l}</div>
      </div>
    </div>
  );
}

export default MetaRecord;