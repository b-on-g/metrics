namespace $ {
	$mol_style_define($bog_metrics_dashboard_overview, {
		Stats: {
			gap: $mol_gap.block,
			flex: {
				wrap: 'wrap',
			},
			justifyContent: 'center',
		},

		Chart: {
			height: '16rem',
			flex: {
				shrink: 0,
			},
		},

		Top_pages_section: {
			margin: {
				top: $mol_gap.block,
			},
		},

		Top_referrers_section: {
			margin: {
				top: $mol_gap.block,
			},
		},
	})

	$mol_style_define($bog_metrics_dashboard_stat_card, {
		flex: {
			basis: '10rem',
			grow: 1,
			direction: 'column',
		},
		alignItems: 'center',
		padding: $mol_gap.block,
		background: {
			color: $mol_theme.card,
		},
		border: {
			radius: $mol_gap.round,
		},
		boxShadow: `0 0 0 1px ${$mol_theme.line}`,

		Value: {
			font: {
				size: '2rem',
				weight: 'bold',
			},
			color: $mol_theme.current,
		},

		Title: {
			opacity: 0.6,
			font: {
				size: '.85rem',
			},
		},
	})
}
