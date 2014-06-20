var editor=null;

//change references to ace constructors
var Search = ace.require('ace/search').Search;
var Range = ace.require('ace/range').Range;
//var HashHandler = ace.require('ace/keyboard/hash_handler').HashHandler

var text=null;
var graphics=null;
var reasoner = null;
var journal = null;
var codebase = null;

var $j = jQuery.noConflict();
var displayVisualisation = null;
var recordStudentOpinion = null;
var getMoreHelp = null;
var currentUser = null;
var automaticSupport = null; 
var stopDebugging = null;
var codeVersion = Date.now();

$j(document).ready
(
	function()
	{
		//setup ajax
		$j.ajaxSetup({cache: true});
/*		
		//load facebook JS SDK
		$j.getScript
		(
			'//connect.facebook.net/en_UK/all.js',
			function()
			{
				FB.init
				(
					{
						appId: '629141253835751',
						status: true,
						cookie: true,
						xfbml: true
					}
				);     

				FB.Event.subscribe
				(
					'auth.authResponseChange',
					function(response)
					{
						updateUserStatus(response);
					}
				);
				
				FB.getLoginStatus
				(
					function(response)
					{
						updateUserStatus(response);
					}
				);
			}
		);
*/
		var users = [];
		users['user1'] = '123';
		users['user2'] = '123';
		users['user3'] = '123';
		users['user4'] = '123';
		users['user5'] = '123';
		users['user6'] = '123';
		users['user7'] = '123';
		users['user8'] = '123';
		users['user9'] = '123';
		users['user10'] = '123';
		users['user100'] = '123';

		function startSupport()
		{
			if(automaticSupport !== null)
			{
				return;
			}
			
			automaticSupport = setTimeout(analyseCode, 3000);
			console.log('support started');
		}
		
		function setSYSMessage(message)
		{	
			$j('#sysMessage').text(message);
		}

		function restartSupport()
		{
			if(automaticSupport === null)
			{
				return;
			}
			
			clearTimeout(automaticSupport);
			automaticSupport = setTimeout(analyseCode, 3000);
			console.log('support restarted');
		}
		
		function stopSupport()
		{
			if(automaticSupport === null)
			{
				return;
			}
			
			clearTimeout(automaticSupport);
			automaticSupport = null;
			setSYSMessage('');
			console.log('support stopped');			
		}
		
		$j("#loginIcon").click
		(
			function()
			{
				var answer = null;
				
				if(currentUser === null)
				{
					dialog.dialog("open");
				}
				else
				{
					answer = confirm('Would you like to logout?');
					
					if(answer === true)
					{
						currentUser = null;
						$j("#fbUser").text('You are not logged in');
						
						if(typeof sessionStorage !== "undefined")
						{
							sessionStorage.removeItem('currentUser');
						}
						
						stopSupport();
					}
				}
			}		
		);
		
		var cancel = function()
		{
			$j("input").val("");
            dialog.dialog("close");
        }

        var submit = function()
		{
			var username = $j("input#username").val();
			var password = $j("input#password").val();

			if(users[username] === password)
			{
				currentUser = username;
				$j("#fbUser").text('You are logged in as ' + username);
				
				if(typeof sessionStorage !== "undefined")
				{
					sessionStorage.currentUser = username;
				}
				
				startSupport();
				
				dialog.dialog("close");					
			}
			else
			{
				alert("incorrect password");
			}
        }

		//function to check for login status
		function checkLoginStatus()
		{
			if(typeof sessionStorage === "undefined")
			{
				return;
			}		

			if(typeof sessionStorage.currentUser === "undefined")
			{
				return;
			}

			if(sessionStorage.currentUser === null)
			{
				return;
			}
			
			currentUser = sessionStorage.currentUser;
			$j("#fbUser").text('You are logged in as ' + currentUser);
			startSupport();
		}
		
		checkLoginStatus();
		
		//set up dialog for displaying student's work
		var dialog=$j("#dialog");
		dialog.dialog
		(
			{
				bgiframe: true,
				autoOpen: false,
				height: 250,
				width: 400,
				title: "Password",
				show:
				{
					effect: "blind",
					duration: 1000
				},
				hide:
				{
					effect: "explode",
					duration: 1000
				},
				resizable: false,
				modal: true,
				closeOnEscape: true,
				buttons:
				{
					"Submit": submit,
					"Cancel": cancel
				}
			}
		);
		
		function updateUserStatus(response)
		{
			var fbUser = $j("#fbUser");
			var fbApp = $j("#fbApp");
			var status = response.status;

			if (status === 'not_authorized')
			{
				fbUser.text('You are logged in');
				fbApp.text('The application is not authenticated');
			}
			if (status === 'unknown')
			{
				fbUser.text('You are not logged in');
				fbApp.text('The application is not authenticated');
			}	
			else
			{
				var uid = response.authResponse.userID;
				var query = FB.Data.query('select name from user where uid={0}', uid);
				query.wait
				(
					function(rows)
					{	
						fbUser.text('You are logged in as ' + rows[0].name);
						fbApp.text('The application is authenticated');
					}
				);
			}
		}
		
		text=new Text();
		text.init();
		text.setTextArea('textoutputarea');
		graphics=new Graphics();
		graphics.init('canvas');
		editor=ace.edit("editor");
		editor.setTheme("ace/theme/eclipse");
		editor.getSession().setMode("ace/mode/javascript");
		editor.getSession().on
		(
			'change',
			function(e)
			{
				codeVersion = Date.now();
				restartSupport();
			}
		); 
		
		journal = TAFFY();				//empty database for journal
		codebase = TAFFY();				//empty database for code
		reasoner = new RBReasoner();
		reasoner.init(editor, journal, codebase);
	
		var browserWindow=$j(window);
		var htmlDocument=$j(document);
//		var workviewcontainer=$j("#workviewcontainer");
//		var codeviewcontainer=$j("#codeviewcontainer");
//		var outputviewcontainer=$j("#outputviewcontainer");
		var editorview=$j("#editorview");
		var editorcontainer=$j("#editor");
		var outputview=$j("#outputview");
		var output=$j("#output");
		var canvas=$j("#canvas");
		var cube=$j("#cube");
		var front=$j(".front");
		var back=$j(".back");
		var right=$j(".right");
		var textoutput=$j("#textoutput");
		var debugoutput=$j("#debugoutput");
		var helpoutput=$j("#helpoutput");
		var assessmentoutput=$j("#assessmentoutput");
		var miscoutput=$j("#miscoutput");
		var menu=$j("#menu");
		var dockmenucontainer=$j("#dockmenucontainer");
		
		function resizeContainers()
		{
			//var half=Math.floor(workviewcontainer.width()/2)-5;
			//codeviewcontainer.width(half);
			//outputviewcontainer.width(half);
		
			cube.width(output.width());
			cube.height(output.height());
			graphics.resize(output.width(),output.height());
			textoutput.width(output.width());
			textoutput.height(output.height());
			debugoutput.width(output.width());
			debugoutput.height(output.height());
			helpoutput.width(output.width());
			helpoutput.height(output.height());
			assessmentoutput.width(output.width());
			assessmentoutput.height(output.height());
			miscoutput.width(output.width());
			miscoutput.height(output.height());

//var f = function(){outputview.accordion('option', 'active', 0);};
//setTimeout(f, 1000);
			//positionDockMenu();
		}
		
		function positionDockMenu()
		{
			var outputPosition=outputviewcontainer.offset();
			var outputWidth=outputviewcontainer.width();
			var outputHeight=outputviewcontainer.height();
			
			var menuContainer=dockmenucontainer.offset();
			var menuWidth=dockmenucontainer.width();
			var menuHeight=dockmenucontainer.height();
			
			var left=outputPosition.left+(outputWidth/2-menuWidth/2)-20;
			var top=outputPosition.top+outputHeight+20;

			dockmenucontainer.css({left:left+'px'});
			dockmenucontainer.css({top:top+'px'});
		}
		
		menu.menu
		(
			{
				select: function(event, ui)
				{
					if(currentUser === null)
					{
						alert('Please login before you use the system');
						return;
					}

					//reset the automatic support
					restartSupport();
			
					var action=ui.item.text();
					
					if(action.toLowerCase()==='execute code')
					{
						execute();
					}
					else if(action.toLowerCase()==='syntax issues')
					{						
						if(debugoutput.html() === '')
						{
							alert('There is no info about syntax issues available');
							return;
						}
						
						displayDebug();
						stopSupport();
					}
					else if(action.toLowerCase()==='get help')
					{
						if(helpoutput.html() === '')
						{
							alert('There is no help available');
							return;
						}
						
						displayHelp();
						stopSupport();
					}
					else if(action.toLowerCase()==='assess')
					{
						displayAssessment();
					}
					else if(action.toLowerCase()==='misc')
					{
						displayMisc();
					}
					else if(action.toLowerCase()==='report')
					{
						reportProblemInCode();
					}
				}
			}
		);
		
		function reportProblemInCode()
		{
			var confirmation = confirm("This action will report the currently selected code in the editor as problematic.\nWould you like to continue?");
			
			if (confirmation === false)
			{
				return;
			}		
			
			var code = getCode();

			if(typeof code === 'undefined' || code.trim() === "")
			{
				alert("There is no code to report.");
				return;
			}
			
			//insert code into the codebase
			var record = {};
			record.code = code;
			record.id = Date.now();
			codebase.insert(record);		
			alert("The issue has been reported. Thank you.");
		}

		//define visualiser popup window
		var popup = null;
		
		//define message handler (the service sends a message after the popup is ready to be used)
		function receiveMessage(event)
		{
			//if the origin of the message is not what is expected stop
			if (event.origin === "http://medea:8888")
			{
				//get the message
				var message = event.data;
				
				//prepare the code
				//var code = "var x=5;\nvar y=7;\nvar z=x+y;\nvar l=z;\nconsole.log(z);"
				var code = getCode();

				//if the message says that the service is available post a new message with the code
				if(message === 'jtutor:ok')
				{
					popup.postMessage(code, "http://medea:8888");
				}
			}
		}

		window.addEventListener("message", receiveMessage, false);

		function visualise()
		{
			var code=getCode();
				
			if(code==="")
			{
				alert("There is no code to visualise.");
				return;
			}

			//create a popup window pointing at the service
			popup = window.open('http://medea:8888', '_blank', 'resizable=no, left=0,top=0,width=' + screen.availWidth + ',height=' + screen.availHeight);
		}
		
		displayVisualisation = visualise;
		
		stopDebugging = function()
		{
			//remove debug info
			debugoutput.html('');
		
			//start automatic help
			startSupport();
		
			//flip cube and display text facet
			displayText();
		}
		
		function displayGraphics()
		{
			graphics.clear();
			cubeChange('show-front');
			updateDockMenu('graphics-front');
		}

		function displayText()
		{
			cubeChange('show-back');
			updateDockMenu('text-back');
		}

		function displayDebug()
		{
			cubeChange('show-right');
			updateDockMenu('debug-right');
		}

		function displayHelp()
		{
			cubeChange('show-left');
			updateDockMenu('help-left');
		}

		function displayAssessment()
		{
			cubeChange('show-top');
			updateDockMenu('assessment-top');
		}

		function displayMisc()
		{
			cubeChange('show-bottom');
			updateDockMenu('misc-bottom');
		}
		
		browserWindow.resize
		(
			function()
			{
				resizeContainers();
			}
		);
					
		var icons=
		{
			header: "ui-icon-circle-arrow-e",
			activeHeader: "ui-icon-circle-arrow-s"
		};
		
		//create the views
		var menuview=$j("#menuview").accordion
		(
			{
				heightStyle: "fill",
				collapsible: false,
				icons: icons
			}
		);

		var codeview=$j("#codeview").accordion
		(
			{
				heightStyle: "fill",
				collapsible: false,
				icons: icons,
				beforeActivate: function(event, ui) 
				{
					restartSupport();
				}
			}
		);

		//codeview.accordion('option', 'active', 1);
		
		var outputview=$j("#outputview").accordion
		(
			{
				heightStyle: "fill",
				collapsible: false,
				icons: icons,
				beforeActivate: function(event, ui) 
				{
					restartSupport();
				}
			}
		);

		//outputview.accordion('option', 'active', 1);
		
		$j("input:checkbox").trigger('change');
		$j("select").trigger('change');
		
		var panelClassName = 'show-front';

		function cubeChange(nextPanelClassName)
		{
			/*	possible values
			**	'show-front'
			**	'show-back'
			**	'show-right'
			**	'show-left'
			**	'show-top'
			**	'show-bottom'
			**/

			var currentClass=cube.attr('class');

			if(typeof currentClass==='undefined')
			{
				currentClass='show-front';
			}

			var delimiter=currentClass.indexOf("-");
			currentClass=currentClass.substring(delimiter+1);

			var nextClass=nextPanelClassName;
			delimiter=nextClass.indexOf("-");
			nextClass=nextClass.substring(delimiter+1);
			
			if(currentClass===nextClass)
			{
				return;
			}
			
			$j('.'+nextClass).css('display','block');

			updateOutputLabel(nextClass);
			cube.removeClass(panelClassName);
			panelClassName = nextPanelClassName;
			cube.addClass(panelClassName);
			
			$j('.'+currentClass).css('display','none');			
		}
		
		function updateOutputLabel(facet)
		{
			var element=$j('div#outputview h3').first();

			if(facet==='front')
			{
				element.text('Output - Graphics');
			}
			else if(facet==='back')
			{
				element.text('Output - Text');
			}
			else if(facet==='right')
			{
				element.text('Output - Debug');
			}
			else if(facet==='left')
			{
				element.text('Output - Help');		
			}
			else if(facet==='top')
			{
				element.text('Output - Assessment');
			
			}
			else
			{
				element.text('Output - Misc');			
			}
		}
				
		function execute()
		{
/*			if(currentUser === null)
			{
				alert('Please login before you use the system');
				return;
			}
*/			
			var code=getCode();
				
			if(code==="")
			{
				alert("There is no code to execute.");
				return;
			}

			if(code.match(/graphics\./)===null)
			{
				displayText();
			}
			else
			{
				displayGraphics();
			}
			
			try
			{
				executeCode(code);
			}
			catch(e)
			{
				var html = prepareSyntaxErrorReport(e);
				debugoutput.html(html);
				displayDebug();
				return;
			}
		}
		
		function prepareSyntaxErrorReport(e)
		{
			var arrayError = e.toString().split(':');
			var errorType = arrayError[0];
			var errorDescription = arrayError[1];

			var html="";
			html+="<table id='errorreport'>";
			html+="<caption>Error Report: " + new Date().toLocaleString() + "</caption>";
			html+="<tr>";
			html+="<td>";
			html+="<span>Error Type:</span>";
			html+="</td>";
			html+="<td>";
			html+="<cite>" + errorType + "</cite>";
			html+="</td>";
			html+="</tr>";
			html+="<tr>";
			html+="<td>";
			html+="<span>Error:</span>";
			html+="</td>";
			html+="<td class='evidence'>";
			html+="<pre>" + errorDescription + "</pre>";
			html+="</td>";
			html+="</tr>";
			html+="</table>";
			return html;
		}
			
		function analyseCode()
		{
			//clear reasoner from previous results
			reasoner.clearMemory();

			//clear the output from previous analysis
			debugoutput.html('');
			helpoutput.html('');
			
			var code=getCode();
				
			if(code==="")
			{
				console.log("There is no code to analyse.");
				restartSupport();
				return;
			}
			
			//insert code into the codebase
			reasoner.updateCurrentCode();

			var level2OK = getLevel2Data(code);
			var debugreport = null;
			var helpreport = null;
			
			if (level2OK === null)
			{
				console.log('The code cannot be analysed!, Operation stopped');
				restartSupport();
				return;
			}
			else if (level2OK === false)
			{
				debugreport = reasoner.getDebugReport();
				
				if(debugreport !== '')
				{
					debugoutput.html(debugreport);
					setSYSMessage('Syntax issues info is available');
					console.log('The code has syntax issues! debugging needed');
				}
				else
				{
					helpreport = reasoner.getHelpReport(0, 1, 'system');
					
					if(helpreport !== '')
					{
						helpoutput.html(helpreport);
						setSYSMessage('Help is available');
						console.log('There is help for the code!');
					}			
				}
				
				restartSupport();
				return;
			}
			
			setSYSMessage('');
			restartSupport();
return;			

			var level3OK = getLevel3Data();
			
			//var level3OK = checkLevel3();
			
			if(level2OK === false || level3OK === false)
			{
				displayHelp();
				return;
			}
			
			
/*			
			if(code.match(/graphics\./)===null)
			{
				displayText();
			}
			else
			{
				displayGraphics();
			}

			
			
			try
			{
				executeCode(code);
			}
			catch(e)
			{
				alert('There are syntax errors that need to be resolved!');
				var html = prepareSyntaxErrorReport(e);
				debugoutput.html(html);
				displayDebug();
				return;
			}
*/			
			//executeCode(code);
		}
		
		//returns true:(code is fine), false:(code has issues), null:(code cannot be analysed)
		function getLevel2Data(code)
		{
			var options = getJSLintOptions();
			var success = null;

			try
			{
				success = checkCode(code, options);
			}
			catch(e)
			{
				console.error(e);
				return null;
			}
			
			if(success === true)
			{
				return true;
			}
			
			//feed the reasoner with the results
			var data = JSLINT.data();
			var errors = data.errors;
			reasoner.setLevel2Feedback(errors);
			
			return false;
		}

		//returns true:(code is fine), false:(code has issues), null:(code cannot be analysed)
		function getLevel3Data()
		{
			var problems = null;
			
			try
			{
				problems = reasoner.getSupport();
			}
			catch(e)
			{
				console.error(e);
				return null;
			}
			
			if(problems === false)
			{
				return true;
			}
			
			return false;
		}
		
		function checkLevel3()
		{
			if(reasoner.getSupport() === false)
			{
				return true;
			}
			
			var report = reasoner.getMisconceptionsReport();
			helpoutput.html(helpoutput.html() + '<br/>' + report);
		}
		
		function checkLevel2(code)
		{
			var options=getJSLintOptions();
			
			if(checkCode(code,options) === false)
			{
				var report=getQualityReport();
				helpoutput.html(report);
				return false;
			}
			
			return true;
		}
		
		function getJSLintOptions()
		{
			var divs=$j(".switch");
			var options={};
			
			divs.each
			(
				function(index)
				{
					var radio=$j(this).find("input:radio:checked");
					var name=radio.attr("name");
					var value=radio.val();
					
					if(value!=='default')
					{
						options[name]=(value=='on'?true:false);
					}
				}
			);
			
			divs=$j(".jslintsettings");

			divs.each
			(
				function(index)
				{
					var text=$j(this).find("input:text");
					var name=text.attr("name");
					var value=text.val();
					
					options[name]=value;
				}
			);
			
			var predef={};
			
			//declare graphics object and public members-functions as globals
			predef.graphics=true;
			predef.text=true;
			
			options['predef']=predef;

			return options;		
		}
	
		resizeContainers();
		displayGraphics();			//default
		
		// set up the options to be used for jqDock...
		var dockOptions =
		{
			align: 'top', 	// horizontal menu, with expansion UP/DOWN from the middle
			fadeIn: 2000, 		// fade in over 2 seconds
			labels: false,
			size: 48,
			sizeMax: 90
		};
		
		// ...and apply...
		$j('#dockmenu').jqDock(dockOptions);
		
		$j('div#dockmenu > img').each
		(
			function(index)
			{
				$j(this).click
				(
					function()
					{
						var facet=$j(this).attr('id');
						facet=facet.substring(facet.indexOf('-'));
						cubeChange('show'+facet);
						restartSupport();
					}
				);
			} 
		);

		getMoreHelp = function(object, name, priority)
		{	
			var level = reasoner.getCurrentRuleLevel(name);
			var buttonPressed = object.value;
			var helpreport = '';
			var row = null;

			if(buttonPressed === 'That is not enough. Tell me more.')
			{
				//update the journal
				reasoner.updateJournal(name, currentUser, 'more', reasoner.currentCodeID, level, 'user');
			
				//get a reference to the enclosing <TR> element
				var row = object.parentNode.parentNode;
				
				//get a reference to the documentation row
				row = row.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling;
				var done = false;

				if(row.style.display === 'none')
				{
					displayRow(row);
					reasoner.updateJournal(name, currentUser, 'fired', reasoner.currentCodeID, 2, 'user');
					done = true;
				}

				//get a reference to the visualisation row
				row = row.nextSibling;
				
				if(row.style.display === 'none' && done === false)
				{
					displayRow(row);
					reasoner.updateJournal(name, currentUser, 'fired', reasoner.currentCodeID, 3, 'user');
					done = true;
				}

				if(done === false)
				{
					reasoner.updateJournal(name, currentUser, 'fired', reasoner.currentCodeID, 4, 'user');				
					alert('I cannot provide more help on this issue.\nPlease call the tutor.');
					
					//update web db
					updateWebDatabase();
					
					//remove help info
					helpoutput.html('');
				
					//start automatic help
					startSupport();
				
					//flip cube and display text facet
					displayText();					
					
					return;
				}

				//get a reference to the hr and question row and display them
				row = row.nextSibling;
				displayRow(row);
				row = row.nextSibling;
				displayRow(row);

				//get a reference to the hr and question row and hide them
				row = row.nextSibling;
				hideRow(row);
				row = row.nextSibling;
				hideRow(row);
				row = row.nextSibling;
				hideRow(row);
				row = row.nextSibling;
				hideRow(row);
			}
			else
			{
				//update the journal
				reasoner.updateJournal(name, currentUser, 'other', reasoner.currentCodeID, level, 'user');

				helpreport = reasoner.getHelpReport(priority, 1, 'user');
				
				if(helpreport === '')
				{
					alert('I am afraid there is no more help available.\n Please call the tutor.');
					
					//update web db
					updateWebDatabase();
					
					//remove help info
					helpoutput.html('');
				
					//start automatic help
					startSupport();
				
					//flip cube and display text facet
					displayText();
				
					return;
				}
				
				helpoutput.html(helpreport);
			}
			
		console.table(reasoner.agenda().get());
		console.table(journal().get());
/*
			if(buttonPressed === 'no')
			{
				helpreport = reasoner.getHelpReport(priority);
				
				if(helpreport === '')
				{
					alert('No more help available');
					
					//flip cube and display text facet
					displayText();
					
					return;
				}
				
				helpoutput.html(helpreport);
				return;
			}
*/			
		}
		
		function updateWebDatabase()
		{
			//update web service with data
			
			
			//empty journal and code db
			journal().remove();
			codebase().remove();
		}
		
		recordStudentOpinion = function(object, ruleName)
		{
			var level = reasoner.getCurrentRuleLevel(ruleName);
			var buttonPressed = object.value.toLowerCase();
			var helpreport = '';
			
			//go back to flip
			if(buttonPressed === 'yes')
			{
				//update the journal
				reasoner.updateJournal(ruleName, currentUser, 'yes', reasoner.currentCodeID, level, 'user');

				//update web db
				updateWebDatabase();
				
				//remove help info
				helpoutput.html('');
			
				//start automatic help
				startSupport();
			
				//flip cube and display text facet
				displayText();
				
				return;
			}

			//update the journal
			reasoner.updateJournal(ruleName, currentUser, 'no', reasoner.currentCodeID, level, 'user');

			//get a reference to the enclosing <TR> element
			var row = object.parentNode.parentNode;
			
			//hide the current row and the previous one (hr)
			hideRow(row);
			row = row.previousSibling;
			hideRow(row);

			//display hr and next question
			row = row.nextSibling.nextSibling;
			displayRow(row);
			row = row.nextSibling;
			displayRow(row);
			row = row.nextSibling;
			displayRow(row);
			row = row.nextSibling;
			displayRow(row);
			
		console.table(reasoner.agenda().get());
		console.table(journal().get());


/*
			if(buttonPressed === 'no')
			{
				helpreport = reasoner.getHelpReport(priority);
				
				if(helpreport === '')
				{
					alert('No more help available');
					
					//flip cube and display text facet
					displayText();
					
					return;
				}
				
				helpoutput.html(helpreport);
				return;
			}
*/					
		}
		
		function updateDockMenu(facetSelected)
		{
			$j('#'+facetSelected).jqDock('expand');
			window.setTimeout(function(){$j('div#dockmenu').jqdock('idle').jqdock('nudge');}, 600);
		}

		fixErrorLog();
	}
);


