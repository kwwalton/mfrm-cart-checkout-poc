export default function getCookieValueOnClient(cookieName: string) {
  const decodedCookies = decodeURIComponent(document.cookie).split(';')
  let cookieValue = null
  for (let i = 0; i < decodedCookies.length; i++) {
    const keyAndValue = decodedCookies[i].trim().split('=')
    if (keyAndValue[0] === cookieName) {
      cookieValue = keyAndValue[1]
      break
    }
  }
  return cookieValue
}
