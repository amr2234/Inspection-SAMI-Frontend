import { extendTheme } from '@chakra-ui/react';
import { globalStyles } from './styles';
import { breakpoints } from './foundations/breakpoints';
import { buttonStyles } from './components/button';
import { badgeStyles } from './components/badge';
import { linkStyles } from './components/link';
import { drawerStyles } from './components/drawer';
import { inputStyles } from './components/input';
import { alertStyles } from './components/alert';
import { CardComponent } from './additions/card/Card';
import { CardBodyComponent } from './additions/card/CardBody';
import { CardHeaderComponent } from './additions/card/CardHeader';
import { MainPanelComponent } from './additions/layout/MainPanel';
import { PanelContentComponent } from './additions/layout/PanelContent';
import { PanelContainerComponent } from './additions/layout/PanelContainer';

/**
 * Custom Theme Configuration
 * 
 * COLOR PALETTE:
 * - Primary Teal: #214C59 (Brand identity, headers, navigation)
 * - Secondary Teal: #346860 (Hover states, secondary elements)
 * - Accent Green: #62AD45 (CTA buttons, success states, focus)
 * 
 * USAGE GUIDELINES:
 * 1. Use 'accent' variant for primary CTAs (Sign Up, Submit, Confirm)
 * 2. Use 'primary' variant for brand-related actions (Login, Navigation)
 * 3. Use 'secondary' variant for outline/ghost buttons
 * 4. Green should be used sparingly to maintain brand elegance
 * 5. In dark mode, backgrounds are calm with green as the focal point
 * 
 * BUTTON VARIANTS:
 * - <Button variant="primary">Primary Action</Button>
 * - <Button variant="accent">CTA Action</Button>
 * - <Button variant="secondary">Secondary Action</Button>
 * 
 * ALERT VARIANTS:
 * - <Alert variant="success">Success message</Alert>
 * - <Alert variant="info">Info message</Alert>
 * - <Alert variant="warning">Warning message</Alert>
 * - <Alert variant="error">Error message</Alert>
 * 
 * COLOR ACCESS:
 * - Use color="primaryTeal" for primary text
 * - Use color="accentGreen" for CTA text
 * - Use bg="teal.500" for backgrounds
 * - Use borderColor="gray.200" for borders
 */

export default extendTheme(
	{ breakpoints }, // Breakpoints
	globalStyles,
	buttonStyles, // Button styles
	badgeStyles, // Badge styles
	linkStyles, // Link styles
	drawerStyles, // Sidebar variant for Chakra's drawer
	inputStyles, // Input styles
	alertStyles, // Alert styles
	CardComponent, // Card component
	CardBodyComponent, // Card Body component
	CardHeaderComponent, // Card Header component
	MainPanelComponent, // Main Panel component
	PanelContentComponent, // Panel Content component
	PanelContainerComponent // Panel Container component
);
