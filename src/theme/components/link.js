import { mode } from '@chakra-ui/theme-tools';

export const linkStyles = {
	components: {
		Link: {
			decoration: 'none',
			baseStyle: (props) => ({
				color: mode('#214C59', '#62AD45')(props),
				textDecoration: 'none',
				_hover: {
					textDecoration: 'none',
					color: mode('#346860', '#7ED957')(props)
				},
				_focus: {
					boxShadow: 'none'
				}
			})
		}
	}
};
