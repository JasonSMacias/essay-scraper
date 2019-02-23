const db = require('../models');

module.exports = {
  scrape: function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://aeon.co/essays").then(function (response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
      const articleArr = [];
      // Now, we grab every h2 within an article tag, and do the following:
      $("a.article-card__title").each(function (i, element) {
        // Save an empty result object
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .text();
        //Note, link brings back relative link, needs to be appended to "https://aeon.co" later
        result.link = $(this)
          .attr("href");
        result.summary = $(this)
          .next("h2")
          .text();

        articleArr.push(result);
      
      });

      db.Article.create(articleArr)
        .then(() => res.send("Scrape Complete"))
        .catch(err => {
          console.log(err);
          res.json(err);
        })
    });
  }
}