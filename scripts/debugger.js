//definition for Debugger
//============================================================
	
//constructor
function Debugger()
{
	//member variables
	//========================================================
	this.console = null;
	
	//initialisation function - executed only once
	(
		function(object)
		{
			if (typeof console !== "undefined")
			{
				object.console = console;
			}
		}
	)(this);

	//member methods
	//========================================================
	this.isFunctional = function()
	{
		return this.console !== null;
	}

	//handles logging
	this.log = function()
	{
		if(this.isFunctional() === false)
		{
			throw new Error('Debugger is not functional');
		}
		
		if(typeof this.console.log !== 'function')
		{
			throw new Error('log is not a function');
		}

		this.console.log.apply(this.console, arguments);
	}

	//handles debugging
	this.debug = function()
	{
		if(this.isFunctional() === false)
		{
			throw new Error('Debugger is not functional');
		}
		
		if(typeof this.console.debug !== 'function')
		{
			throw new Error('debug is not a function');
		}

		this.console.debug.apply(this.console, arguments);
	}
	
	//handles info messages
	this.info = function()
	{
		if(this.isFunctional() === false)
		{
			throw new Error('Debugger is not functional');
		}
		
		if(typeof this.console.info !== 'function')
		{
			throw new Error('info is not a function');
		}
		
		this.console.info.apply(this.console, arguments);
	}

	//handles warning messages
	this.warn = function()
	{
		if(this.isFunctional() === false)
		{
			throw new Error('Debugger is not functional');
		}
		
		if(typeof this.console.warn !== 'function')
		{
			throw new Error('warn is not a function');
		}
		
		this.console.warn.apply(this.console, arguments);
	}

	//handles error messages
	this.error = function()
	{
		if(this.isFunctional() === false)
		{
			throw new Error('Debugger is not functional');
		}
		
		if(typeof this.console.error !== 'function')
		{
			throw new Error('error is not a function');
		}

		this.console.error.apply(this.console, arguments);
	}

	//handles assertions
	this.assert = function()
	{
		if(this.isFunctional() === false)
		{
			throw new Error('Debugger is not functional');
		}
		
		if(typeof this.console.assert !== 'function')
		{
			throw new Error('assert is not a function');
		}

		this.console.assert.apply(this.console, arguments);
	}
	
	//prints an interactive listing of the argument's properties
	this.dir = function()
	{
		if(this.isFunctional() === false)
		{
			throw new Error('Debugger is not functional');
		}
		
		if(typeof this.console.dir !== 'function')
		{
			throw new Error('dir is not a function');
		}

		this.console.dir.apply(this.console, arguments);
	}
	
	//prints an interactive tree based on the argument's structure
	this.dirxml = function()
	{
		if(this.isFunctional() === false)
		{
			throw new Error('Debugger is not functional');
		}
		
		if(typeof this.console.dirxml !== 'function')
		{
			throw new Error('dirxml is not a function');
		}

		this.console.dirxml.apply(this.console, arguments);
	}

	//details the functions on the stack, as well as the values that were passed as arguments to each function
	this.trace = function()
	{
		if(this.isFunctional() === false)
		{
			throw new Error('Debugger is not functional');
		}
		
		if(typeof this.console.trace !== 'function')
		{
			throw new Error('trace is not a function');
		}

		this.console.trace.apply(this.console);
	}

	//creates a new timer under the given name
	this.time = function()
	{
		if(this.isFunctional() === false)
		{
			throw new Error('Debugger is not functional');
		}
		
		if(typeof this.console.time !== 'function')
		{
			throw new Error('time is not a function');
		}

		this.console.time.apply(this.console, arguments);
	}
	
	//stops the timer with the given name
	this.timeEnd = function()
	{
		if(this.isFunctional() === false)
		{
			throw new Error('Debugger is not functional');
		}
		
		if(typeof this.console.timeEnd !== 'function')
		{
			throw new Error('timeEnd is not a function');
		}

		this.console.timeEnd.apply(this.console, arguments);
	}

	//adds an entry to the timeline during a recording session
	this.timeStamp = function()
	{
		if(this.isFunctional() === false)
		{
			throw new Error('Debugger is not functional');
		}
		
		if(typeof this.console.timeStamp !== 'function')
		{
			throw new Error('timeStamp is not a function');
		}

		this.console.timeStamp.apply(this.console, arguments);
	}

	//writes the number of times that the code that contains this line was executed
	this.count = function()
	{
		if(this.isFunctional() === false)
		{
			throw new Error('Debugger is not functional');
		}
		
		if(typeof this.console.count !== 'function')
		{
			throw new Error('count is not a function');
		}

		this.console.count.apply(this.console, arguments);
	}

	//logs provided data using tabular layout
	this.table = function()
	{
		if(this.isFunctional() === false)
		{
			throw new Error('Debugger is not functional');
		}
		
		if(typeof this.console.table !== 'function')
		{
			throw new Error('table is not a function');
		}

		this.console.table.apply(this.console, arguments);
	}
}

