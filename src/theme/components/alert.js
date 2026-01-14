import { mode } from '@chakra-ui/theme-tools';

export const alertStyles = {
	components: {
		Alert: {
			variants: {
				// Success Alert
				success: (props) => ({
					container: {
						bg: mode('#E8F5E3', 'rgba(98,173,69,0.15)')(props),
						color: '#62AD45',
						border: '1px solid',
						borderColor: mode('#62AD45', 'rgba(98,173,69,0.3)')(props),
						borderRadius: '15px'
					}
				}),
				
				// Info Alert
				info: (props) => ({
					container: {
						bg: mode('#EAF3F4', 'rgba(33,76,89,0.3)')(props),
						color: mode('#214C59', '#BFD3D8')(props),
						border: '1px solid',
						borderColor: mode('#214C59', 'rgba(33,76,89,0.5)')(props),
						borderRadius: '15px'
					}
				}),
				
				// Warning Alert
				warning: (props) => ({
					container: {
						bg: mode('#FFF4E5', 'rgba(199,119,0,0.2)')(props),
						color: mode('#C77700', '#FFC266')(props),
						border: '1px solid',
						borderColor: mode('#C77700', 'rgba(199,119,0,0.4)')(props),
						borderRadius: '15px'
					}
				}),
				
				// Error Alert
				error: (props) => ({
					container: {
						bg: mode('#FDEAEA', 'rgba(214,69,69,0.2)')(props),
						color: mode('#D64545', '#FF6B6B')(props),
						border: '1px solid',
						borderColor: mode('#D64545', 'rgba(214,69,69,0.4)')(props),
						borderRadius: '15px'
					}
				})
			},
			defaultProps: {
				variant: 'info'
			}
		}
	}
};
