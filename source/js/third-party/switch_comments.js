$('#switch-comment').click(function () {
  switchComment();
  return false;
})
function switchComment () {
  const title = $('#switch-comment').attr('title') === '切换为来必力' ? '切换为Gitalk' : '切换为来必力'
  const i = $('#switch-comment>i')
  if ($('#lv-container').css('display') === 'none') {
    $('#gitalk-container').slideUp('normal', () => {
      $('#lv-container').slideDown('normal', () => {
        $('#switch-comment').attr('title', title)
        i.hasClass('fa-toggle-off') ? i.removeClass('fa-toggle-off').addClass('fa-toggle-on') : i.removeClass('fa-toggle-on').addClass('fa-toggle-off')
      })
    })
  } else {
    $('#lv-container').slideUp('normal', () => {
      $('#gitalk-container').slideDown('normal', () => {
        $('#switch-comment').attr('title', title)
        i.hasClass('fa-toggle-off') ? i.removeClass('fa-toggle-off').addClass('fa-toggle-on') : i.removeClass('fa-toggle-on').addClass('fa-toggle-off')
      })
    })
  }
}

