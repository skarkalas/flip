var editor=null;

//change references to ace constructors
var Search = ace.require('ace/search').Search;
var Range = ace.require('ace/range').Range;

var text=null;
var graphics=null;
var reasoner = null;

var $j = jQuery.noConflict();

$j(document).ready
(
	function()
	{
		//setup ajax
		$j.ajaxSetup({cache: true});
		
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

		function updateUserStatus(response)
		{
			var fbUser = $j("#fbUser");
			var fbApp = $j("#fbApp");
			
			if (response.status === 'connected')
			{
				var uid = response.authResponse.userID;
				var accessToken = response.authResponse.accessToken;
				fbUser.text(uid);
				fbApp.text('yes');
			}
			else if (response.status === 'not_authorized')
			{
				fbUser.text(uid);
				fbApp.text('no');
			}
			else
			{
				fbUser.text('none');
				fbApp.text('no');
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
		reasoner = new RBReasoner();
		reasoner.init(editor);
	
		var browserWindow=$j(window);
		var htmlDocument=$j(document);
		var workviewcontainer=$j("#workviewcontainer");
		var codeviewcontainer=$j("#codeviewcontainer");
		var outputviewcontainer=$j("#outputviewcontainer");
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
			var half=Math.floor(workviewcontainer.width()/2)-5;
			codeviewcontainer.width(half);
			outputviewcontainer.width(half);
			
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
			positionDockMenu();
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
					var action=ui.item.text();
					
					if(action.toLowerCase()==='execute')
					{
						execute();
					}
					else if(action.toLowerCase()==='get help')
					{
						analyseCode();
					}
					else if(action.toLowerCase()==='assess')
					{
						displayAssessment();
					}
					else if(action.toLowerCase()==='misc')
					{
						displayMisc();
					}
					else
					{
						visualise();
					}
				}
			}
		);

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
			popup = window.open('http://medea:8888', '_blank', "width=1000,height=800");
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
				icons: icons
			}
		);

		var outputview=$j("#outputview").accordion
		(
			{
				heightStyle: "fill",
				collapsible: false,
				icons: icons
			}
		);
		
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

			executeCode(code);
		}
		
		function analyseCode()
		{
			var code=getCode();
				
			if(code==="")
			{
				alert("There is no code to analyse.");
				return;
			}

			var level2OK = checkLevel2(code);
			var level3OK = checkLevel3();
			
			if(level2OK === false || level3OK === false)
			{
				displayHelp();
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

			executeCode(code);
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
					}
				);
			} 
		);
		
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
		return;
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
