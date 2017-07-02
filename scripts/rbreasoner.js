//definition for RB Reasoner
//============================================================
	
//constructor
function RBReasoner()
{
	//debug.info('(RB Reasoner) a new RBReasoner instance is created');

	//member variables
	//========================================================
	this.wm = null;							//working memory
	this.kb = null;							//knowledge base
	this.agenda = null;						//activated rules
	this.editor = null;						//hold a ref to the editor
	this.journal = null;					//hold a ref to the journal
	this.codebase = null;					//hold a ref to the codebase
	this.debugbase = null;					//hold a ref to the debugbase
	this.jslintbase = null;					//hold a ref to the jslint base
	this.currentCodeID = null;				//identifies the currently processed code

	//initialisation function - executed only once
	(
		function(object)
		{
			object.wm = TAFFY();			//empty database for wm
			object.kb = TAFFY();			//empty database for kb
			object.agenda = TAFFY();		//empty database for agenda
			object.jslintbase = TAFFY();	//empty database for jslint
			object.debugbase = TAFFY();		//empty database for debug info
		}
	)(this);
	
	//member methods
	//========================================================

	//further initialisation initiated by the user
	this.init = function(editor, journal, codebase)
	{
		this.loadKB();				//load kb with rules
		this.loadJSLint();			//load the JSLint rules
		this.editor = editor;		//init editor
		this.journal = journal;		//init journal
		this.codebase = codebase;	//init codebase
	}
	
	//load kb with rules
	this.loadKB = function()
	{
		this.kb.insert({"priority":"","name":"SCO-4","misconception":"Understanding the difference between block scope and function scope.","issue":"A variable is declared within a block of statements.","solution":"Move the declaration before the block.","facts":[{"relation":"is","subject":"v1","property":"var","select":"subject"},{"relation":"is","subject":"v2","property":"block","select":"subject"},{"relation":"location","subject":"v1","property":"v3","select":"property"},{"relation":"location","subject":"v2","property":"v4","select":"property"},{"relation":"is","subject":"v5","property":"structure","select":"subject"},{"relation":"relates","subject":"v5","property":"v6","select":"property"},{"relation":"location","subject":"v5","property":"v7","select":"property"}],"rules":[{"operand1":"v1","operator":"!=","operand2":" "},{"operand1":"v2","operator":"!=","operand2":" "},{"operand1":"","operator":"==","operand2":""},{"operand1":"v4","operator":"contains","operand2":"v3"},{"operand1":"","operator":"==","operand2":""},{"operand1":"v6","operator":"==","operand2":"v2"},{"operand1":"","operator":"==","operand2":""}],"references":[],"refactoring":[]});
//		this.kb.insert({"priority":"","name":"AR1-1","misconception":"Understanding off-by-one errors with arrays in loops.","issue":"An array is referenced by a loop iterator that becomes equal to its length.","solution":"Replace <= with <","facts":[{"relation":"is","subject":"v1","property":"array","select":"subject"},{"relation":"is","subject":"v2","property":"for","select":"subject"},{"relation":"includes","subject":"v2","property":"v3","select":"property"},{"relation":"is","subject":"v4","property":"var","select":"subject"},{"relation":"subscript","subject":"v1","property":"v5","select":"property"},{"relation":"test","subject":"v2","property":"v6","select":"property"},{"relation":"length","subject":"v1","property":"v7","select":"property"},{"relation":"is","subject":"v8","property":"literal","select":"subject"},{"relation":"value","subject":"v8","property":"v9","select":"property"},{"relation":"","subject":"v10","property":"","select":"subject"},{"relation":"is","subject":"v11","property":"operator","select":"subject"},{"relation":"value","subject":"v11","property":"v12","select":"property"},{"relation":"equals","subject":"v13","property":"<=","select":"subject"},{"relation":"","subject":"v14","property":"","select":"subject"},{"relation":"location","subject":"v11","property":"v15","select":"property"},{"relation":"location","subject":"v2","property":"v16","select":"property"},{"relation":"equals","subject":"v17","property":"<","select":"subject"}],"rules":[{"operand1":"v1","operator":"!=","operand2":" "},{"operand1":"v2","operator":"!=","operand2":" "},{"operand1":"v1","operator":"in","operand2":"v3"},{"operand1":"v4","operator":"!=","operand2":" "},{"operand1":"v4","operator":"in","operand2":"v5"},{"operand1":"v4","operator":"in","operand2":"v6"},{"operand1":"","operator":"==","operand2":""},{"operand1":"v8","operator":"!=","operand2":" "},{"operand1":"v9","operator":"==","operand2":"v7"},{"operand1":"v8","operator":"in","operand2":"v6"},{"operand1":"v11","operator":"!=","operand2":" "},{"operand1":"","operator":"==","operand2":""},{"operand1":"v13","operator":"==","operand2":"v12"},{"operand1":"v11","operator":"in","operand2":"v6"},{"operand1":"","operator":"==","operand2":""},{"operand1":"v16","operator":"contains","operand2":"v15"},{"operand1":"","operator":"==","operand2":""}],"references":[],"refactoring":[]});
		this.kb.insert({"priority":"","name":"AR1-1","misconception":"Understanding off-by-one errors with arrays in loops.","issue":"An array is referenced by a loop iterator that becomes equal to its length.","solution":"Replace <= with <","facts":[{"relation":"is","subject":"v1","property":"array","select":"subject"},{"relation":"is","subject":"v2","property":"for","select":"subject"},{"relation":"includes","subject":"v2","property":"v3","select":"property"},{"relation":"is","subject":"v4","property":"var","select":"subject"},{"relation":"subscript","subject":"v1","property":"v5","select":"property"},{"relation":"test","subject":"v2","property":"v6","select":"property"},{"relation":"length","subject":"v1","property":"v7","select":"property"},{"relation":"is","subject":"v8","property":"literal","select":"subject"},{"relation":"value","subject":"v8","property":"v9","select":"property"},{"relation":"","subject":"v10","property":"","select":"subject"},{"relation":"is","subject":"v11","property":"operator","select":"subject"},{"relation":"value","subject":"v11","property":"v12","select":"property"},{"relation":"equals","subject":"v13","property":"<=","select":"subject"},{"relation":"","subject":"v14","property":"","select":"subject"},{"relation":"location","subject":"v11","property":"v15","select":"property"},{"relation":"location","subject":"v2","property":"v16","select":"property"},{"relation":"equals","subject":"v17","property":"<","select":"subject"}],"rules":[{"operand1":"v1","operator":"!=","operand2":" "},{"operand1":"v2","operator":"!=","operand2":" "},{"operand1":"v1","operator":"in","operand2":"v3"},{"operand1":"v4","operator":"!=","operand2":" "},{"operand1":"v4","operator":"in","operand2":"v5"},{"operand1":"v4","operator":"in","operand2":"v6"},{"operand1":"","operator":"==","operand2":""},{"operand1":"v8","operator":"!=","operand2":" "},{"operand1":"v9","operator":"==","operand2":"v7"},{"operand1":"v8","operator":"in","operand2":"v6"},{"operand1":"v11","operator":"!=","operand2":" "},{"operand1":"","operator":"==","operand2":""},{"operand1":"v13","operator":"==","operand2":"v12"},{"operand1":"v11","operator":"in","operand2":"v6"},{"operand1":"","operator":"==","operand2":""},{"operand1":"v16","operator":"contains","operand2":"v15"},{"operand1":"","operator":"==","operand2":""}],"references":[],"refactoring":[{"left":"v13","operator":"replace","right":"v15"}]});
		this.kb.insert({"priority":"","name":"SVS-1","misconception":"Understanding the difference between variable values and literal values.","issue":"The value of a variable exists in other places as literal value.","solution":"Replace the literal values with the variable value.","facts":[{"relation":"is","subject":"v1","property":"var","select":"subject"},{"relation":"is","subject":"v2","property":"literal","select":"subject"},{"relation":"value","subject":"v1","property":"v3","select":"property"},{"relation":"is","subject":"v4","property":"literal","select":"subject"},{"relation":"","subject":"v5","property":"","select":"subject"},{"relation":"value","subject":"v2","property":"v6","select":"property"},{"relation":"value","subject":"v4","property":"v7","select":"property"}],"rules":[{"operand1":"v1","operator":"!=","operand2":" "},{"operand1":"v2","operator":"!=","operand2":" "},{"operand1":"v2","operator":"in","operand2":"v3"},{"operand1":"v4","operator":"!=","operand2":" "},{"operand1":"v4","operator":"!=","operand2":"v2"},{"operand1":"","operator":"==","operand2":""},{"operand1":"v6","operator":"==","operand2":"v7"}],"references":[],"refactoring":[]});
		this.kb.insert({"priority":"","name":"SVS-2","misconception":"Understanding the necessity of variables/constants.","issue":"The same literal value exists in many locations.","solution":"Replace the literal values with a variable.","facts":[{"relation":"is","subject":"v1","property":"literal","select":"subject"},{"relation":"value","subject":"v1","property":"v2","select":"property"},{"relation":"is","subject":"v3","property":"literal","select":"subject"},{"relation":"value","subject":"v3","property":"v4","select":"property"},{"relation":"","subject":"v5","property":"","select":"subject"}],"rules":[{"operand1":"v1","operator":"!=","operand2":" "},{"operand1":"","operator":"==","operand2":""},{"operand1":"v3","operator":"!=","operand2":" "},{"operand1":"v4","operator":"==","operand2":"v2"},{"operand1":"v3","operator":"!=","operand2":"v1"}],"references":[],"refactoring":[]});
		this.kb.insert({"priority":"","name":"SVS-3","misconception":"Understanding the necessity of variables when referring to array length.","issue":"Literal value that corresponds to the length of an array exists in the conditional part of a loop.","solution":"Replace the value with the array property.","facts":[{"relation":"is","subject":"v1","property":"array","select":"subject"},{"relation":"is","subject":"v2","property":"for","select":"subject"},{"relation":"test","subject":"v2","property":"v3","select":"property"},{"relation":"length","subject":"v1","property":"v4","select":"property"},{"relation":"is","subject":"v5","property":"literal","select":"subject"},{"relation":"location","subject":"v5","property":"v6","select":"property"},{"relation":"value","subject":"v5","property":"v7","select":"property"},{"relation":"location","subject":"v2","property":"v8","select":"property"},{"relation":"","subject":"v9","property":"","select":"subject"}],"rules":[{"operand1":"v1","operator":"!=","operand2":" "},{"operand1":"v2","operator":"!=","operand2":" "},{"operand1":"","operator":"==","operand2":""},{"operand1":"","operator":"==","operand2":""},{"operand1":"v5","operator":"!=","operand2":" "},{"operand1":"","operator":"==","operand2":""},{"operand1":"v7","operator":"==","operand2":"v4"},{"operand1":"v8","operator":"contains","operand2":"v6"},{"operand1":"v5","operator":"in","operand2":"v3"}],"references":[],"refactoring":[]});
		this.kb.insert({"priority":"","name":"SVS-4","misconception":"Understanding the role of the variable declaration.","issue":"Multiple declarations of the same variable.","solution":"Remove the word var after the initial declaration.","facts":[{"relation":"is","subject":"v1","property":"var","select":"subject"}],"rules":[{"operand1":"v1","operator":"is not","operand2":"distinct"}],"references":[],"refactoring":[]});
	}

	//load kb with rules
	this.loadJSLint = function()
	{
		this.jslintbase.insert({"priority":1,"name":"M1","misconception":"","issue":"","solution":"'.....' is already defined.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":2,"name":"M2","misconception":"","issue":"","solution":"'.....' is a statement label.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":3,"name":"M3","misconception":"","issue":"","solution":"'.....' used out of scope.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":35,"name":"M4","misconception":"","issue":"","solution":"\\['.....'\\] is better written in dot notation.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":4,"name":"M5","misconception":"","issue":"","solution":"'.....' is not a function.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":64,"name":"M6","misconception":"","issue":"","solution":"'.....' was used before it was defined.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":36,"name":"M7","misconception":"","issue":"","solution":"A constructor name '.....' should start with an uppercase letter.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":37,"name":"M8","misconception":"","issue":"","solution":"A regular expression literal can be confused with '/='.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":38,"name":"M9","misconception":"","issue":"","solution":"A trailing decimal point can be confused with a dot: '.....'.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":5,"name":"M10","misconception":"","issue":"","solution":"Bad assignment.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":6,"name":"M11","misconception":"","issue":"","solution":"Bad constructor.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":39,"name":"M12","misconception":"","issue":"","solution":"Confusing use of '-'.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":40,"name":"M13","misconception":"","issue":"","solution":"Confusing use of '+'.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":7,"name":"M14","misconception":"","issue":"","solution":"Do not use ..... as a constructor.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":8,"name":"M15","misconception":"","issue":"","solution":"Do not use 'new' for side effects.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":9,"name":"M16","misconception":"","issue":"","solution":"Do not wrap function literals in parens unless they are to be immediately invoked.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":65,"name":"M17","misconception":"","issue":"","solution":"Don't make functions within a loop.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":10,"name":"M18","misconception":"","issue":"","solution":"Duplicate '.....'.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":56,"name":"M19","misconception":"","issue":"","solution":"Empty block.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":41,"name":"M20","misconception":"","issue":"","solution":"Empty class.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":42,"name":"M21","misconception":"","issue":"","solution":"eval is evil.","evidence":"","facts":[],"references":[],"refactoring":[]});
		//this.jslintbase.insert({"priority":"","name":"M22","misconception":"","issue":"","solution":"Expected ';' and instead saw '}'.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":43,"name":"M23","misconception":"","issue":"","solution":"Expected a string and instead saw 'STRING_TYPE'.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":57,"name":"M24","misconception":"","issue":"","solution":"Expected an assignment or function call and instead saw an expression.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":11,"name":"M25","misconception":"","issue":"","solution":"Expected an identifier and instead saw '.....' \\(a reserved word\\).","evidence":"","facts":[],"references":[],"refactoring":[]});
		//this.jslintbase.insert({"name":"","misconception":"","issue":"","solution":"Unexpected parameter 'value' in get x function.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":12,"name":"M26","misconception":"","issue":"","solution":"Function statements are not invocable. Wrap the whole function invocation in parens.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":13,"name":"M27","misconception":"","issue":"","solution":"Function statements should not be placed in blocks.Use a function expression or move the statement to the top of the outer function.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":44,"name":"M28","misconception":"","issue":"","solution":"Implied eval is evil. Pass a function instead of a string.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":14,"name":"M29","misconception":"","issue":"","solution":"It is not necessary to initialize '.....' to 'undefined'.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":15,"name":"M30","misconception":"","issue":"","solution":"Missing '()'.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":16,"name":"M31","misconception":"","issue":"","solution":"Missing name in function statement.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":45,"name":"M32","misconception":"","issue":"","solution":"Missing radix parameter.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":17,"name":"M33","misconception":"","issue":"","solution":"Move the invocation into the parens that contain the function.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":62,"name":"M34","misconception":"","issue":"","solution":"Move 'var' declarations to the top of the function.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":46,"name":"M35","misconception":"","issue":"","solution":"Nested comment.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":18,"name":"M36","misconception":"","issue":"","solution":"Only properties should be deleted.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":58,"name":"M37","misconception":"","issue":"","solution":"Variable ..... was not declared correctly.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":19,"name":"M38","misconception":"","issue":"","solution":"Read only.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":20,"name":"M39","misconception":"","issue":"","solution":"Spaces are hard to count. Use {.....}.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":"","name":"M40","misconception":"","issue":"","solution":"Stopping. \\(.....\\% scanned\\).","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":21,"name":"M41","misconception":"","issue":"","solution":"The '.....' subexpression should be wrapped in parens.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":22,"name":"M42","misconception":"","issue":"","solution":"The body of a for in should be wrapped in an if statement to filter unwanted properties from the prototype.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":47,"name":"M43","misconception":"","issue":"","solution":"The Function constructor is eval.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":48,"name":"M44","misconception":"","issue":"","solution":"This is an ES5 feature.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":23,"name":"M45","misconception":"","issue":"","solution":"Unclosed comment.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":24,"name":"M46","misconception":"","issue":"","solution":"Unclosed regular expression.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":25,"name":"M47","misconception":"","issue":"","solution":"Unclosed string.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":26,"name":"M48","misconception":"","issue":"","solution":"Unexpected '.....'.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":59,"name":"M49","misconception":"","issue":"","solution":"Unexpected assignment expression.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":27,"name":"M50","misconception":"","issue":"","solution":"Unexpected comment.","evidence":"","facts":[],"references":[],"refactoring":[]});
		//this.jslintbase.insert({"priority":"","name":"M51","misconception":"","issue":"","solution":"Unexpected 'const'.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":49,"name":"M52","misconception":"","issue":"","solution":"Unexpected dangling '_' in '.....'.","evidence":"","facts":[],"references":[],"refactoring":[]});
		//this.jslintbase.insert({"priority":"","name":"M53","misconception":"","issue":"","solution":"Unexpected 'new'.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":50,"name":"M54","misconception":"","issue":"","solution":"Unexpected sync method: '.....'.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":55,"name":"M55","misconception":"","issue":"","solution":"Unexpected TODO comment.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":51,"name":"M56","misconception":"","issue":"","solution":"Unexpected 'with'.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":70,"name":"M57","misconception":"","issue":"","solution":"Uninitialized '.....'.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":63,"name":"M58","misconception":"","issue":"","solution":"Unnecessary 'else' after disruption.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":52,"name":"M59","misconception":"","issue":"","solution":"Unnecessary 'use strict'.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":28,"name":"M60","misconception":"","issue":"","solution":"Unused '.....'.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":29,"name":"M61","misconception":"","issue":"","solution":"Use a named parameter.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":53,"name":"M62","misconception":"","issue":"","solution":"Use the || operator.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":30,"name":"M63","misconception":"","issue":"","solution":"Use the array literal notation [].","evidence":"","facts":[],"references":[],"refactoring":[]});
		//this.jslintbase.insert({"name":"","misconception":"","issue":"","solution":"Use the function form of 'use strict'.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":31,"name":"M64","misconception":"","issue":"","solution":"Use the isNaN function to compare with NaN.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":32,"name":"M65","misconception":"","issue":"","solution":"Use the object literal notation {} or Object.create(null).","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":60,"name":"M66","misconception":"","issue":"","solution":"Weird assignment.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":61,"name":"M67","misconception":"","issue":"","solution":"Weird relation.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":33,"name":"M68","misconception":"","issue":"","solution":"Wrap an immediate function invocation in parentheses to assist the reader in understanding that the expression is the result of a function, and not the function itself.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":34,"name":"M69","misconception":"","issue":"","solution":"'.....' is not a label.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":54,"name":"M70","misconception":"","issue":"","solution":"master is undefined","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":66,"name":"M71","misconception":"","issue":"","solution":"Don't declare variables in a loop.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":67,"name":"M72","misconception":"","issue":"","solution":"Strange loop.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":68,"name":"M73","misconception":"","issue":"","solution":"Expected '{' and instead saw '.....'.","evidence":"","facts":[],"references":[],"refactoring":[]});
		this.jslintbase.insert({"priority":69,"name":"M74","misconception":"","issue":"","solution":"Unexpected label '.....'.","evidence":"","facts":[],"references":[],"refactoring":[]});
	}
	
	this.displayFacts = function()
	{
		console.table(this.wm().get());		
	}
	
	this.getDebugReport = function()
	{
		//count errors
		var count = this.debugbase().count();
		
		if(count === 0)
		{
			return '';
		}
		
		var html = '';
		html+="<table id='level2report'>";
		//html+="<caption>Syntax Issues Report: "+new Date().toLocaleString()+"</caption>";

		//get all rows as an array
		var errors = this.debugbase().get();
		
		//remove records
		this.debugbase().remove();

		for(var i = 0; i < errors.length; i++)
		{
			if(errors[i] != null)
			{
				if(i!=0)
				{
					html+="<tr class='divider'>";
					html+="<td colspan='2'><hr/>";		
					html+="</td>";
					html+="</tr>";
				}

				html+="<tr>";
				html+="<td>";
				html+="<span>"+(errors[i].reason)+"</span>";
				html+="</td>";
				html+="<td>";
				html+="<cite>line:"+(errors[i].line)+", character:"+(errors[i].character)+"</cite>";
				html+="</td>";
				html+="</tr>";
				html+="<tr>";
				html+="<td class='evidence'>";
				html+="<pre>"+(errors[i].evidence===undefined?"":errors[i].evidence)+"</pre>";
				html+="</td>";
				html+="</tr>";
			}
		}

		html+="<tr>";
		html+="<td colspan='2'><hr/>";		
		html+="</td>";
		html+="</tr>";
		html+="<tr>";
		html+="<td colspan='2'>";		
		html+="<input style='width:100%' type='button' value='Please press this button to continue.' onclick='stopDebugging();'/>";
		html+="</td>";
		html+="</tr>";
		
		html+="</table>";
		return html;
	}
	
	//checks whether facts satisfy rules and activate them (Rule Activation Component)
	this.activateRules = function()
	{
		//if there are no facts return
		if(this.wm().count() === 0)
		{
			return;
		}
		
		var wm = this.wm;
		var kb = this.kb;
		var agenda = this.agenda;
		var checkRule = this.checkRule;
		var updateJournal = this.updateJournal;
		var codeid = this.currentCodeID;

		//check every rule with the given facts
		kb().each
		(
			function (record, recordnumber)
			{
				//make a copy of the rule
				var rule = JSON.parse(JSON.stringify(record));
				
				//check if it needs activation
				console.info('*** rule: ' + record.name + ' is being checked');
				var facts = [];
				var locations = [];
				var test = checkRule(rule, 0, facts, wm, locations);
				
				var ruleName = record.name;
				var misconception = record.misconception;
				var issue = record.issue;
				var solution = record.solution;
				var statements = record.statements;
				var refactoring = record.refactoring;
				var rules = record.rules;

				if(test === true)
				{
					var activeRule = {};
					activeRule.name = ruleName;
					activeRule.misconception = misconception;
					activeRule.issue = issue;
					activeRule.solution = solution;
					activeRule.facts = facts;
					activeRule.locations = locations;
					activeRule.factCount = Object.keys(facts).length;
					activeRule.refactoring = refactoring;					
					agenda.insert(activeRule);

					console.info('*** rule: ' + ruleName + ' is activated');
					updateJournal(ruleName, currentUser, 'activated', codeid, 0);
				}
			}
		);
	}
	
	//checks whether a rule needs to be activated
	this.checkRule = function(rule, index, facts, wm, locations)
	{
		console.info('index no: %d, no of facts: %d.', index , rule.facts.length);
		
		if(index >= rule.facts.length)
		{
			return true;
		}
		
		console.log(index + '.' + 1, 'facts already evaluated -->', facts);
		console.log(index + '.' + 2, 'next couple to be evaluated -->', 'fact:', JSON.stringify(rule.facts[index]), 'rule:', JSON.stringify(rule.rules[index]));
		
		//get the next relevant fact from the wm
		var fact = rule.facts[index];
		var factID = '';

		if(fact.relation === '')
		{
			if(fact.select === 'subject')
			{
				facts[fact.subject] = [];
				factID = fact.subject;
			}
			else
			{
				facts[fact.property] = [];
				factID = fact.property;
			}
		}
		else if(fact.select === 'subject')
		{
			if(fact.relation === 'equals')
			{
				facts[fact.subject] = fact.property;
			}
			else if (fact.relation === 'distinct')
			{
				facts[fact.subject] = wm({'relation':'is'},{'property':fact.property}).distinct(fact.select);
			}
			else
			{
				facts[fact.subject] = wm({'relation':fact.relation},{'property':fact.property}).select(fact.select);
			}
			
			factID = fact.subject;
		}
		else
		{
			facts[fact.property] = wm({'relation':fact.relation},{'subject':facts[fact.subject]}).select(fact.select);
			factID = fact.property;
		}
		
		console.log(index + '.' + 3, 'fact value retrieved from the wm:', facts[factID]);
	
		//evaluate the corresponding subrule
		var subrule = rule.rules[index];
		var operand1 = subrule.operand1;
		var operator = subrule.operator;
		var operand2 = subrule.operand2;
				
		var condition = true;

		console.log(index + '.' + 4, 'operation:', operand1, operator, operand2);
		console.log(index + '.' + 5, 'operation:', facts[operand1], operator, facts[operand2] === undefined ? operand2 : facts[operand2]);

		if(operator === 'in' || operator === 'not in')
		{
			condition = facts[operand2].indexOf(facts[operand1]+'') > -1;
			
			if(operator.search('not') !== -1)
			{
				condition = !condition;
			}
		}
		else if(operator === 'contains' || operator === 'not contains')
		{
			var location1 = JSON.parse(facts[operand1][0]);
			var location2 = JSON.parse(facts[operand2][0]);

			location1 = new Range(location1.start.line - 1, location1.start.column, location1.end.line - 1, location1.end.column);
			location2 = new Range(location2.start.line - 1, location2.start.column, location2.end.line - 1, location2.end.column);

			condition = location1.containsRange(location2);			

			if(operator.search('not') !== -1)
			{
				condition = !condition;
			}
		}	
		else if(operator === 'is' || operator === 'is not')
		{
			if(operand2 === 'distinct')
			{
				var unique = facts[operand1].filter(onlyUnique);
				condition = unique.length === facts[operand1].length;
			
				if(operator.search('not') !== -1)
				{
					condition = !condition;
				}
			}
			else
			{
				condition = false;
			}
		}
		else
		{
			if(operand2.trim() === '')
			{
				if(operand1 === '' || facts[operand1] === '')
				{
					condition = eval('""' + operator +  '""');
				}
				else
				{
					condition = eval('"' + facts[operand1] + '"' + operator + '""');
				}
			}
			else
			{
				condition = eval('"' + facts[operand1] + '"' + operator + '"' + facts[operand2] + '"');
			}
		}

		console.log(index + '.' + 6, 'operation result:', condition);		

		if(condition === false)
		{
			return false;
		}
		
		if(fact.relation === '')
		{
			if(arguments.callee(rule, index + 1, facts, wm, locations) === true)
			{
				return true;
			}
		}

		if(fact.relation === 'is')
		{
			var factValues = facts[factID].slice(0);

			console.log(index + '.' + 7, 'fact values split');

			for(var factValue in factValues)
			{
				facts[factID] = factValues[factValue];
				console.log(index + '.' + 7.1, '(subject)', facts[factID], '(relation)', fact.relation, '(property)', fact.property, '(from values)', factValues[factValue]);

				locations[factID] = wm({'relation':fact.relation},{'property':fact.property},{'subject':factValues[factValue]}).select('location')[0];
				console.log(index + '.' + 7.2, 'fact location:', locations[factID]);
				locations[factID] = JSON.parse(locations[factID]);

				if(arguments.callee(rule, index + 1, facts, wm, locations) === true)
				{
					return true;
				}
			}
		}
		else
		{
			if(arguments.callee(rule, index + 1, facts, wm, locations) === true)
			{
				return true;
			}		
		}
		
		return false;
	}
	
	this.setLevel2Feedback = function(errors)
	{
		var reason = null;
		var line = null;
		var character = null;
		var evidence  = null;
		var solution = null;
		var rule = null;
		var activeRule = null;
		var jslintbase = this.jslintbase().get();
		var i = null;
		var j = null;

		for(var i = 0; i < errors.length; i++)
		{
			if(errors[i] != null)
			{
				reason = errors[i].reason;
				line = errors[i].line;
				character = errors[i].character;
				evidence = errors[i].evidence === undefined ? "" : errors[i].evidence;
				rule = null;
				
				for(j = 0; j < jslintbase.length; j++)
				{
					solution = jslintbase[j].solution;
					
					//if the solution pattern to the problem is the reason the error was generated
					if (this.matchL2Rule(solution, reason) === true)
					{
//						console.log(solution);
						rule = jslintbase[j];
					}
					
					//console.log(solution, reason, '\n');
				}

				if(rule === null)
				{
					this.debugbase.insert({"reason":reason,"line":line,"character":character,"evidence":evidence});
				}
				else
				{
					var activeRule = {};
					activeRule.name = rule['name'];
					activeRule.misconception = rule['misconception'];
					activeRule.issue = rule['issue'];
					activeRule.solution = reason;
					activeRule.evidence = evidence;
					activeRule.line = line;
					activeRule.character = character;
					activeRule.priority = rule['priority'];

					if(activeRule.priority !== '')
					{
						this.agenda.insert(activeRule);
//						console.info('*** rule: ' + rule['name'] + ' is activated');
						this.updateJournal(rule['name'], currentUser, 'activated', this.currentCodeID, 0, 'system');				
					}
				}
//				console.log(reason, rule !== null, '\n');
			}
		}
//		console.table(this.agenda().get());
//		console.table(this.journal().get());
	}
	
	this.matchL2Rule = function(template, feedback)
	{
		var placeholder = '.....';
		var position = template.indexOf(placeholder);
		//text.write(position, '\n');

		var flags = 'gi';
		var regexp = null;
		var found = false;

		if(position !== -1)
		{
			template = template.split(placeholder);
			template = '^' + template[0] + '.*' + template[1] + '$';
			regexp = new RegExp(template, flags);
			//text.write(template, '\n');
			found = regexp.test(feedback);
		}
		else
		{
			found = template === feedback;
		}
		
		return found;
	}
	
	this.getL2RuleRegExp = function(template)
	{
		var placeholder = '.....';
		var position = template.indexOf(placeholder);

		if(position !== -1)
		{
			template = template.split('.....');
			template = '/^' + template[0] + '.*' + template[1] + '$/';
		}
		
		return template;
	}
	
	this.updateCurrentCode = function()
	{
		if(this.codebase({"id":codeVersion}).count() === 1)
		{
//			console.log('code exists in db');
			return false;
		}
	
		//get highlighted text
		var code=this.editor.getCopyText();

		if(code.trim() === '')
		{
			//get code that is not highlighted
			code=this.editor.getSession().getValue();
		}

		if(code.trim() === '')
		{
			return false;
		}

		//insert code into the codebase
		var record = {};
		record.code = code;
		record.id = codeVersion;
		this.codebase.insert(record);
		
		//update current code ID from the database
		this.currentCodeID = record.id;
		return true;
	}
	
	//removes facts from working memory and removed active rules from agenda
	this.clearMemory = function()
	{
		//remove facts from previous analysis
		this.wm().remove(true);
		
		//remove activated rules from the agenda
		this.agenda().remove(true);	
	}
	
	//analyses code, identifies misconceptions and decides on how to support the student
	this.getSupport = function()
	{
		//get highlighted text
		var code=this.editor.getCopyText();

		if(code.trim() === '')
		{
			//get code that is not highlighted
			code=this.editor.getSession().getValue();
		}

		if(code.trim() === '')
		{
			return false;
		}

		//insert code into the codebase
		//this.updateCurrentCode();
		
		//update current code ID from the database
		//this.currentCodeID = record.id;

		//use esprima to get the AST
		var ast = this.getAST(code, true, true, true, true);

		//remove facts from previous analysis
		this.wm().remove(true);
		
		//remove activated rules from the agenda
		this.agenda().remove(true);
		
		//get the facts
		this.getFacts(ast);

		//display the facts to the console
		this.displayFacts();

		//activate rules
		this.activateRules();
		
//display the data portion in the journal
//console.table(this.journal().select('data'));		
//console.table(this.agenda().get());

		//if there are active rules in the agenda, there is support available
		return this.agenda().count() > 0;
	}
	
	this.updateJournal = function(name, userid, state, codeid, level, issuer)
	{
		var entries = this.journal
		(
			function()
			{
				var result = true;
				result = result && this.type === 'help';
				result = result && this.data.misconception === name;
				result = result && this.data.state === state;
				result = result && this.data.codeid === codeid;
				result = result && this.data.level === level;
				return result;
			}
		).count();
		
		if(entries > 0)
		{
//			console.log('journal entry exists');
			return;
		}
		
		var record = {};
		record.id = Date.now();
		record.userid = userid;
		record.issuer = issuer;
		record.type = 'help';
		record.data = {};
		record.data.misconception = name;
		record.data.state = state;
		record.data.codeid = codeid;
		record.data.level = level;
		this.journal.insert(record);
	}
	
	this.getMisconceptionsReport = function()
	{
		var ruleName = this.selectRuleToFire();
		var journal = this.journal;
		var html="";

		html+="<p id='level3message'>The system identified potential misconceptions. It is suggested that you start with the one indicated by the reddish button.</p><br/>";
		
		html+="<table id='level3report'>";
		html+="<caption>Level 3 Report: "+new Date().toLocaleString()+"</caption>";
	
		this.agenda().each
		(
			function (record,recordnumber)
			{
				if(recordnumber != 0)
				{
					html+="<tr class='divider'>";
					html+="<td colspan='3'><hr/>";		
					html+="</td>";
					html+="</tr>";				
				}

				html+="<tr>";
				html+="<td style='width:50%;background-color:#FFFFFF' colspan='2'>";
				
				if(ruleName === record.name)
				{
					html+="<input style='width:100%;background-color:#F06856;' type='button' value='more help...' onclick='moreHelp(this, " + '"' + record.name + '"' + ")'/>";
				}
				else
				{
					html+="<input style='width:100%' type='button' value='more help...' onclick='moreHelp(this, " + '"' + record.name + '"' + ")'/>";
				}
				
				html+="</td>";
				html+="<td style='background-color:#FFFFFF'>";
				html+="<input style='width:100%' type='button' value='not relevant' onclick='deleteEntry(this, " + '"' + record.name + '"' + ")'/>";
				html+="</td>";
				html+="</tr>";							
				html+="<tr>";
				html+="<td style='width:25%'>";
				html+="<span>misconception:</span>";
				html+="</td>";
				html+="<td colspan='2'>";
				html+="<cite>" + record.misconception + "</cite>";
				html+="</td>";
				html+="</tr>";
				html+="<tr style='display:none'>";
				html+="<td class='evidence'>";
				html+="<span>issue:</span>";
				html+="</td>";
				html+="<td class='evidence' colspan='2'>";
				html+="<span>" + record.issue + "</span>";
				html+="</td>";
				html+="</tr>";
				html+="<tr style='display:none'>";
				html+="<td class='evidence'>";
				html+="<span>documentation:</span>";
				html+="</td>";
				html+="<td class='evidence' colspan='2'>";
				html+="<input style='width:100%' type='button' value='read more about it...' onclick='readDoc(" + '"' + record.name + '"' + ")'/>";
				html+="</td>";
				html+="</tr>";
				html+="<tr style='display:none'>";
				html+="<td class='evidence'>";
				html+="<span>solution:</span>";
				html+="</td>";
				html+="<td class='evidence' colspan='2'>";
				html+="<span>" + record.solution + "</span>";
				html+="</td>";
				html+="</tr>";
				html+="<tr style='display:none'>";
				html+="<td class='evidence'>";
				html+="<span>visualisation:</span>";
				html+="</td>";
				html+="<td class='evidence' colspan='2'>";
				html+="<input style='width:100%' type='button' value='show me what it does' onclick='displayVisualisation();'/>";
				html+="</td>";
				html+="</tr>";
				if(Object.keys(record.refactoring).length !== 0)
				{
					html+="<tr style='display:none'>";
					html+="<td class='evidence'>";
					html+="<span>refactoring:</span>";
					html+="</td>";
					html+="<td class='evidence' colspan='2'>";
					html+="<input style='width:100%' type='button' value='fix it for me' onclick='reasoner.refactor(" + '"' + record.name + '"' + ")'/>";
					html+="</td>";
					html+="</tr>";
				}		
			}
		);
		
		html+="</table>";
		return html;
	}
	
	this.getCurrentRuleLevel = function(name)
	{
		var records = this.journal
		(
			function()
			{
				return (this.type === 'help' && this.data.misconception === name && this.data.state === 'fired');
			}
		).get();
		
		var max = null;
		var i = null;
		var level = null;
		
		for(i = 0; i < records.length; i++)
		{
			if(i === 0)
			{
				max = records[i].id;
			}
			
			if(max <= records[i].id)
			{
				max = records[i].id;
				level = records[i].data.level;
			}
		}
		
//console.log('id:', max, '\n');		
		return level;		
	}
	
	this.getHelpReport = function(previousPriority, level, issuer)
	{
		var priority = this.selectRuleToFire(previousPriority);

		if(priority === null)
		{
//			console.log('no help is available');
			return '';
		}
		
		var journal = this.journal;
		
		var rule = this.agenda({'priority':priority}).get()[0];

		//update the journal  - tell it that this rule fired
		this.updateJournal(rule.name, currentUser, 'fired', reasoner.currentCodeID, level, issuer);
		
		var html="";

		html+="<table id='level3report'>";
		//html+="<caption>Help provided at: "+new Date().toLocaleString()+"</caption>";

		html+="<tr>";
		
		if(('line' in rule) && ('character' in rule))
		{
			html+="<td>";
			html+="<span>"+(rule.solution)+"</span>";
			html+="</td>";
			html+="<td colspan='2' style='text-align:center'>";
			html+="<cite>line:"+(rule.line)+", character:"+(rule.character)+"</cite>";
			html+="</td>";
		}
		else
		{
			html+="<td colspan='3'>";
			html+="<span>"+(rule.solution)+"</span>";
			html+="</td>";		
		}

		html+="</tr>";

		if('evidence' in rule)
		{
			html+="<tr>";
			html+="<td class='evidence' colspan='3'>";
			html+="<pre>"+(rule.evidence)+"</pre>";
			html+="</td>";
			html+="</tr>";
		}

		html+="<tr style='display:none'>";
		html+="<td>";
		html+="<input type='button' value='read more about it...' onclick='readDoc(" + '"' + rule.name + '"' + ")'/>";
		html+="</td>";		
		html+="<td colspan='2' style='text-align:center'>";
		html+="<span>documentation</span>";
		html+="</td>";		
		html+="</tr>";

		html+="<tr style='display:none'>";
		html+="<td>";
		html+="<input type='button' value='show me what it does' onclick='displayVisualisation();'/>";
		html+="</td>";		
		html+="<td colspan='2' style='text-align:center'>";
		html+="<span>visualisation</span>";
		html+="</td>";		
		html+="</tr>";
		
		html+="<tr><td colspan='3'><hr/></td></tr>";

		html+="<tr>";
		html+="<td style='text-align:center'>";
		html+="<span>Is this helpful?</span>";
		html+="</td>";
		html+="<td style='width:15%'>";
		html+="<input type='button' value='Yes' onclick='recordStudentOpinion(this, \"" + rule.name + "\")'/>";
		html+="</td>";
		html+="<td style='width:15%'>";
		html+="<input type='button' value='No' onclick='recordStudentOpinion(this, \"" + rule.name + "\")'/>";
		html+="</td>";
		html+="</tr>";

		html+="<tr style='display:none'><td colspan='3'><hr/></td></tr>";

		html+="<tr style='display:none'>";
		html+="<td colspan='3' style='text-align:center'>";
		html+="<span>Why not?</span>";
		html+="</td>";
		html+="</tr>";
		html+="<tr style='display:none'>";
		html+="<td colspan='3'>";
		html+="<input type='button' value='That is not enough. Tell me more.' onclick='getMoreHelp(this,\"" + rule.name + "\"," + priority + ")'/>";
		html+="</td>";
		html+="</tr>";
		html+="<tr style='display:none'>";
		html+="<td colspan='3'>";
		html+="<input type='button' value='I need help on something else.' onclick='getMoreHelp(this,\"" + rule.name + "\"," + priority + ")'/>";
		html+="</td>";
		html+="</tr>";
		
/*		
		html+="<tr>";
		html+="<td style='width:50%;background-color:#FFFFFF' colspan='2'>";
		
		if(ruleName === record.name)
		{
			html+="<input style='width:100%;background-color:#F06856;' type='button' value='more help...' onclick='moreHelp(this, " + '"' + record.name + '"' + ")'/>";
		}
		else
		{
			html+="<input style='width:100%' type='button' value='more help...' onclick='moreHelp(this, " + '"' + record.name + '"' + ")'/>";
		}
		
		html+="</td>";
		html+="<td style='background-color:#FFFFFF'>";
		html+="<input style='width:100%' type='button' value='not relevant' onclick='deleteEntry(this, " + '"' + record.name + '"' + ")'/>";
		html+="</td>";
		html+="</tr>";							
		html+="<tr>";
		html+="<td style='width:25%'>";
		html+="<span>misconception:</span>";
		html+="</td>";
		html+="<td colspan='2'>";
		html+="<cite>" + record.misconception + "</cite>";
		html+="</td>";
		html+="</tr>";
		html+="<tr style='display:none'>";
		html+="<td class='evidence'>";
		html+="<span>issue:</span>";
		html+="</td>";
		html+="<td class='evidence' colspan='2'>";
		html+="<span>" + record.issue + "</span>";
		html+="</td>";
		html+="</tr>";
		html+="<tr style='display:none'>";
		html+="<td class='evidence'>";
		html+="<span>documentation:</span>";
		html+="</td>";
		html+="<td class='evidence' colspan='2'>";
		html+="<input style='width:100%' type='button' value='read more about it...' onclick='readDoc(" + '"' + record.name + '"' + ")'/>";
		html+="</td>";
		html+="</tr>";
		html+="<tr style='display:none'>";
		html+="<td class='evidence'>";
		html+="<span>solution:</span>";
		html+="</td>";
		html+="<td class='evidence' colspan='2'>";
		html+="<span>" + record.solution + "</span>";
		html+="</td>";
		html+="</tr>";
		html+="<tr style='display:none'>";
		html+="<td class='evidence'>";
		html+="<span>visualisation:</span>";
		html+="</td>";
		html+="<td class='evidence' colspan='2'>";
		html+="<input style='width:100%' type='button' value='show me what it does' onclick='displayVisualisation();'/>";
		html+="</td>";
		html+="</tr>";
		if(Object.keys(record.refactoring).length !== 0)
		{
			html+="<tr style='display:none'>";
			html+="<td class='evidence'>";
			html+="<span>refactoring:</span>";
			html+="</td>";
			html+="<td class='evidence' colspan='2'>";
			html+="<input style='width:100%' type='button' value='fix it for me' onclick='reasoner.refactor(" + '"' + record.name + '"' + ")'/>";
			html+="</td>";
			html+="</tr>";
		}		
*/		
		html+="</table>";
		return html;
	}

	this.selectRuleToFire =  function(previousPriority)
	{
		//if there are no rules in the agenda stop
		var rulesCount = this.agenda().count();
		
		if(rulesCount === 0)
		{
//			console.log('there are no rules in the agenda!');
			return null;
		}
		
		//find the lowest number of facts in the set
		//var factCount = this.agenda().min('factCount');

		//find the lowest priority number
		var priority = this.agenda({'priority':{'>':previousPriority}}).min('priority');
//console.log('************priority:', previousPriority, priority, '\n');	
		//select and return the rule with that number
		var rule = this.agenda({'priority':priority}).get()[0];
		
		if(typeof rule === 'undefined')
		{
			return null;
		}
		
		return rule.priority;
	}
	
	this.refactor = function(ruleName)
	{
		//select the rule from the agenda
		var rule = this.agenda({'name':ruleName}).get()[0];

		//refactor the code
		var facts = rule.facts;
		var locations = rule.locations;
		var refactoring = rule.refactoring;

		for(var action in refactoring)
		{
			action = refactoring[action];
			var left = facts[action.left][0];
			var operator = action.operator;
			var right = facts[action.right][0];
			
			try
			{
				left = JSON.parse(left);
			}
			catch(e){}

			try
			{
				right = JSON.parse(right);
			}
			catch(e){}

			if(operator === 'replace')
			{
				if(typeof right !== 'object')
				{
					alert('Refactoring is not possible. The right operator must be a location.');
					return;				
				}
				
				var range = null;
				
				if(typeof left === 'object')
				{
					var leftStart = left.start;
					var leftEnd = left.end;

					//set the range that contains the part to be copied		
					range = new Range(leftStart.line - 1, leftStart.column, leftEnd.line - 1, leftEnd.column);

					//select it
					var selection = editor.getSelection();
					selection.setSelectionRange(range);

					//copy it to a variable
					left = editor.getCopyText();
				}
				
				//set the range that contains the part to be replaced		
				var rightStart = right.start;
				var rightEnd = right.end;
				
				range = new Range(rightStart.line - 1, rightStart.column, rightEnd.line - 1, rightEnd.column);

				//select it
				var selection = editor.getSelection();
				selection.setSelectionRange(range);

				//set the search options
				var options = {};
				options.wrap = false;
				options.range = range;
				
				//replace it
				if(this.isOperator(left) === false)
				{
					editor.insert(left);
				}
				else
				{
					var operators = this.getOperators();

					for(var o in operators)
					{
						options.needle = operators[o];
						if(editor.replace(left, options) === 1)
						{
							break;
						}
					}
				}
				
				editor.clearSelection();
			}
			else if(operator === 'before')
			{
				//set the range that contains the part to be moved		
				var range = new Range(leftStart.line - 1, leftStart.column, leftEnd.line - 1, leftEnd.column);

				//select the part that needs to be moved
				var selection = editor.getSelection();
				selection.setSelectionRange(range);
			
				//copy it to a variable
				var fragment = editor.getCopyText();

				//remove it from its original location
				editor.session.replace(range, '');
				
				//move cursor to the new position
				selection.moveCursorToPosition({row:rightStart.line - 1, column:rightStart.column});
				selection.clearSelection();
				
				//insert the text
				editor.insert('\n' + fragment + '\n');			
			}
/*		
		for(var action in refactoring)
		{
			action = refactoring[action];
			var left = facts[action.left];
			var newValue = action.new;
			var location = locations[action.old];
			var start = location.start;
			var end = location.end;

			//set the range that contains the token		
			var range = new Range(start.line - 1, start.column, end.line - 1, end.column);

			//set up the search options
			var options = {};
			options.needle = oldValue;
			options.wrap = false;
			options.range = range;
			
			//set up the search object
			var search = new Search();
			search.set(options);		

			//run the search and get the new range
			range = search.find(editor.getSession());

			//use the new range to select the token that is found
			var selection = editor.getSelection();
			selection.setSelectionRange(range);

			//replace token with new value
			editor.session.replace(range, newValue);		
			*/
		}

	}
	
	this.isOperator = function(o)
	{
		switch (o)
		{
			case '==':
			case '===':
			case '!=':
			case '!==':
			case '>':
			case '>=':
			case '<':
			case '<=':
			return true;
		}
		
		return false;
	}

	this.getOperators = function()
	{
		var o = [];
		o[0] = '===';
		o[1] = '!==';
		o[2] = '<=';
		o[3] = '>=';
		o[4] = '==';
		o[5] = '!=';
		o[6] = '<';
		o[7] = '>';
		return o;
	}
	
	//parses code and generates abstract syntax tree (AST)
	this.getAST = function(code, location, range, raw, tokens)
	{
		var options = {};
		options.loc = location;
		options.range = range;
		options.raw = raw;
		options.tokens = tokens;
		var ast = esprima.parse(code, options);
		return ast;
	}
	
	//analyses AST and populates the WM with facts (Fact Acquisition Component)
	this.getFacts = function(ast)
	{
		if(ast===null)
		{
			return;
		}
		
		if(typeof ast!=='object')
		{
			return;
		}
		
		if(typeof ast.type!=='string')
		{
			return;
		}

		var record = {};
		var subject = null;
		var relation = null;
		var property = null;
		var location = JSON.stringify(ast.loc);		

		switch(ast.type.toLowerCase())
		{
			case 'program':
				for(var element in ast.body)
				{
					this.getFacts(ast.body[element]);
				}
				break;
			case 'variabledeclaration':
				for(var element in ast.declarations)
				{
					if(arguments.length === 3)
					{
						this.getFacts(ast.declarations[element], arguments[1], arguments[2]);
					}
					else
					{
						this.getFacts(ast.declarations[element]);
					}
				}
				break;
			case 'variabledeclarator':
				if(ast.id !== null)
				{
					subject  = ast.id.name;
				}
				if(ast.init !== null)
				{
					relation  = 'is';
					if(ast.init.type !== null)
					{
						if(ast.init.type === 'ArrayExpression')
						{
							property  =  'array';
						}
						else
						{
							property  =  'var';
						}

						if(this.wm({'subject':subject},{'relation':relation},{'property':property},{'location':location}).count() === 0)
						{
							record = new Fact(subject, relation, property, location);
							this.wm.insert(record);
							this.addLocation(subject, relation, property, location);
						}
												
						if(property === 'array')
						{
							relation = 'length';
							
							if(ast.init.elements !== null)
							{
								property = ast.init.elements.length;
								record = new Fact(subject, relation, property, location);
								this.wm.insert(record);
							}					
						}
						else
						{
							this.getFacts(ast.init, subject, 'value');	
						}
						
						if(arguments.length === 3)
						{
							property = subject;
							subject = arguments[1];
							relation = arguments[2];
							record = new Fact(subject, relation, property, location);
							this.wm.insert(record);
						}
					}
				}
				break;
			case 'ifstatement':
				var structures = this.wm({'relation':'is'},{'property':'structure'}).select('subject');
				
				if(structures.toString() === '')
				{
					subject = 's1';
				}
				else
				{
					subject = 's' + (Number(structures[structures.length - 1].substring(1)) + 1);
				}
				relation = 'is';
				property = 'structure';
				record = new Fact(subject, relation, property, location);
				this.wm.insert(record);				
				this.getFacts(ast.body, subject, 'relates');
				this.addLocation(subject, relation, property, location);

				var ifs = this.wm({'relation':'is'},{'property':'if'}).select('subject');
				
				if(ifs.toString() === '')
				{
					subject = 'i1';
				}
				else
				{
					subject = 'i' + (Number(ifs[ifs.length - 1].substring(1)) + 1);
				}
				relation = 'is';
				property = 'if';
				record = new Fact(subject, relation, property, location);
				this.wm.insert(record);				
				this.getFacts(ast.alternate, subject, 'alternate');
				this.getFacts(ast.consequent, subject, 'consequent');
				this.getFacts(ast.test, subject, 'test');
				
				this.addLocation(subject, relation, property, location);
				break;
			case 'forstatement':
				var structures = this.wm({'relation':'is'},{'property':'structure'}).select('subject');
				
				if(structures.toString() === '')
				{
					subject = 's1';
				}
				else
				{
					subject = 's' + (Number(structures[structures.length - 1].substring(1)) + 1);
				}
				relation = 'is';
				property = 'structure';
				record = new Fact(subject, relation, property, location);
				this.wm.insert(record);				
				this.getFacts(ast.body, subject, 'relates');
				this.addLocation(subject, relation, property, location);

				var fors = this.wm({'relation':'is'},{'property':'for'}).select('subject');
				
				if(fors.toString() === '')
				{
					subject = 'f1';
				}
				else
				{
					subject = 'f' + (Number(fors[fors.length - 1].substring(1)) + 1);
				}
				relation = 'is';
				property = 'for';
				record = new Fact(subject, relation, property, location);
				this.wm.insert(record);				
				this.getFacts(ast.init, subject, 'init');
				this.getFacts(ast.test, subject, 'test');
				this.getFacts(ast.update, subject, 'update');
				this.getFacts(ast.body, subject, 'includes');
				
				this.addLocation(subject, relation, property, location);
				break;
			case 'whilestatement':
				var structures = this.wm({'relation':'is'},{'property':'structure'}).select('subject');
				
				if(structures.toString() === '')
				{
					subject = 's1';
				}
				else
				{
					subject = 's' + (Number(structures[structures.length - 1].substring(1)) + 1);
				}
				relation = 'is';
				property = 'structure';
				record = new Fact(subject, relation, property, location);
				this.wm.insert(record);				
				this.getFacts(ast.body, subject, 'relates');
				this.addLocation(subject, relation, property, location);

				var whiles = this.wm({'relation':'is'},{'property':'while'}).select('subject');
				
				if(whiles.toString() === '')
				{
					subject = 'w1';
				}
				else
				{
					subject = 'w' + (Number(whiles[whiles.length - 1].substring(1)) + 1);
				}
				relation = 'is';
				property = 'while';
				record = new Fact(subject, relation, property, location);
				this.wm.insert(record);				
				this.getFacts(ast.test, subject, 'test');
				this.getFacts(ast.body, subject, 'includes');
				
				this.addLocation(subject, relation, property, location);
				break;
			case 'binaryexpression':
				var operators = this.wm({'relation':'is'},{'property':'operator'}).select('subject');
				
				if(operators.toString() === '')
				{
					subject = 'o1';
				}
				else
				{
					subject = 'o' + (Number(operators[operators.length - 1].substring(1)) + 1);
				}
				relation = 'is';
				property = 'operator';
				record = new Fact(subject, relation, property, location);
				this.wm.insert(record);
				this.addLocation(subject, relation, property, location);
				relation = 'value';
				property = ast.operator;
				record = new Fact(subject, relation, property, location);
				this.wm.insert(record);
				if(arguments.length === 3)
				{
					property = subject;
					subject = arguments[1];
					relation = arguments[2];
					record = new Fact(subject, relation, property, location);
					this.wm.insert(record);
					this.getFacts(ast.left, arguments[1], arguments[2]);
					this.getFacts(ast.right, arguments[1], arguments[2]);
				}
				else
				{
					this.getFacts(ast.left);
					this.getFacts(ast.right);
				}
				break;
			case 'assignmentexpression':
				if(arguments.length === 3)
				{
					this.getFacts(ast.left, arguments[1], arguments[2]);
					this.getFacts(ast.right, arguments[1], arguments[2]);
				}
				else
				{
					this.getFacts(ast.left);
					this.getFacts(ast.right);
				}
				break;
			case 'memberexpression':
				if(ast.object.type === 'Identifier' && ast.property.type === 'Identifier')
				{
					subject = ast.object.name;
					relation = 'subscript';
					property = ast.property.name;
					
					if(this.wm({'subject':subject},{'relation':relation},{'property':property},{'location':location}).count() === 0)
					{
						record = new Fact(subject, relation, property, location);
						this.wm.insert(record);
					}
				}
				if(arguments.length === 3)
				{
					this.getFacts(ast.object, arguments[1], arguments[2]);
					this.getFacts(ast.property, arguments[1], arguments[2]);
				}
				else
				{
					this.getFacts(ast.object);
				}
				break;
			case 'identifier':
				if(arguments.length === 3)
				{
					subject = arguments[1];
					relation = arguments[2];
					property = ast.name;
					record = new Fact(subject, relation, property, location);
					this.wm.insert(record);
				}
				//else
				//{
				//	subject = ast.name;
				//	relation = 'is';
				//	property = ast.type.toLowerCase();
				//	record = new Fact(subject, relation, property, location);
				//	this.wm.insert(record);
				//}
				break;
			case 'literal':
				record = this.wm({'relation':'is'},{'property':'literal'},{'location':location});

				if(record.count() === 0)
				{
					var literals = this.wm({'relation':'is'},{'property':'literal'}).select('subject');

					if(literals.toString() === '')
					{
						subject = 'l1';
					}
					else
					{
						subject = 'l' + (Number(literals[literals.length - 1].substring(1)) + 1);
					}
					relation = 'is';
					property = 'literal';
					record = new Fact(subject, relation, property, location);
					this.wm.insert(record);
					this.addLocation(subject, relation, property, location);
					relation = 'value';
					property = ast.raw;
					record = new Fact(subject, relation, property, location);
					this.wm.insert(record);
				}
				else
				{
					subject = record.select('subject');
				}
				
				if(arguments.length === 3)
				{
					property = subject;
					subject = arguments[1];
					relation = arguments[2];
					record = new Fact(subject, relation, property, location);
					this.wm.insert(record);
				}
				//else
				//{
				//	subject = ast.value;
				//	relation = 'is';
				//	property = ast.type.toLowerCase();
				//	record = new Fact(subject, relation, property, location);
				//	this.wm.insert(record);
				//}
				break;
			case 'updateexpression':
				if(arguments.length === 3)
				{
					this.getFacts(ast.argument, arguments[1], arguments[2]);
				}
				break;
			case 'blockstatement':
				if(arguments.length === 3)
				{
					if(arguments[2] === 'relates')
					{
						var blocks = this.wm({'relation':'is'},{'property':'block'}).select('subject');
						
						if(blocks.toString() === '')
						{
							subject = 'b1';
						}
						else
						{
							subject = 'b' + (Number(blocks[blocks.length - 1].substring(1)) + 1);
						}
						relation = 'is';
						property = 'block';
						record = new Fact(subject, relation, property, location);
						this.wm.insert(record);				
						this.addLocation(subject, relation, property, location);

						for(var element in ast.body)
						{
							this.getFacts(ast.body[element], subject, 'includes');
						}
						
						property = subject;
						subject = arguments[1];
						relation = arguments[2];
						record = new Fact(subject, relation, property, location);
						this.wm.insert(record);				
					}
					else
					{
						for(var element in ast.body)
						{
							this.getFacts(ast.body[element], arguments[1], arguments[2]);
						}
					}
				}
				break;
			case 'newexpression':
				if(arguments.length === 3)
				{
					this.getFacts(ast.arguments, arguments[1], arguments[2]);
					this.getFacts(ast.callee, arguments[1], arguments[2]);
				}
				else
				{
					this.getFacts(ast.arguments);
					this.getFacts(ast.callee);
				}
				break;
			case 'expressionstatement':
				if(arguments.length === 3)
				{
					this.getFacts(ast.expression, arguments[1], arguments[2]);
				}
				else
				{
					this.getFacts(ast.expression);
				}
				break;
			case 'callexpression':
				if(arguments.length === 3)
				{
					for(var element in ast.arguments)
					{
						this.getFacts(ast.arguments[element], arguments[1], arguments[2]);
					}
				}
				else
				{
					for(var element in ast.arguments)
					{
						this.getFacts(ast.arguments[element]);
					}
				}
				break;
			default:
		}
	}
	
	this.addLocation = function(subject, relation, property, location)
	{
		if(relation === 'is')
		{
			relation = 'location';
			property = location;
//			subject = ;
			record = new Fact(subject, relation, property, location);
			this.wm.insert(record);				
		}	
	}
	
	this.getPreviousHelp = function(name)
	{
		return this.journal
		(
			function()
			{
				return (this.type === 'help' && this.data.misconception === name && this.data.state === 'fired');
			}
		).count();
	}
}

