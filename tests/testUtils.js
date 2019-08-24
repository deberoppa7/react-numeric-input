import React from 'react';
import { shallow } from 'enzyme';
/**
 * Function returns ShallowWrapper for the given component
 * @function setup
 * @param {Component} Component  - React Component shallow wrapper.
 * @param {object} props - component's props
 * @return {ShallowWrapper}  
*/
export const setup = (Component, props = {}) => shallow(<Component {...props} />);



/**
 * Function returns the dom node(s) with the given data-test attribute.
 * @function findByTestAttr
 * @param {ShallowWrapper} wrapper  - Enzyme shallow wrapper.
 * @param {string} value - Value of the data-attr for search.  
 * @return {ShallowWrapper}  
 */
export const findByTestAttr = (wrapper, value) => {
	return  wrapper.find(`[data-test="${value}"]`);
}


