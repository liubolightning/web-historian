var archive = require('../helpers/archive-helpers');

archive.readListOfUrls(function(urls){
	urls.forEach(function(url){
		archive.isURLArchived(url, function(isArchived){
			if(!isArchived){
				archive.downloadUrls(url);
			}
		});
	});
});
