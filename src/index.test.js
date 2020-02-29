import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { setup, findByTestAttr, moutedWrapper } from "./test-utils";

import RNI from '../';

Enzyme.configure({ adapter: new Adapter() }); 

describe('The component <RNI />', () => {

	it('Renders without crashing', () => {
		const wrapper  = setup(RNI);
		const component = findByTestAttr(wrapper, "react-numeric-input");
		expect(component.length).toBe(1);
	});
	
	it('Renders decrease button', () => {
		const wrapper  = setup(RNI);
		const decreaseBtn = findByTestAttr(wrapper, "decrease-btn");
		expect(decreaseBtn.length).toBe(1);
	});
	
	it('Renders increase button', () => {
		const wrapper  = setup(RNI);
		const increaseBtn = findByTestAttr(wrapper, "increase-btn");
		expect(increaseBtn.length).toBe(1);
	});
	
	it('Value start at 0 if no min value was given',  () => {
		const wrapper  = setup(RNI);
		expect(wrapper.state().value).toBe(0);
	});

	it('The value start at given min value',  () => {
		const wrapper = setup(RNI, {min : 4});
		expect(wrapper.state().value).toBe(4);
	});

	it('Entering a value on the input and the value must never excced the given max',  () => {
		const wrapper = setup(RNI, {max : 5});
		const input = findByTestAttr(wrapper, "input");
		input.simulate('change', { target: { value: 8 }, persist: jest.fn() });
		input.simulate('blur', { persist: jest.fn() }); 
		expect(wrapper.state().value).toBe(5);
	});

	it('Entering a value on the input and the value must never be inferior than the given min',  () => {
		const wrapper = setup(RNI, {min : 5});
		const input = findByTestAttr(wrapper, "input");
		input.prop('onChange', { target: { value: 2} });
		input.simulate('blur', { persist: jest.fn() }); 
		expect(wrapper.state().value).toBe(5);
	}); 

	it('The value never excced the given max',  () => {
		const wrapper = setup(RNI, {max : 5, min: 2, value : 7});
		expect(wrapper.state().value).toBe(5);
	});

	it('The value never be inferior than the given min',  () => {
		const wrapper = setup(RNI, {max : 5, min: 2, value : 1});
		expect(wrapper.state().value).toBe(2);
	});

	it('Clicking the increment button update the input value',  () => {
		const wrapper = setup(RNI);
		const increaseBtn = findByTestAttr(wrapper, "increase-btn");
		
		expect(wrapper.state().value).toBe(0);
		increaseBtn.simulate('click');
		expect(wrapper.state().value).toBe(1);

	});

	it('Clicking the decrement button update the input value',  () => {
		const wrapper = setup(RNI, {value : 2});
		const decreaseBtn = findByTestAttr(wrapper, "decrease-btn");
		expect(wrapper.state().value).toBe(2);
		decreaseBtn.simulate('click');
		expect(wrapper.state().value).toBe(1);
	});

	it("Clicking the decrement button doesn't be inferior than the input min value",  () => {
		const wrapper = setup(RNI, { min : 2});
		const decreaseBtn = findByTestAttr(wrapper, "decrease-btn");
		expect(wrapper.state().value).toBe(2);
		decreaseBtn.simulate('click');
		decreaseBtn.simulate('click');
		expect(wrapper.state().value).toBe(2);
	});

	it("Clicking the increment button doesn't excced the max value",  () => {
		const wrapper = setup(RNI, {max : 2});
		const increaseBtn = findByTestAttr(wrapper, "increase-btn");
		expect(wrapper.state().value).toBe(0);
		increaseBtn.simulate('click');
		increaseBtn.simulate('click');
		increaseBtn.simulate('click');
		increaseBtn.simulate('click');
		expect(wrapper.state().value).toBe(2);
	});

	it("the input can accepte only numeric value",  () => {
		const wrapper = setup(RNI);
		const input = findByTestAttr(wrapper, "input");
		input.simulate('change', { target: { value: 'aaa'}, persist: jest.fn() });
		expect(wrapper.state().value).toBe(0);
	});
	
	
	it("the component can pass the value through the onChange props",  () => {
		let val = 0;
		const wrapper = moutedWrapper(RNI, { onChange : (value) => val = value});
		const increaseBtn = findByTestAttr(wrapper, "increase-btn");
		increaseBtn.simulate('click');
		increaseBtn.simulate('click');
		increaseBtn.simulate('click');
		increaseBtn.simulate('click');
		expect(val).toBe(4);
	});

	it("Clicking the decrease button will be disabled when the the value equal to the min given",  () => {
		const wrapper = setup(RNI, { min : 3, value : 5 });
		const decreaseBtn = findByTestAttr(wrapper, "decrease-btn");
		decreaseBtn.simulate('click');
		decreaseBtn.simulate('click');
		expect(wrapper.state().disableDecreaseBtn).toBe(true);
	});

	it("Clicking the increase button will be disabled when the the value equal to the max given",  () => {
		const wrapper = setup(RNI, { max : 3 });
		const increaseBtn = findByTestAttr(wrapper, "increase-btn");
		increaseBtn.simulate('click');
		increaseBtn.simulate('click');
		increaseBtn.simulate('click');
		expect(wrapper.state().disableIncreaseBtn).toBe(true);
	});

	it('Clicking on the increase button increase by the step given', ()=>{
		const wrapper = setup(RNI, { step : 3 });
		const increaseBtn = findByTestAttr(wrapper, "increase-btn");
		increaseBtn.simulate('click');
		increaseBtn.simulate('click');
		increaseBtn.simulate('click');
		expect(wrapper.state().value).toBe(9);
	})

	it('Clicking on the decrease button increase by the step given', ()=>{
		const wrapper = setup(RNI, { step : 3 });
		const decreaseBtn = findByTestAttr(wrapper, "decrease-btn");
		decreaseBtn.simulate('click');
		decreaseBtn.simulate('click');
		decreaseBtn.simulate('click');
		expect(wrapper.state().value).toBe(-9);
	})

	it("Clicking the increment button doesn't change the input to excced the max value when the step was given", ()=>{
		const wrapper = setup(RNI, { step : 3, max : 4 });
		const increaseBtn = findByTestAttr(wrapper, "increase-btn");
		increaseBtn.simulate('click');
		increaseBtn.simulate('click');
		expect(wrapper.state().value).toBe(4);
	})

	it("Clicking the increment button doesn't change the input value to be inferior than the min value when the step was given", ()=>{
		const wrapper = setup(RNI, { step : 3, min : 4 });
		const decreaseBtn = findByTestAttr(wrapper, "decrease-btn");
		decreaseBtn.simulate('click');
		decreaseBtn.simulate('click');
		expect(wrapper.state().value).toBe(4);
	})

	it("should set the value with the given precision", ()=>{
		const wrapper = setup(RNI, { precision : 2, value : 5 });
		const input = findByTestAttr(wrapper, "input");
		expect(input.prop('value').toString()).toBe('5.00');
	})

	it("the value don't change when disabled props was given", ()=>{
		const wrapper = setup(RNI, { disabled : true, value : 6 });
		const decreaseBtn = findByTestAttr(wrapper, "decrease-btn");
		const increaseBtn = findByTestAttr(wrapper, "increase-btn");
		const input = findByTestAttr(wrapper, "input");

		input.prop('onChange', { target: { value: 88} });
		decreaseBtn.simulate('click');
		increaseBtn.simulate('click');
		expect(wrapper.state().value).toBe(6);
	})

	it("the value don't change when readonly props was given", ()=>{
		const wrapper = setup(RNI, { readOnly : true, value : 6 });
		const decreaseBtn = findByTestAttr(wrapper, "decrease-btn");
		const increaseBtn = findByTestAttr(wrapper, "increase-btn");

		decreaseBtn.simulate('click');
		increaseBtn.simulate('click');
		expect(wrapper.state().value).toBe(6);
	})


	it("the prefix was added to the input value successfuly when it was given", ()=>{
		const wrapper = setup(RNI, { prefix : "$ ", value : 3});
		const input = findByTestAttr(wrapper, "input");
		expect(input.prop('value').toString()).toBe('$ 3');
	})

	it("the suffix was added to the input value successfuly when it was given", ()=>{
		const wrapper = setup(RNI, { suffix : " $", value : 3});
		const input = findByTestAttr(wrapper, "input");
		expect(input.prop('value').toString()).toBe('3 $');
	})

	it("the format prop was added to the input value successfuly when it was given", ()=>{
		const wrapper = setup(RNI, { format : (num)=> '** ' + num + ' **', value : 3});
		const input = findByTestAttr(wrapper, "input"); 
		expect(input.prop('value').toString()).toBe('** 3 **');
	})

});


