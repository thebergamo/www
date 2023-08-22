import providers from './providers.json'
import micromatch from 'micromatch'

export function getApiUrl(url: string) {
  for (const provider of providers) {
    for (const endpoint of provider['endpoints']) {
      if ('schemes' in endpoint && micromatch.isMatch(url, endpoint.schemes)) {
        return endpoint.url.replace('{format}', 'json')
      } else if (
        !('schemes' in endpoint) &&
        'provider_url' in provider &&
        url.startsWith(provider.provider_url)
      ) {
        return endpoint.url
      }
    }
  }
}

async function fakeGistOEmbed(url: string) {
  const searchParams = new URLSearchParams(url.split('?')[1])
  const gistUrl = searchParams.get('url')?.split('#')[0]

  const response = await fetch(`${gistUrl}.json`)
  const data = await response.json()

  return {
    html: data.div,
    style: data.stylesheet,
  }
}

async function fetchJson(url: string) {
  if (url.startsWith('https://gist.github.com/oembed')) {
    return fakeGistOEmbed(url)
    // return fakeGistEmbed(url)
  }

  const response = await fetch(url)
  return response.json()
}

export async function oEmbedNode(url: string) {
  const apiUrl = getApiUrl(url)
  if (!apiUrl) {
    return
  }

  const params = new URLSearchParams()
  params.set('url', url)
  params.set('format', 'json')
  params.set('maxwidth', '640')
  params.set('maxheight', '480')

  try {
    const oembed = await fetchJson(`${apiUrl}?${params}`)

    const width = oembed.width ? `width: ${oembed.width}; ` : ''
    const height = oembed.height ? `height: ${oembed.height}; ` : ''

    console.log({ oembed })

    return `
      <div style="${width}${height}display: flex; justify-content: center;" data-remark-oembed>
        ${oembed.html}
      </div>
    `
  } catch (err) {
    console.error('Error while fetching oEmbed', err)
    return
  }
}
