namespace $ {
	$mol_style_define($bog_metrics_dashboard_errors, {
		Summary: {
			gap: $mol_gap.block,
			flex: {
				wrap: 'wrap',
			},
			justifyContent: 'center',
		},

		Error_row: {
			background: {
				color: $mol_theme.card,
			},
			border: {
				radius: $mol_gap.round,
			},
			boxShadow: `0 0 0 1px ${$mol_theme.line}`,
			Head: {
				color: $mol_theme.special,
			},
		},

		Error_last_seen: {
			opacity: 0.5,
			marginLeft: 'auto',
		},
	})
}