//non-member (static) methods
//============================================================

//performs input validation for numeric values that have to be within the given range
Debugger.numberInRange = function(value, from, to)
{
	Debugger.number(value);
	Debugger.number(from);
	Debugger.number(to);

	if(value < from || value > to)
	{
		throw new RangeError('numberInRange: values must be within the range ' + from + '-' + to);
	}
	
	return value;
}

//performs input validation for numeric values
Debugger.number = function(value)
{
	value = new Number(value).valueOf();

	if(typeof value !== 'number')
	{
		throw new TypeError('invalid type: this value should be a number');
	}
	
	return value;
}

//performs input validation for integer values
Debugger.integer = function(value)
{
	value = Debugger.number(value);

	if(value % 1 !== 0)
	{
		throw new TypeError('invalid type: this value should be an integer');
	}
	
	return value;
}

//performs input validation for real values
Debugger.real = function(value)
{
	value = Debugger.number(value);

	if(value % 1 === 0)
	{
		throw new TypeError('invalid type: this value should be a real number');
	}
	
	return value;
}

//performs input validation for text values
Debugger.string = function(value)
{
	if(typeof value !== 'string')
	{
		throw new TypeError('invalid type: this value should be a string');
	}
	
	return value;
}

//performs input validation for POJO reference values
Debugger.FUNCTIONreference = function(value)
{
	if(typeof value !== 'function')
	{
		throw new TypeError('invalid type: this value should be a Function');
	}
	
	return value;
}

//performs input validation for POJO reference values
Debugger.POJOreference = function(value)
{
	if(typeof value !== 'object')
	{
		throw new TypeError('invalid type: this value should be a POJO');
	}
	
	return value;
}

//performs input validation for DOM reference values
Debugger.HTMLreference = function(value)
{
	if(!(typeof value === 'object' && value instanceof HTMLElement))
	{
		throw new TypeError('invalid type: this value should be a DOM object');
	}
	
	return value;
}

//performs input validation for color values in rgb form
Debugger.color = function(red, green, blue)
{
	try
	{
		Debugger.numberInRange(red, 0, 255);
		Debugger.numberInRange(green, 0, 255);
		Debugger.numberInRange(blue, 0, 255);
	}
	catch(error)
	{
		throw new TypeError('color: invalid parameters, rgb values nust be within the range 0-255');
	}

	return 'rgb(' + red + ',' + green + ',' + blue + ')';
}


/*
**	public member methods
**	=====================
**	isFunctional()
**	log(object[, object, ...])
**	debug(object[, object, ...])
**	info(object[, object, ...])
**	warn(object[, object, ...])
**	error(object[, object, ...])
**	assert(object[, object, ...])
**	dir(object)
**	dirxml(object)
**	trace()
**	time(string)
**	timeEnd(string)
**	timeStamp(string)
**	count(string)
**	table(object)
**
**	public static methods
**	=====================
**	numberInRange(number, number, number)
**	number(number)
**	string(string)
**  FUNCTIONreference(object)
**  POJOreference(object)
**  HTMLreference(object)
**  color(number, number, number)
**/
