module.exports = [
	require("./uri/ip"),
	require("./uri/info"),
	require("./newsapi/google-news"),
	require("./extract-media/rss-feed/rss-feed-parse-url"),
	require("./extract-media/rss-feed/rss-feed-parse-string"),
	require("./extract-media/html/html-parse-url"),
	require("./extract-media/html/html-parse-string"),
	require("./extract-media/docx/docx-parse-url"),
	require('./extract-media/xml/xml-parse-string'),
	require('./extract-media/xml/xml-parse-url'),
	require('./extract-media/csv/csv-parse-string'),
	require('./extract-media/csv/csv-parse-url')
];