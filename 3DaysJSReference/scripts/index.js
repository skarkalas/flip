var $j = jQuery.noConflict();

$j(document).ready
(
	function()
	{
	
		loadDoc('main');	
	}
);

function loadDoc(doc)
{
	var url = '/u/15318052/LKLProjects/3DaysJSReference/docs/' + doc + '.htm';
	
	$j.get
	(
		url,
		function (data)
		{
			$j('body').html(data);
		}
	);
}
