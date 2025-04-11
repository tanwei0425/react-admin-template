import { useMatches } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { website } from '@config';
function Index({ title }) {
  const matches = useMatches();
  const routesTitle = title ? title : matches[matches?.length - 1]?.handle?.title;
  return (
    <Helmet>
      {routesTitle ? (
        <title>
          {routesTitle} - {website.title}
        </title>
      ) : (
        <title>{website.title}</title>
      )}
    </Helmet>
  );
}
export default Index;
