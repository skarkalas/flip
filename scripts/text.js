//set up debugger
if(typeof debug === 'undefined')
{
	var debug=new Debugger();
}

//definition for Text
//============================================================
	
//constructor
function Text()
{
	debug.info('(Text) a new Text instance is created');

	//member variables
	//========================================================
	this.textarea=null;
	this.url='https://dl.dropboxusercontent.com/u/15318052/LKLProjects/3DaysJSText/dialog.html';
	this.options=null;
	this.defaultOptions='dialogWidth: 700; dialogHeight: 400;';

	//member functions
	//========================================================		
	//initialisation function - executed only once
	this.init=function()
	{
		this.options = this.defaultOptions;
	}

	//mutator function for textarea
	this.setTextArea=function(textarea)
	{
		var textarearef=null;
	
		try
		{
			var textareaName=Debugger.string(textarea);
		
			//get the DOM object
			textarearef = document.getElementById(textareaName);
				
			//check whether it is a valid DOM object
			Debugger.HTMLreference(textarearef);
	
			//check to see whether it is a textearea
			if(typeof textarearef.tagName !== 'string' || textarearef.tagName.toLowerCase() !== 'textarea')
			{
				throw new TypeError('setTextArea: id given does not correspond to a textarea element');
			}
		}
		catch(error)
		{
			this.textarea = null;
			debug.error(error);
			debug.warn('(Text) setTextArea: textarea is not initialised (problem)');		
			return;
		}
		
		this.textarea = textarearef;
	}
	
	//checks whether a textarea is in place
	this.textAreaReady=function()
	{
		return this.textarea!==null;
	}
	
	//removes the contents from the textarea
	this.clear=function()
	{
		try
		{
			if(this.textAreaReady()===false)
			{
				throw new Error('clear: textarea is not ready - clear is not possible');
			}
		}
		catch(error)
		{
			debug.error(error);
			return false;
		}
		
		this.textarea.value = '';
		debug.info('(Text) clear: The textarea is clean');
	}
	
	this.read=function()
	{
		var args=Array.prototype.slice.call(arguments);
		
		try
		{
			if(args.length<1)
			{
				throw new Error('output: invalid number of arguments - input is not possible');
			}

			var names=new Array();
			
			for(var i=0;i<args.length;i++)
			{
				Debugger.POJOreference(args[i]);
				var format=true;
				format=format&&'name' in args[i];
				format=format&&'type' in args[i];
				format=format&&'prompt' in args[i];
				
				if(format===false)
				{
					throw new Error('input: invalid argument format - input is not possible');
				}
				
				format=false;
				format=format||args[i].type==='number';
				format=format||args[i].type==='string';
				format=format||args[i].type==='boolean';
				format=format||args[i].type==='date';

				if(format===false)
				{
					throw new Error('input: invalid type given - input is not possible');
				}

				if(args[i].name.indexOf(' ')!==-1)
				{
					throw new Error('input: names in JSON cannot contain spaces - input is not possible');
				}
				
				if(names.indexOf(args[i].name)===-1)
				{
					names.push(args[i].name);
				}
				else
				{
					throw new Error('input: duplicate names found is JSON - input is not possible');
				}
			}			
		}
		catch(error)
		{
			debug.error(error);
			return false;
		}
		
		return this.showDialog(args);
	}

	//displays the given text on the textarea if it exists and returns it
	//accepts any number of parameters
	//enumerates automatically objects
	this.write=function()
	{
		try
		{
			if(arguments.length<1)
			{
				throw new Error('output: invalid number of arguments - output is not possible');
			}			
		}
		catch(error)
		{
			debug.error(error);
			return '';
		}

		var value='';
		
		for(var i=0;i<arguments.length;i++)
		{			
			value+=(typeof arguments[i]==='object'?Text.toString(arguments[i]):arguments[i]);
		}

		if(this.textAreaReady() === true)
		{
			this.textarea.value = this.textarea.value + value;
			debug.info('(Text) displayText: some text is displayed');
		}
		
		debug.info('(Text) displayText: some text is returned');
		return value;
	}
	
	//displays the given text on the textarea if there is one and returns it
	//format specifiers can be used, any number of values can be supplied
	this.printf=function()
	{
		try
		{	
			if(arguments.length<2)
			{
				throw new Error('printf: invalid number of arguments - output is not possible');
			}

			var format=arguments[0];
			Debugger.string(format);
			
			for(var i=1;i<arguments.length;i++)
			{
				format=Text.processFormatSpecifier(format,arguments[i]);
			}
		}
		catch(error)
		{
			debug.error(error);
			return '';
		}

		if(this.textAreaReady() === true)
		{
			this.textarea.value = this.textarea.value + format;
			debug.info('(Text) printf: some formatted text is displayed');
		}
		
		debug.info('(Text) printf: some formatted text is returned');	
		return format;
	}

	//displays modal dialog and returns the input given
	this.showDialog=function(args)
	{
		// Convert the options string into an object.
		var pairs = this.options.replace(/\s+/g, "").split(";");
		var option = {};

		for(var pair in pairs)
		{
			pair = pairs[pair];
			
			if(pair === '')
			{
				continue;
			}

			try
			{
				pair = pair.split(":");

				if (pair.length != 2)
				{
					throw new Error('showDialog: options are not well formed - dialog cannot be shown');
				}

				option[pair[0]] = pair[1];
			}
			catch(error)
			{
				debug.error(error);
				return;
			}			
		}

		// Get the width and height of the document.
		var width = document.body.clientWidth;
		var height = document.body.clientHeight;

		// Get the width and height of the dialog.
		var dialogWidth = option.dialogWidth.replace("px", ""); 
		var dialogHeight = option.dialogHeight.replace("px", "");

		// Calculate where the dialog needs to be to be
		// centered.
		var dialogLeft = (width - dialogWidth) / 2;
		var dialogTop = (height - dialogHeight) / 2;

		// Add those settings to the options string.
		var optionsLocal = this.options;
		optionsLocal += "dialogLeft: " + dialogLeft + "; ";
		optionsLocal += "dialogTop: " + dialogTop + "; ";

		// Call the function.
		var returnValue=window.showModalDialog(this.url, args, optionsLocal);
		return returnValue;
	}
}

