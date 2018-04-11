// SurveyField contains logic to render a single label and text input
import React from 'react';

const SurveyField = ({ input, label, meta: {error, touched} }) => { // removes input from props
    // console.log(meta);
    return (
        <div>
            <label>{ label }</label>
            <input {...input} style={{ marginBottom: '5px' }}/>
            <div 
                className='red-text'
                style={{ marginBottom: '20px'}}>
            {touched && error}
            </div>
        </div>
    )
};

export default SurveyField;

// {...input} = onBlue={input.onBlur} onChange={input.onChange}