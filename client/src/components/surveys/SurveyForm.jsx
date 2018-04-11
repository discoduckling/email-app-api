// shows a form to add inputs
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'; // identical to connect helper
import SurveyField from './SurveyField';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
    renderFields() {
        return _.map(formFields, ({ label, name}) => {
            return <Field
                key={name}
                type='text'
                name={name}
                component={SurveyField}
                label={label}
            />
        })
    }
    render() {
        return (
            <div>
                <form 
                    onSubmit={this.props.handleSubmit( this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to='/surveys' className='red btn-flat white-text'>
                        Cancel
                    </Link>
                    <button 
                        type='submit'
                        className='teal btn-flat right white-text'
                    >
                        Next <i className='material-icons right'>done</i>
                    </button>
                    
                </form>
            </div>
        );
    }
}

const validate = (values) => {
    const errors = {};
    errors.recipients = validateEmails(values.recipients || '');

    _.each(formFields, ({ name }) =>{
        if (!values[name]) {
            if (name !== 'recipients') {
                errors[name] = `You must provide a ${name}`;
            } else {
                errors[name] = 'You must provide recipients';
            }
        }
    });

    return errors;
};

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);