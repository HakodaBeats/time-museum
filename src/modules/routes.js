function renderPage(req, res, next) {
  const page = formatURL(req.url)
  const dir = __dirname.slice(0, -7)

  res.sendFile(dir + page, pageNotFound => {
    if (pageNotFound) 
      res.sendFile(dir + '/pages/not-found.html')
  })
}

function formatURL(requestURL) {
  if (requestURL == '/') 
    requestURL += 'home'
  return `pages/${requestURL}.html`
}

module.exports = renderPage