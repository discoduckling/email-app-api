// SurveyField contains logic to render a single label and text input
import React from 'react';

const SurveyField = ({ input, label, meta: {error, touched} }) => { // removes input from props
    // console.log(meta);
    return (
        <div>
            <label>{ label }</label>
            <input {...input} />
            {touched && error}
        </div>
    )
};

export default SurveyField;

// {...input} = onBlue={input.onBlur} onChange={input.onChange}