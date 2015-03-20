$(document).ready(function() {
	function getRequest(searchTerm) {
		var params = {
			part: 'snippet',
			key: 'AIzaSyD_g7nFWUGdfL-kJ61NXlnSY-2RUb59mik',			
			q: searchTerm,
			maxResults: 50
		};
        endPoint = 'https://www.googleapis.com/youtube/v3/search';
        
        $.getJSON(endPoint, params, function(data) {
        	showResults(data);
        });
	}

/*	function showResults(results) {
		//var html = "";
		$.each(results, function(index, value) {
			//html += '<div>' + value.Title + '</div>';
			console.log(value.snippet.thumbnails.medium.url);
		});
		//$('#search-results').html(html);
	}*/

	function showResults(results) {
		var html = "";
		for(var i in results.items) {
			var item = results.items[i];
			console.log('[%s] Image URL: %s', item.id.videoId, item.snippet.thumbnails.medium.url);
			//image += '<div>' + item.snippet.thumbnails.medium.url + '</div>';
			$('img').attr('src', item.snippet.thumbnails.medium.url);
		}
	}

	$(function() {
		$('#search-string').submit(function(event) {
			event.preventDefault();
			var searchTerm = $('#query').val();
			getRequest(searchTerm);
		});
	});

});