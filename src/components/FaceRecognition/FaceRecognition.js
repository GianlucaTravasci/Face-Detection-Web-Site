import React from 'react';

const FaceRecognition = ({ imgUrl }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img src={imgUrl} alt="" width="500px" height="auto"></img>
            </div>
        </div>
    );
}

export default FaceRecognition;