//non-member (static) functions
//============================================================

//replaces the format specifier in a piece of text with the corresponding value 
Text.processFormatSpecifier=function(text,nextValue)
{
	var nextSpecifier=Text.getNextFormatSpecifier(text);

	if(nextSpecifier===null)
	{
		throw new Error('(processFormatSpecifier) no specifier found');
	}

	var specifier=nextSpecifier;
	specifier=specifier.substring(1);

	var left=specifier[0]==='-';
	
	if(left===true)
	{
		specifier=specifier.substring(1);
	}

	var space=parseFloat(specifier);
	var decimalPlaces=null;

	if(isNaN(space)===false)
	{
		specifier=specifier.substring(space.toString().length);

		if(space%1!==0)
		{
			decimalPlaces=space.toString().split('.')[1];
			decimalPlaces=parseInt(decimalPlaces);
			space=space.toString().split('.')[0];
			space=parseInt(space);
		}
	}

	try
	{
		if(decimalPlaces!==null&&specifier!=='f')
		{
			throw new Error('(processFormatSpecifier) non float value given with decimal places format specifier');
		}
		
		switch(specifier)
		{
			case	'i':
			case	'd':	Debugger.integer(nextValue);
							break;
			case	'f':	Debugger.real(nextValue);
							if(decimalPlaces!==null)
							{
								nextValue=nextValue.toFixed(decimalPlaces);
							}							
							break;
			case	's':	Debugger.string(nextValue);
							break;
			case	'o':	Debugger.DOMreference(nextValue);
							nextValue=Text.toString(nextValue);
							break;
			case	'O':	Debugger.POJOreference(nextValue);
							nextValue=Text.toString(nextValue);
							break;
			default:
		}
	}
	catch(error)
	{
		debug.error(error);
		throw new Error('(processFormatSpecifier) value given is incompatible with format specifier');
	}
	
	if(isNaN(space)===false)
	{
		var padding=Array(space+1).join(' ');
		
		if(left===true)
		{
			nextValue=String(nextValue+padding).slice(0,padding.length);
		}
		else
		{
			nextValue=String(padding+nextValue).slice(-padding.length);
		}
	}
	
	text=text.replace(nextSpecifier,nextValue);
	return text;
}

//enumerates an object and returns a textual representation of its contents
Text.toString=function(object)
{
	var properties='';
	
	for(var property in object)
	{
		properties+=property+':'+object[property]+'\n';
	}
	
	return properties;
}

//retrieves a format specifier from a piece of text (if there is one)
Text.getNextFormatSpecifier=function(text)
{
	var pattern='%[-]?[0-9]*([.][0-9]+)?[idfsoO]';
	var modifiers='';
	var regexp=new RegExp(pattern,modifiers);
	var match=regexp.exec(text);
	return match.toString().split(',')[0];
}


/*
**	public methods
**	==============
**	init()						//initialises the object
**	clear()						//removes all the content from the textarea
**	write(v1,v2,..vn)			//displays the given text on the textarea - accepts any number of arguments - enumerates automatically objects
**	printf('format',v1,v2,..vn)//displays formatted text on the textarea - accepts any number of arguments - enumerates automatically objects
**	read(json1,json2,..jsonn)	//gets input from the user - json is used to specify the input required {name:'..',type='number|string|boolean|date',prompt:'..'}
**/


/*
	get some data from the user and display it formatted
	----------------------------------------------------
	text.clear();
	var name={name:'name',type:'string',prompt:'type your name'};
	var age={name:'age',type:'number',prompt:'type your age'};
	var dob={name:'birthdate',type:'date',prompt:'select your date of birth'};
	var sex={name:'sex',type:'boolean',prompt:'are you male?'};
	var input=text.read(name,age,dob,sex);
	text.printf('Your name is %s and you are %d years old\n',input.name,input.age);
	text.printf('You are %s and you were born in %d\n',input.sex?'male':'female',input.birthdate.getFullYear());
	
	display unformatted output
	--------------------------
	text.clear();
	var n=5;
	var s='Sokratis';
	var o={name:'sokratis',age:42};
	text.write(n,'\n',s,'\n',o);
	
	display formatted output
	------------------------
	text.clear();
	text.printf('|%-20s|\n','Maria');
	text.printf('|%20.2f|\n',12.59874513);
	text.printf('|%20d|\n',55);
	text.printf('%O\n',{name:'Sokratis',age:42});	
*/