function fixErrorLog()
{
	if (typeof console==="undefined")
	{
		return;
	}

	var oldLog=console.error;
	var lastLog=null;
	
	console.error=function()
	{
		//process arguments within the application
		lastLog=arguments;
		var message=lastLog[0];
		message=message.replace('%s',lastLog[1]);
		message=message.replace('%s',lastLog[2]);
		
		var data=document.getElementById('errorreport');

		if(data!==null)
		{
			var row=data.insertRow(-1);
			var cell0=row.insertCell(0);
			cell0.innerHTML='<span>'+message+'</span>';
		}

		//call the regular log command
		oldLog.apply(console, arguments);
	};
}

function getQualityReport()
{
	var data=JSLINT.data();
	var errors=data.errors;
	var html="";

	html+="<table id='level2report'>";
	html+="<caption>Level 2 Report: "+new Date().toLocaleString()+"</caption>";

	for(var i=0; i<errors.length; i++)
	{
		if(errors[i]!=null)
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
	
	html+="</table>";
	
	return html;
}

function checkCode(code,options)
{
	return JSLINT(code,options);
}
		
function executeCode(code)
{
	eval(code);
}

function getCode()
{
	//get highlighted text
	var code=editor.getCopyText();

	if(code.trim() === '')
	{
		//get code that is not highlighted
		code=editor.getSession().getValue();
	}

	if(code.trim() === '')
	{
		return '';
	}

	return code;
}

function setTheme(control)
{
	editor.setTheme(control.value);
}

function setFontSize(control)
{
	editor.setFontSize(parseInt(control.value));
}

function setFolding(control)
{
	editor.session.setFoldStyle(control.value);
    editor.setShowFoldWidgets(control.value!=="manual");
}

function setSoftWrap(control)
{
	var session=editor.session;
	var renderer=editor.renderer;
	
    switch (control.value)
	{
		case "off":
			session.setUseWrapMode(false);
			renderer.setPrintMarginColumn(80);
			break;
		case "free":
			session.setUseWrapMode(true);
			session.setWrapLimitRange(null, null);
			renderer.setPrintMarginColumn(80);
			break;
		default:
			session.setUseWrapMode(true);
			var col=parseInt(control.value, 10);
			session.setWrapLimitRange(col, col);
			renderer.setPrintMarginColumn(col);
	}
}

function setSelectStyle(control)
{
	editor.setSelectionStyle(control.checked?"line":"text");
}

function setHighlightActive(control)
{
	editor.setHighlightActiveLine(control.checked);
}

function setShowHidden(control)
{
	editor.setShowInvisibles(control.checked);
}

function setDisplayIndentGuides(control)
{
	editor.setDisplayIndentGuides(control.checked);
}

function setShowHscroll(control)
{
	editor.renderer.setHScrollBarAlwaysVisible(control.checked);
}

function setAnimateScroll(control)
{
	editor.setAnimatedScroll(control.checked);
}

function setShowGutter(control)
{
	editor.renderer.setShowGutter(control.checked);
}

function setShowPrintMargin(control)
{
	editor.renderer.setShowPrintMargin(control.checked);
}

function setSoftTab(control)
{
	editor.session.setUseSoftTabs(control.checked);
}

function setHighlightSelectedWord(control)
{
	editor.setHighlightSelectedWord(control.checked);
}

function setEnableBehaviours(control)
{
	editor.setBehavioursEnabled(control.checked);
}

function setFadeFoldWidgets(control)
{
	editor.setFadeFoldWidgets(control.checked);
}

function setElasticTabStops(control)
{
	editor.setOption("useElasticTabstops", control.checked);
}

function setISearch(control)
{
	editor.setOption("useIncrementalSearch", control.checked);
}

function setHighlightToken(control)
{
	if (editor.tokenTooltip && !control.checked)
	{
		editor.tokenTooltip.destroy();
		delete editor.tokenTooltip;
	}
	else if (control.checked)
	{
		editor.tokenTooltip=new TokenTooltip(editor);
    }
}

function setReadOnly(control)
{
	editor.setReadOnly(control.checked);
}

function readDoc(misconceptionName)
{
	var url = 'https://dl.dropboxusercontent.com/u/15318052/LKLProjects/3DaysJSReference/' + misconceptionName + '.htm';
	var menu = $j("#codeview");
	
	//if the documentation tab is not visible, display it
	var index = menu.accordion('option','active');
	
	if(index === 0)
	{
		menu.accordion('option', 'active', 1);
	}
	
	$j.get(url, function (data)
	{
		$j('#docRef').html(data);
	});
}
