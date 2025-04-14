import { useMatches } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { globalConfig } from '@config';
function Index({ title }) {
  const matches = useMatches();
  const { dynamicTitle } = useSelector((state) => state.theme);
  const routesTitle = title ? title : matches[matches?.length - 1]?.handle?.title;
  return (
    <Helmet>
      {routesTitle && dynamicTitle ? (
        <title>
          {routesTitle} - {globalConfig.title}
        </title>
      ) : (
        <title>{globalConfig.title}</title>
      )}
    </Helmet>
  );
}
export default Index;
