// chakra imports
import { Box, ChakraProvider, Portal, Spinner, Center } from '@chakra-ui/react';
// core components
import AuthNavbar from 'components/Navbars/AuthNavbar.js';
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from 'routes.js';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import theme from 'theme/theme.js';

export default function Pages(props) {
	const { ...rest } = props;
	// ref for the wrapper div
	const wrapper = React.createRef();
	React.useEffect(() => {
		document.body.style.overflow = 'unset';
		// Specify how to clean up after this effect:
		return function cleanup() {};
	});
	const getActiveRoute = (routes) => {
		let activeRoute = 'Default Brand Text';
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].collapse) {
				let collapseActiveRoute = getActiveRoute(routes[i].views);
				if (collapseActiveRoute !== activeRoute) {
					return collapseActiveRoute;
				}
			} else if (routes[i].category) {
				let categoryActiveRoute = getActiveRoute(routes[i].views);
				if (categoryActiveRoute !== activeRoute) {
					return categoryActiveRoute;
				}
			} else {
				if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
					return routes[i].name;
				}
			}
		}
		return activeRoute;
	};
	const getActiveNavbar = (routes) => {
		let activeNavbar = false;
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].category) {
				let categoryActiveNavbar = getActiveNavbar(routes[i].views);
				if (categoryActiveNavbar !== activeNavbar) {
					return categoryActiveNavbar;
				}
			} else {
				if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
					if (routes[i].secondaryNavbar) {
						return routes[i].secondaryNavbar;
					}
				}
			}
		}
		return activeNavbar;
	};
	const getRoutes = (routes) => {
		return routes.map((prop, key) => {
			if (prop.collapse) {
				return getRoutes(prop.views);
			}
			if (prop.category === 'account') {
				return getRoutes(prop.views);
			}
			if (prop.layout === '/auth') {
				return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
			} else {
				return null;
			}
		});
	};
	const navRef = React.useRef();
	document.documentElement.dir = 'rtl';
	document.documentElement.lang = 'ar';
	return (
		<ChakraProvider theme={theme} resetCss={false} w='100%'>
			<Box ref={navRef} w='100%' position='relative'>
				<Portal containerRef={navRef}>
					<Box position='absolute' top='0' left='0' right='0' zIndex='1000' w='100%'>
						<AuthNavbar secondary={getActiveNavbar(routes)} logoText='SAMI' />
					</Box>
				</Portal>
				<Box w='100%'>
					<Box ref={wrapper} w='100%'>
						<Suspense fallback={
							<Center h="100vh">
								<Spinner size="xl" color="#224D59" thickness="4px" />
							</Center>
						}>
							<Switch>
								{getRoutes(routes)}
								<Redirect from='/auth' to='/auth/login-page' />
							</Switch>
						</Suspense>
					</Box>
				</Box>
			</Box>
		</ChakraProvider>
	);
}