function onlyUnique(value, index, self)
{ 
	return self.indexOf(value) === index;
}

function moreHelp(object, id)
{
	//disable all the buttons so that the user cannot use them for more help for the same or other problems
	var buttons = document.getElementsByTagName('input');
	
	for(var button in buttons)
	{
		if(buttons[button].type === 'button')
		{
			button = buttons[button];
			
			if(button.value === 'more help...')
			{
				button.disabled = true;
			}
		}
	}

	//find out how much help has been given in the past
	var previousHelp = reasoner.getPreviousHelp(id);

	//update the journal  - tell it that this rule fired
	reasoner.updateJournal(id, currentUser, 'fired', reasoner.currentCodeID, 0);

//display the journal in the console
//console.table(reasoner.journal().select('data'));
	
	//get a reference to the enclosing <TR> element
	var row = object.parentNode.parentNode;

	//display issue+documentation
	row = row.nextSibling.nextSibling;
	displayRow(row);
	row = row.nextSibling;
	displayRow(row);

	if(previousHelp === 0)
	{
		return;
	}

	//display +solution
	row = row.nextSibling;
	displayRow(row);

	if(previousHelp === 1)
	{
		return;
	}
	
	//display +visualisation
	row = row.nextSibling;
	displayRow(row);
	
	if(previousHelp === 2)
	{
		return;
	}

	//display +refactoring
	row = row.nextSibling;
	
	if(row !== null)
	{
		displayRow(row);	
	}
}

