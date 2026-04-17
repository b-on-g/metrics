namespace $ {
	$mol_style_define($bog_metrics_dashboard_sessions, {
		Summary: {
			gap: $mol_gap.block,
			flex: {
				wrap: 'wrap',
			},
			justifyContent: 'center',
		},

		Session_row: {
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

		Session_uid: {
			opacity: 0.6,
			font: {
				family: 'monospace',
			},
		},

		Session_time: {
			opacity: 0.5,
			marginLeft: 'auto',
		},
	})
}
