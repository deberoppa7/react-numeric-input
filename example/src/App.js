import React, { Component } from 'react';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import RNI from 'react-numeric-input';


export default class App extends Component {
	render () {
		return (
			<section id="wrapper">
				<h1>React Numeric Input - USAGE</h1>

				<div>
					<h2>Default</h2>
<SyntaxHighlighter language='jsx'>
{`<RNI />`}
</SyntaxHighlighter>
					<RNI />
				</div>
				<div>
					<h2>Add ClassName</h2>
<SyntaxHighlighter language='jsx'>
{`<RNI className="my-custom-class1"/>`}
</SyntaxHighlighter>
				<RNI className="my-custom-class1"/>
				</div>
				
				<div>
					<h2>Common usage</h2>
<SyntaxHighlighter language='jsx'>
{`<RNI min={0} max={100} step={10} value={60} />`}
</SyntaxHighlighter>
				<RNI min={0} max={100} step={10} value={60}/>
				</div>

				<div>
					<h2>Default input value</h2>
<SyntaxHighlighter language='jsx'>
{`<RNI value={30} />`}
</SyntaxHighlighter>
					<RNI value={30} />
				</div>

				<div>
					<h2>Mobile UI</h2>
					<p>
						Mobile UI
					</p>
<SyntaxHighlighter language='jsx'>
{`<RNI mobile />`}
</SyntaxHighlighter>
					<RNI mobile />
				</div>


				<div>
					<h2>Min and Max</h2>
<SyntaxHighlighter language='jsx'>
{`<RNI min={0} max={10} mobile />`}
</SyntaxHighlighter>
					<RNI min={0} max={10} mobile />
				</div>

				<div>
					<h2>Floats usage</h2>
					<p>You can use step and precision props to make the input working with floating point numbers.</p>
<SyntaxHighlighter language='jsx'>
{`<RNI step={0.25} precision={2} value={30.25}/>`}
</SyntaxHighlighter>
					<RNI step={0.25} precision={2} value={30.25}/>
				</div>
				
				<div>
					<h2>Prefix</h2>
					<p>You can add prefix to the value like this</p>
<SyntaxHighlighter language='jsx'>
{`<RNI prefix="$" value={30} />`}
</SyntaxHighlighter>
					<RNI prefix="$" value={30} />
				</div>

				<div>
					<h2>Suffix</h2>
					<p>You can add suffix to the value like this</p>
<SyntaxHighlighter language='jsx'>
{`<RNI suffix="$" value={30} />`}
</SyntaxHighlighter>
					<RNI suffix="$" value={30} />
				</div>
				
				<div>
					<h2>Format</h2>
					<p>You can add you custom format to the value (it's a mix between prefix and suffix)</p>
<SyntaxHighlighter language='jsx'>
{`<RNI value={40} format={(value)=>{ return 'the value is : ' + value + ' $' }} /> `}
</SyntaxHighlighter>
					<RNI value={40} format={(value)=>{ return 'the value is : ' + value + ' $' }} /> 
				</div>
				
				<div>
					<h2>ReadOnly</h2>
					<p>The value cannot be updated by button's click or text entry. ( The input is only a display )</p>
<SyntaxHighlighter language='jsx'>
{`<RNI readOnly />`}
</SyntaxHighlighter>
					<RNI readOnly /> 
				</div>

				<div>
					<h2>Disabled</h2>
					<p>Disable the input</p>
<SyntaxHighlighter language='jsx'>
{`<RNI disabled />`}
</SyntaxHighlighter>
					<RNI disabled />
				</div>
				
				<div>
					<h2>onChanged</h2>
					<p>Disable the input</p>
<SyntaxHighlighter language='jsx'>
{`<RNI value={9} onChange={(value)=>alert(value)}/>`}
</SyntaxHighlighter>
					<RNI value={9} onChange={(value)=>alert(value)}/>
				</div>
				
			</section>
		)
	}
}