function displayRow(row)
{
		if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1)
		{
			row.style.display = 'table-row';
		}
		else
		{
			row.style.display = 'inline';
		}
}

function hideRow(row)
{
	row.style.display = 'none';
}

function deleteEntry(object, id)
{
	var confirmation = confirm("This action will remove the misconception from the list.\nWould you like to continue?");
	
	if (confirmation === false)
	{
		return;
	}

	//get a reference to the enclosing <TR> element
	var row = object.parentNode.parentNode;

	//get a reference to the parent node
	var parent = row.parentNode;
	
	//gather rows to be removed
	var rows = [];

	while(true)
	{
		if(row == null)
		{
			break;
		}
		
		rows[rows.length] = row;

		if(row.firstChild.firstChild.tagName === 'HR')
		{
			break;
		}
		
		row = row.nextSibling;
	}
	
	//remove rows from parent
	for(row in rows)
	{
		parent.removeChild(rows[row]);
	}
	
	reasoner.updateJournal(id, currentUser, 'irrelevant', reasoner.currentCodeID, 0);
//	console.table(reasoner.journal().select('data'));
}


//definition for Fact
//============================================================
	
//constructor
function Fact(subject, relation, property, location)
{
	this.subject = subject;
	this.relation = relation;
	this.property = property;
	this.location = location;
}
