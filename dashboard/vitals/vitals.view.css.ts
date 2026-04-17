namespace $ {
	$mol_style_define($bog_metrics_dashboard_vitals, {
		Summary: {
			gap: $mol_gap.block,
			flex: {
				wrap: 'wrap',
			},
			justifyContent: 'center',
		},

		Chart: {
			height: '10rem',
			flex: {
				shrink: 0,
			},
		},

		Vital_row: {
			background: {
				color: $mol_theme.card,
			},
			border: {
				radius: $mol_gap.round,
			},
			padding: $mol_gap.block,
			boxShadow: `0 0 0 1px ${$mol_theme.line}`,
			gap: $mol_gap.block,
		},

		Vital_time: {
			opacity: 0.5,
			marginLeft: 'auto',
		},
	})
}
