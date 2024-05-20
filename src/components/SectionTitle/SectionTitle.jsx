import React from 'react';

const SectionTitle = ({heading,subHeading}) => {
    return (
        <div>
            <p className='text-yellow-600 text-center mb-2'>---{subHeading}---</p>
            <h3 className='text-3xl text-center uppercase border-y-2 p-4 w-96 m-auto mb-8'>{heading}</h3>
        </div>
    );
};

export default SectionTitle;