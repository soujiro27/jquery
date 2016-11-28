$(function(){

$.ajax({
	url:'http://api.tvmaze.com/shows',
	success:function(data){template(data);}
});

$('form').on('submit',busqueda);

});


function template(data)
{	$('.show-article').remove();
	var section=$('section.shows');
	var template='<div class="row show-article">'+
	 		'<div class="col s12 m4 l3">'+
	 			'<img src=":img:" alt=":img-alt:">'+
	 		'</div>'+
	 		'<div class="col s12 m8 l9 show-info">'+
	 			'<h2>:title:</h2>'+
	 			'<p>:sumary:</p>'+
	 		'</div>'+
	 	'</div>';


	data.forEach( function(show,index) {
		var article=template
		.replace(":img:",show.image.original)
		.replace(":title",show.name)
		.replace(":sumary:",show.summary);
		$('.loader').remove();
		section.append(article);
		
	});

}



function busqueda(event)
{
	event.preventDefault();
	var query=$(this).find('input[type=search]').val();
	$.ajax({
		url:'http://api.tvmaze.com/search/shows?',
		data:{
			q:query
		},
			
		success:function(data){
			var el=data.map(function(show){
				return show.show;})
			template(el);
		}
	});
}
