let currentArticleId;
let articleInfo;

$(document).ready(function() {
  function getArticles() {
    $.ajax({
      method: 'GET',
      url: '/articles'
    }).then(function(dbArticles) {
      dbArticles.forEach(article => {
        $('<li>')
          .addClass('list-group-item article')
          .append(article.title)
          .attr('data-id', article._id)
          .appendTo($('#articles'));
          
      });
      articleListener();
    });
  }

  function articleListener() {
    $('#articles').on('click', '.article', function() {

      const articleId = $(this).attr('data-id');
      currentArticleId = articleId;
      $('#note-title').val('');
      $('#note-body').val('');
      
      $.ajax({
        url: `/articles/${articleId}`,
        method: 'GET'
      }).then(function(articleData) {
        console.log(articleData);
        articleInfo = articleData;
        currentArticleId = articleId;
        $('#note-title-display').text("");
        $('#note-body-display').text("");
        $('#article-link')
          .attr('href', 'https://aeon.co'+articleData.link)
          .text(articleData.title);
        $('#article-summary').text(articleData.summary);
        console.log("Articledata.note"+articleData.note.body);
        if (articleData.note){
        $('#note-body').val(articleData.note.body);
        $('#note-title').val(articleData.note.title);
          $('#submit-note').attr('data-id', articleData._id).attr("data-note-id", articleData.note._id);
        $('#note-title-display').text(articleData.note.body);
        $('#note-body-display').text(articleData.note.body);
        };
      });
    });
  };

  
    $('#submit-note').on('click', function(e) {
      e.preventDefault();

      const articleId = currentArticleId;
      console.log(articleId);
      console.log(articleInfo);
      if (!articleId) {
        return false;
      }

      const noteData = {
        title: $('#note-title')
          .val()
          .trim(),
        body: $('#note-body')
          .val()
          .trim()
      };

      $.ajax({
        url: `/articles/${articleId}`,
        method: 'PUT',
        data: noteData
      }).then(function(data) {
        console.log(data);
        $('#note-title').val('');
        $('#note-body').val('');
      });
    });


  getArticles();
});