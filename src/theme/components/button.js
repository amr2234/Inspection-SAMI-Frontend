import { mode } from '@chakra-ui/theme-tools';

export const buttonStyles = {
	components: {
		Button: {
			variants: {
				// Primary Button (Teal)
				primary: (props) => ({
					bg: '#214C59',
					color: '#FFFFFF',
					fontWeight: 'bold',
					_hover: {
						bg: '#346860',
						_disabled: {
							bg: '#AEBFC4'
						}
					},
					_disabled: {
						bg: '#AEBFC4',
						cursor: 'not-allowed',
						opacity: 0.6
					}
				}),
				
				// Accent/CTA Button (Green)
				accent: (props) => ({
					bg: '#62AD45',
					color: mode('#FFFFFF', '#000000')(props),
					fontWeight: 'bold',
					_hover: {
						bg: mode('#4E9636', '#7ED957')(props),
						_disabled: {
							bg: mode('#BFE4AE', '#3C5F2F')(props)
						}
					},
					_disabled: {
						bg: mode('#BFE4AE', '#3C5F2F')(props),
						cursor: 'not-allowed',
						opacity: 0.6
					}
				}),
				
				// Secondary/Outline Button
				secondary: (props) => ({
					bg: 'transparent',
					border: '2px solid',
					borderColor: mode('#214C59', '#62AD45')(props),
					color: mode('#214C59', '#62AD45')(props),
					fontWeight: 'bold',
					_hover: {
						bg: mode('#EAF3F4', 'rgba(98,173,69,0.15)')(props)
					}
				}),
				
				'no-hover': {
					_hover: {
						boxShadow: 'none'
					}
				},
				
				'transparent-with-icon': {
					bg: 'transparent',
					fontWeight: 'bold',
					borderRadius: 'inherit',
					cursor: 'pointer',
					_hover: 'none',
					_active: {
						bg: 'transparent',
						transform: 'none',
						borderColor: 'transparent'
					},
					_focus: {
						boxShadow: 'none'
					},
					_hover: {
						boxShadow: 'none'
					}
				}
			},
			baseStyle: {
				borderRadius: '15px',
				_focus: {
					boxShadow: 'none'
				}
			}
		}
	}
};
