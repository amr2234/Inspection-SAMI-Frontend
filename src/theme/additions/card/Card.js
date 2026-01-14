const Card = {
	baseStyle: {
		p: '22px',
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		position: 'relative',
		minWidth: '0px',
		wordWrap: 'break-word',
		backgroundClip: 'border-box'
	},
	variants: {
		panel: (props) => ({
			bg: props.colorMode === 'dark' ? '#132A30' : '#F7FAFB',
			width: '100%',
			boxShadow: props.colorMode === 'dark' 
				? '0px 3.5px 5.5px rgba(0, 0, 0, 0.3)'
				: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
			borderRadius: '15px',
			border: '1px solid',
			borderColor: props.colorMode === 'dark' ? '#214C59' : '#E0E6E8'
		})
	},
	defaultProps: {
		variant: 'panel'
	}
};

export const CardComponent = {
	components: {
		Card
	}
};
