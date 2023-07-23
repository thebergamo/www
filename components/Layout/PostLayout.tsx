import { PostContainer, PostContent, PostHeader } from 'components/Blog/Post'
import Footer from 'components/Globals/Footer'
import { Header } from 'components/Globals/Header'
import { PropsWithChildren } from 'react'

type Props = {
  children: PropsWithChildren['children'] & { props: any }
}

export default function PostLayout({ children }: Props) {
  const {
    title,
    image,
    date,
    content,
    image_alt,
    image_credit,
    original_post,
  } = children.props.post

  return (
    <>
      <Header />
      <main className="px-8 bg-gray-50 dark:bg-gray-900">
        <div className="z-10 mb-8">
          <PostHeader
            title={title}
            image={image}
            date={date}
            content={content}
            imageAlt={image_alt}
            imageCredit={image_credit}
            originalPost={original_post}
          />
          <PostContent>
            <PostContainer>{children}</PostContainer>
          </PostContent>
        </div>
        <Footer />
      </main>
    </>
  )
}
