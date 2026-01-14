import { mode } from '@chakra-ui/theme-tools';

export const globalStyles = {
	colors: {
		// Brand Colors
		primaryTeal: '#214C59',
		secondaryTeal: '#346860',
		accentGreen: '#62AD45',
		
		// Extended Teal Palette
		teal: {
			50: '#EAF3F4',
			100: '#BFD3D8',
			200: '#AEBFC4',
			300: '#7A9BA4',
			400: '#346860',
			500: '#214C59',
			600: '#1A3D47',
			700: '#132A30',
			800: '#0F1F24',
			900: '#000000'
		},
		
		// Extended Green Palette
		green: {
			50: '#E8F5E3',
			100: '#BFE4AE',
			200: '#9DD687',
			300: '#7ED957',
			400: '#62AD45',
			500: '#4E9636',
			600: '#3C7D2B',
			700: '#3C5F2F',
			800: '#2D4722',
			900: '#1E2F17'
		},
		
		// Gray Scale
		gray: {
			50: '#F7FAFB',
			100: '#EAF3F4',
			200: '#E0E6E8',
			300: '#BFD3D8',
			400: '#AEBFC4',
			500: '#808080',
			600: '#666666',
			700: '#3A4F56',
			800: '#1f2733',
			900: '#000000'
		},
		
		// Status Colors
		success: '#62AD45',
		info: '#214C59',
		warning: '#C77700',
		error: '#D64545',
		
		// Alert Colors (Light Mode)
		successBg: '#E8F5E3',
		infoBg: '#EAF3F4',
		warningBg: '#FFF4E5',
		errorBg: '#FDEAEA'
	},
	styles: {
		global: (props) => ({
			body: {
				bg: mode('#FFFFFF', '#000000')(props),
				color: mode('#214C59', '#FFFFFF')(props),
				fontFamily: "'Roboto', sans-serif"
			},
			html: {
				fontFamily: "'Roboto', sans-serif"
			}
		})
	}
};
