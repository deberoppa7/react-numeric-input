import React from 'react';
import { useFormik } from 'formik';
import RNI from 'react-numeric-input';

export default () =>  {

	const validate = (values) => {
		
		const errors = {};

		if ( !values.firstname.trim().length ) 
			errors.firstname = 'The firstname is required.';

		if ( parseFloat(values.number) === 0 ) 
			errors.number = 'We need a value other then zero (0)';
		
		return errors;
	};

	const formik = useFormik({
		initialValues: {
			firstname : "",
			number : 0
		},
		validate,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		}
	});

	return (
		<form className="formik-form" onSubmit={formik.handleSubmit}>
			<h3>My Formik form</h3>

			<label htmlFor="firstname">Firstname</label>
			<div>
				<input className="firstname" type="text" name="firstname" onChange={formik.handleChange} />
				{/* Error message */}
				{formik.errors.firstname ? <span className="error">{formik.errors.firstname}</span> : null}
			</div>

			<label htmlFor="number">Number of places</label>
			<div>
				<RNI 
					inputProps={{
						id : "number",
						name : "number" 
					}}
					value={formik.values.number} 
					onChange={formik.handleChange} 
				/>
				{/* Error message */}
				{formik.errors.number ? <span className="error">{formik.errors.number}</span> : null}
			</div>

			<button type="submit">Submit</button>
		</form>
	);
	
}

