// shows a form to add inputs
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'; // identical to connect helper
import SurveyField from './SurveyField';
import _ from 'lodash';
import { Link } from 'react-router-dom';

const FIELDS = [
    {label: 'Survey Title', name: 'title'},
    {label: 'Subject Line', name: 'subject'},
    {label: 'Email Body', name: 'body'},
    {label: 'Recipient List', name: 'emails'},
];

class SurveyForm extends Component {
    renderFields() {
        return _.map(FIELDS, ({ label, name}) => {
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
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    {this.renderFields()}
                    <Link to='/surveys' className='red btn-flat white-text'>
                        Cancel
                    </Link>
                    <button 
                        type='submit'
                        className='teal btn-flat right white-text'
                    >
                        Next <i className='material-icons'>done</i>
                    </button>
                    
                </form>
            </div>
        );
    }
}

const validate = (values) => {
    const errors = {};

    if (!values.title) {
        errors.title = 'You must provide a title';
    }
    return errors;
};

export default reduxForm({
    validate,
    form: 'surveyForm'
})(SurveyForm);