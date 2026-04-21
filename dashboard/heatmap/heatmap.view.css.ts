namespace $ {
	$mol_style_define($bog_metrics_dashboard_heatmap, {
		Controls: {
			gap: $mol_gap.block,
			flex: {
				wrap: 'wrap',
			},
			alignItems: 'stretch',
		},

		Path_select: {
			flex: {
				grow: 1,
				basis: '16rem',
			},
			minWidth: 0,
		},

		Map_section: {
			margin: {
				top: $mol_gap.block,
			},
		},

		Svg: {
			width: '100%',
			aspectRatio: '1 / 1',
			background: {
				color: $mol_theme.card,
			},
			border: {
				radius: $mol_gap.round,
			},
			boxShadow: `0 0 0 1px ${$mol_theme.line}`,
			display: 'block',
		},

		Dot: {
			fill: '#ff3b30',
			fillOpacity: '0.25',
			mixBlendMode: 'multiply',
			pointerEvents: 'none',
		},

		Empty_row: {
			justifyContent: 'center',
			padding: $mol_gap.block,
		},

		Empty_text: {
			opacity: 0.6,
		},
	})
}
