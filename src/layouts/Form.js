// chakra imports
import { Box, ChakraProvider, Spinner, Center } from '@chakra-ui/react';
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from 'routes.js';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import theme from 'theme/theme.js';

export default function FormLayout(props) {
  const { ...rest } = props;

  React.useEffect(() => {
    document.body.style.overflow = 'unset';
    return function cleanup() {};
  });

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.category) {
        return getRoutes(prop.views);
      }
      if (prop.layout === '/form') {
        return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
      } else {
        return null;
      }
    });
  };

  document.documentElement.dir = 'rtl';
  document.documentElement.lang = 'ar';

  return (
    <ChakraProvider theme={theme} resetCss={false}>
      <Box
        w='100%'
        minH='100vh'
        bg='gray.50'
        overflow='auto'
      >
        <Suspense fallback={
          <Center h="100vh">
            <Spinner size="xl" color="#224D59" thickness="4px" />
          </Center>
        }>
          <Switch>
            {getRoutes(routes)}
            <Redirect from='/form' to='/form/inspection' />
          </Switch>
        </Suspense>
      </Box>
    </ChakraProvider>
  );
}
