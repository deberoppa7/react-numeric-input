import React from 'react';
import PropTypes from 'prop-types';

import styles from  './styles.css';

/**
 * @ReactComponent RNI - react numeric input
 * @param {string} className - The component's className 
 * @param {number} max - The input max value
 * @param {number} min - The input min value
 * @param {number} value - The input default value
 * @param {number} step - The value to increment the input
 * @param {function} onChange - CallBack function that return the input value when the component did update
 * @param {string} prefix - Add prefix to the output
 * @param {string} suffix - Add suffix to the output
 * @param {function} format - Custom format the output.
 * @param {boolean} mobile - Change the style of the input to be accessible in the mobile
 * @param {number} precision - describes the number of digits that are used to express the output.
 * @param {boolean} readOnly - Make the input readonly.
 * @param {boolean} disabled - Disable the input
*/


const __TEST_MODE__ = process && process.env && (process.env.NODE_ENV === 'test');

export default class RNI extends React.Component {
	
	constructor(props){
		super(props);

		this.state = {
			value : this.setInitValue(),
			disableDecreaseBtn : false,
			disableIncreaseBtn : false
		}

		this.inputRef = null;
		this.event = null;
	}

	/**
	 * @function setInitValue 
	 * Initialize the component state value with :
	 * min value, when the default value given was smaller than the given min
	 * max value, when the default value given was bigger than the given max
	 * @return {number}
	*/
	setInitValue(){
		const { min, max, value } = this.props;
		let v = value;

		if((min && max) && (min > max) ) 
			throw new Error('Min value must be smaller than the given max !');
		if(v < min) v = min;
		if(v > max) v = max;

		return isNaN(v) ? v : Number(v);
	}

	setValue(value, callback){
		this.setState({ value }, callback || null);
	}

	componentDidMount() {
		this.checkToDisableButtons();
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.props.onChange && (this.state.value !== prevState.value) )
			this.props.onChange(__TEST_MODE__ ? this.state.value : this.event); // We pass event so it can work with "Formik" library..
	}

	setNativeValue(element, value) {
		const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
		const prototype = Object.getPrototypeOf(element);
		const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;
	
		if (valueSetter && valueSetter !== prototypeValueSetter) {
			prototypeValueSetter.call(element, value);
		} else {
			valueSetter.call(element, value);
		}
	}

	decreaseClickHandler(){
		const { min, step } = this.props;
		const { value } 	= this.state;
		const v = ( (value - step) < min ) ? min : (value - step);

		if( !min || (min && (value > min)) ){
			if(!__TEST_MODE__){
				/**
				 * Dispatch the input change event,
				 * so we can store the event and pass it on onChange methode (for Formik validation)
				*/ 
				this.setNativeValue(this.inputRef, v);
				this.inputRef.dispatchEvent(new Event('input', { bubbles: true }));
			}
			else
				this.setValue( v, this.checkToDisableButtons );
		}
	}

	increaseClickHandler(){
		const { max, step } = this.props;
		const { value } 	= this.state;

		const v = ((value + step ) > max ) ? max : (value + step );

		if( !max || (max && (value < max)) ) {
			if(!__TEST_MODE__){
				/**
				 * Dispatch the input change event,
				 * so we can store the event and pass it on onChange methode (for Formik validation)
				*/ 
				this.setNativeValue(this.inputRef, v);
				this.inputRef.dispatchEvent(new Event('input', { bubbles: true }));
			}
			else
				this.setValue( v, this.checkToDisableButtons );
		}
	}
	
	inputChangeHandler(e){
		/**
		 * Will remove the synthetic event from the pool and allow references 
		 * to the event to be retained by user code.
		*/ 
		e.persist();
		this.event = e;

		let value = e.target.value;
		this.setValue( isNaN(value) ? this.state.value : Number( value ) );
	}

	inputBlurHandler(){
		const { min, max } = this.props;
		const { value }    = this.state;
		let v = value;

		if( v > max ) v = max;
		if( v < min ) v = min;

		this.setValue( isNaN(v) ? this.state.value : Number(v),  this.checkToDisableButtons);
	}

	inputKeydownHandler(e){
		// Enter key
		if(e.keyCode === 13) e.target.blur();
	}

	checkToDisableButtons(){
		const { min, max } = this.props;
		const { value }    = this.state;

		this.setState({ 
			disableDecreaseBtn : (value <= min),
			disableIncreaseBtn : (value >= max)
		});
	}


	renderTheValue(){
		const { prefix, suffix, precision, format } = this.props;
		const { value } = this.state;

		return `${prefix}${format ? format(value.toFixed(precision)) : value.toFixed(precision) }${suffix}`;	 
	}

	render() {
		const { disabled, readOnly, className, inputProps, mobile } = this.props;
		return (
			<span 
				data-test="react-numeric-input" 
				className={`${styles['react-numeric-input']} ${[className]} ${mobile ? styles['mobile'] : ""}`} >
				<span className={styles['react-numeric-input-inner']}>
					<i
						data-test="decrease-btn" 
						onClick={(!disabled && !readOnly) ? this.decreaseClickHandler.bind(this) : null}
						className={`${styles['btn']} ${styles['decrease-btn']} ${this.state.disableDecreaseBtn || (disabled || readOnly ) ? styles['disabled'] : ""}`}
					/>
					<input
						{...inputProps}
						ref={(ref)=>this.inputRef = ref}
						data-test="input" 
						type="numeric"
						value={this.renderTheValue()}
						onChange={this.inputChangeHandler.bind(this)}
						onBlur={this.inputBlurHandler.bind(this)}
						onKeyDown={this.inputKeydownHandler.bind(this)}
						disabled={disabled}
						readOnly={readOnly}
					/>
					<i
						data-test="increase-btn"
						onClick={(!disabled && !readOnly) ? this.increaseClickHandler.bind(this) : null}
						className={`${styles['btn']} ${styles['increase-btn']} ${this.state.disableIncreaseBtn || (disabled || readOnly ) ? styles['disabled'] : ""} `} 
					/>
				</span>
			</span>
		);
	}

	/**
     * The default props
    */
   	static defaultProps = {
		value 		: 0,
		min 		: Number.MIN_SAFE_INTEGER || -9007199254740991,
		max         : Number.MAX_SAFE_INTEGER ||  9007199254740991,
		step        : 1,
		precision 	: 0,
		prefix 		: '',
		suffix 		: '',
		format 		: null,
		mobile 		: false,
		disabled 	: false,
		readOnly 	: false,
		onChange 	: null
	};
}


RNI.propTypes = {
	className 	: PropTypes.string,
	max 		: PropTypes.number,
	min 		: PropTypes.number,
	step 		: PropTypes.number,
	precision 	: PropTypes.number,
	disabled 	: PropTypes.bool,
	readOnly 	: PropTypes.bool,
	prefix 		: PropTypes.string,
	suffix 		: PropTypes.string,
	format 		: PropTypes.func,
	mobile 		: PropTypes.bool,
	onChange 	: PropTypes.func
};


