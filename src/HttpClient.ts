const Oun = process.env.NEXT_PUBLIC_OUN ?? 'E290017'
const Origin =
  process.env.NEXT_PUBLIC_API_URL ??
  'https://scu1qudx3s612095292-rs.su.retail.dynamics.com/'

export default async function HttpClient(
  url: string,
  method?: string,
  body?: object
) {
  let baseUrl = process.browser ? '/api' : process.env.API_URL
  let myHeaders = new Headers()
  myHeaders.append('Oun', Oun)
  myHeaders.append('Content', 'application/json')
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Accept', 'application/json')
  myHeaders.append('Origin', Origin)

  let requestOptions: any = {
    method: method ?? 'GET',
    headers: myHeaders,
    cache: 'no-store'
  }

  if (method === 'POST' || method === 'PATCH' || method === 'PUT') {
    requestOptions.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(baseUrl + url, requestOptions)
    console.log(response)
    if (response.status === 200) {
      return response.json()
    } else {
      return response
    }
  } catch (error) {
    console.log('Error: ', error)
  }
}
