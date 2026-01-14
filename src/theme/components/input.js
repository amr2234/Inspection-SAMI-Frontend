import { mode } from '@chakra-ui/theme-tools';

export const inputStyles = {
	components: {
		Input: {
			baseStyle: (props) => ({
				field: {
					bg: mode('#FFFFFF', '#0F1F24')(props),
					border: '1px solid',
					borderColor: mode('#808080', '#346860')(props),
					color: mode('#214C59', '#FFFFFF')(props),
					_placeholder: {
						color: '#808080'
					},
					_focus: {
						borderColor: '#62AD45',
						boxShadow: '0 0 0 1px #62AD45'
					},
					_invalid: {
						borderColor: mode('#D64545', '#FF6B6B')(props),
						boxShadow: `0 0 0 1px ${mode('#D64545', '#FF6B6B')(props)}`
					}
				}
			}),
			variants: {
				outline: (props) => ({
					field: {
						bg: mode('#FFFFFF', '#0F1F24')(props),
						border: '1px solid',
						borderColor: mode('#808080', '#346860')(props),
						_hover: {
							borderColor: mode('#214C59', '#62AD45')(props)
						},
						_focus: {
							borderColor: '#62AD45',
							boxShadow: '0 0 0 1px #62AD45'
						}
					}
				})
			}
		},
		Textarea: {
			baseStyle: (props) => ({
				bg: mode('#FFFFFF', '#0F1F24')(props),
				border: '1px solid',
				borderColor: mode('#808080', '#346860')(props),
				color: mode('#214C59', '#FFFFFF')(props),
				_placeholder: {
					color: '#808080'
				},
				_focus: {
					borderColor: '#62AD45',
					boxShadow: '0 0 0 1px #62AD45'
				}
			})
		},
		Select: {
			baseStyle: (props) => ({
				field: {
					bg: mode('#FFFFFF', '#0F1F24')(props),
					border: '1px solid',
					borderColor: mode('#808080', '#346860')(props),
					color: mode('#214C59', '#FFFFFF')(props),
					_focus: {
						borderColor: '#62AD45',
						boxShadow: '0 0 0 1px #62AD45'
					}
				}
			})
		}
	}
};
