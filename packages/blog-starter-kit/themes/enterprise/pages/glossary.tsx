import { GetStaticProps } from 'next';
import Head from 'next/head';
import { request } from 'graphql-request';
import { AppProvider } from '../components/contexts/appContext';
import { Layout } from '../components/layout';
import { Header } from '../components/header';
import { Container } from '../components/container';
import { Footer } from '../components/footer';
import {
  PostsByPublicationQuery,
  PostsByPublicationQueryVariables,
  PublicationFragment,
  PostFragment,
  PostsByPublicationDocument
} from '../generated/graphql';
import PostList from '../components/PostList';
import { useEffect } from 'react';

const GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT;

type Props = {
  publication: PublicationFragment;
  postsByAlphabet: Record<string, PostFragment[]>;
};

const GlossaryPage = ({ publication, postsByAlphabet }: Props) => {
  const alphabetArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  useEffect(() => {
    const handleSmoothScroll = (event: any) => {
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.pageYOffset,
            behavior: 'smooth',
          });
        }
      }
    };

    const links = document.querySelectorAll('a[href^="#section-"]');
    links.forEach((link) => {
      link.addEventListener('click', handleSmoothScroll);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  const handleScrollToIndex = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppProvider publication={publication}>
      <Layout>
        <Head>
          <title>Glossary - {publication.title}</title>
          <meta name="description" content={`Glossary of posts for ${publication.title}`} />
        </Head>
        <Header />
        <Container className="px-5 pb-10">
          <div className="flex justify-between items-center mb-8"/>
          <div className="alphabet-index flex flex-wrap justify-center mb-8 border-2 border-gray-300 rounded-lg shadow-lg">
            {alphabetArray.map((alphabet) => (
              <a
                key={alphabet}
                href={postsByAlphabet[alphabet].length > 0 ? `#section-${alphabet}` : '#'}
                className={`m-2 p-2 ${postsByAlphabet[alphabet].length > 0 ? 'text-[#7aaedb] bold hover:underline' : 'text-gray-400 cursor-not-allowed'}`}
              >
                {alphabet}
              </a>
            ))}
          </div>
          {alphabetArray.map((alphabet) => (
            <section key={alphabet} id={`section-${alphabet}`} className="mt-8 mb-12 pb-4">
              <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">{alphabet}</h2>
              <PostList posts={postsByAlphabet[alphabet]} />
            </section>
          ))}
          <button
            onClick={handleScrollToIndex}
            className="fixed bottom-5 right-5 bg-[rgba(122,174,219,0.5)] text-white p-3 rounded-full shadow-lg hover:bg-[#1c1c1c] focus:outline-none"
          >
            Back to Index
          </button>
        </Container>
        <Footer />
      </Layout>
    </AppProvider>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allPosts: PostFragment[] = [];
  let endCursor = null;
  let hasNextPage = true;
  let publication: PublicationFragment | null = null;

  while (hasNextPage) {
    const variables :any = {
      first: 50,
      host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
      after: endCursor,
      filter: {
        tagSlugs: ["qsglossary"],
      },
    };

    const data = await request<PostsByPublicationQuery>(GQL_ENDPOINT, PostsByPublicationDocument, variables);

    if (!data.publication) {
      return { notFound: true };
    }

    publication = data.publication;
    const newPosts = data.publication.posts.edges.map((edge) => edge.node);
    allPosts.push(...newPosts);
    endCursor = data.publication.posts.pageInfo.endCursor;
    hasNextPage = data.publication.posts.pageInfo.hasNextPage || false;
  }

  const postsByAlphabet: Record<string, PostFragment[]> = {};

  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((alphabet) => {
    const posts = allPosts.filter((post) => post.title.startsWith(alphabet));
    postsByAlphabet[alphabet] = posts;
  });

  return {
    props: {
      publication: publication!,
      postsByAlphabet,
    },
    revalidate: 1,
  };
};

export default GlossaryPage;
