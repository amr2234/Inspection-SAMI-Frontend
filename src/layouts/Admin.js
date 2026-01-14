// Chakra imports
import { ChakraProvider, Portal, useDisclosure, Spinner, Center } from '@chakra-ui/react';
// Layout components
import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import Sidebar from 'components/Sidebar';
import React, { useState, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from 'routes.js';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// Custom Chakra theme
import theme from 'theme/theme.js';
// Custom components
import MainPanel from '../components/Layout/MainPanel';
import PanelContainer from '../components/Layout/PanelContainer';
import PanelContent from '../components/Layout/PanelContent';
export default function Dashboard(props) {
	const { ...rest } = props;
	// states and functions
	const [ sidebarVariant, setSidebarVariant ] = useState('transparent');
	const [ fixed, setFixed ] = useState(false);
	// functions for changing the states from components
	const getRoute = () => {
		return window.location.pathname !== '/admin/full-screen-maps';
	};
	const getActiveRoute = (routes) => {
		let activeRoute = 'لوحة القيادة'; // Default Arabic text
		let longestMatch = '';
		
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
				const fullPath = routes[i].layout + routes[i].path;
				// Find the longest matching path (for nested routes like /visits/:id)
				if (window.location.pathname.startsWith(fullPath.replace(/:\w+/g, ''))) {
					if (fullPath.length > longestMatch.length) {
						longestMatch = fullPath;
						activeRoute = routes[i].rtlName || routes[i].name;
					}
				}
			}
		}
		return activeRoute;
	};
	// This changes navbar state(fixed or not)
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
			if (prop.layout === '/admin') {
				return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
			} else {
				return null;
			}
		});
	};
	const { isOpen, onOpen, onClose } = useDisclosure();
	document.documentElement.dir = 'rtl';
	document.documentElement.lang = 'ar';
	// Chakra Color Mode
	return (
		<ChakraProvider theme={theme} resetCss={false}>
			<Sidebar
				routes={routes}
				logoText={'SAMI'}
				display='none'
				sidebarVariant={sidebarVariant}
				{...rest}
			/>
			<MainPanel
				w={{
					base: '100%',
					xl: 'calc(100% - 275px)'
				}}>
				<Portal>
					<AdminNavbar
						logoText={'SAMI'}
						brandText={getActiveRoute(routes)}
						secondary={getActiveNavbar(routes)}
						fixed={fixed}
						{...rest}
					/>
				</Portal>
				{getRoute() ? (
					<PanelContent>
						<PanelContainer>
							<Suspense fallback={
								<Center h="calc(100vh - 200px)">
									<Spinner size="xl" color="#224D59" thickness="4px" />
								</Center>
							}>
								<Switch>
									{getRoutes(routes)}
									<Redirect from='/admin' to='/admin/dashboard' />
								</Switch>
							</Suspense>
						</PanelContainer>
					</PanelContent>
				) : null}
			</MainPanel>
		</ChakraProvider>
	);
}
