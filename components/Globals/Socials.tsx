import Link from 'next/link'
import globalsConfig from './globals.config'

const socials = globalsConfig.socials

type ExternalLinkProps = {
  href?: string
  text: string
}
const ExternalLink = ({ href, text }: ExternalLinkProps) => (
  <a
    className="text-zinc-400 hover:underline dark:hover:text-zinc-200 transition"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {text}
  </a>
)

export default function Social() {
  return (
    <div className="flex flex-col space-y-4">
      {socials.map(({ link, title }) => (
        <Link
          key={link}
          href={link}
          className="text-zinc-400 hover:underline dark:hover:text-zinc-200 transition"
        >
          {title}
        </Link>
      ))}
      <ExternalLink href="/feed.xml" text="RSS" />
    </div>
  )
}
