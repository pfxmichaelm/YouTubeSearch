$(document).ready(function() {
	var vidID = "", done = false, player;

    function initIframe() {
      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);	
    }

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
			vidID = item.id.videoId;
			//console.log('ID1: ' + vidID);
			//console.log('[%s] Image URL: %s', item.id.videoId, item.snippet.thumbnails.medium.url);
			//image += '<div>' + item.snippet.thumbnails.medium.url + '</div>';
			//$('img').attr('src', item.snippet.thumbnails.medium.url);
			html += '<img' + " " + 'src=' + item.snippet.thumbnails.medium.url + " " + 'alt=' + vidID + " " + 'class="thumbs"' + 'height="100px"' + " " + 'width="100px"' + '>';
			$('#search-results').html(html);
			//console.log(html);
			selThumbnail();
		}
	}

	$(function() {
		$('#search-string').submit(function(event) {
			event.preventDefault();
			var searchTerm = $('#query').val();
			getRequest(searchTerm);
		});
	});

    function selThumbnail() {
    	// need to select on click and play video 
    	$('#search-results').children().click(function() {
    		vidID = $(this).attr('alt');
    		console.log('click: ' + vidID);
    		//console.log('click: ' + $('img').attr('alt'));
            playvid(vidID);

    	}); 
    }

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    function playvid(vidID) {
      player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: vidID,
        //videoId: 'M7lc1UVf-VE',
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
      //done = false;
    }


/*    function onYouTubeIframeAPIReady() {
      player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'M7lc1UVf-VE',
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    }
*/
    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
      event.target.playVideo();
    }	

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    function onPlayerStateChange(event) {
      // some issue with setting done - false....... 
      if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(pauseVideo, 6000);
        done = true;
      }
    }
    
    function pauseVideo() {
      player.pauseVideo();
      player.destroy();     
      //selThumbnail();
      console.log('done= ', done);
      done = false;
    }

    initIframe();
});