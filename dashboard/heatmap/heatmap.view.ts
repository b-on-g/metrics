namespace $.$$ {

	interface ClickPoint {
		x: number
		y: number
		path: string
	}

	const VIEW_SIZE = 1000

	export class $bog_metrics_dashboard_heatmap extends $.$bog_metrics_dashboard_heatmap {

		@$mol_mem
		click_events(): ClickPoint[] {
			const points: ClickPoint[] = []
			for (const ev of this.all_events()) {
				if (ev.type !== 'click') continue
				let d: any = null
				try { d = JSON.parse(ev.data) } catch { continue }
				if (!d) continue
				const x = Number(d.x)
				const y = Number(d.y)
				if (!isFinite(x) || !isFinite(y)) continue
				const path = typeof d.path === 'string' ? d.path : ''
				points.push({ x, y, path })
			}
			return points
		}

		@$mol_mem
		path_options() {
			const paths = new Set<string>()
			for (const p of this.click_events()) {
				if (p.path) paths.add(p.path)
			}
			const dict: Record<string, string> = { '': 'All pages' }
			for (const p of [...paths].sort()) {
				dict[p] = p
			}
			return dict
		}

		@$mol_mem
		path(next?: string): string {
			if (next !== undefined) return next
			return ''
		}

		@$mol_mem
		filtered_points(): ClickPoint[] {
			const path = this.path()
			const all = this.click_events()
			if (!path) return all
			return all.filter(p => p.path === path)
		}

		clicks_count() {
			return String(this.filtered_points().length)
		}

		unique_pages() {
			const paths = new Set(this.click_events().map(p => p.path).filter(Boolean))
			return String(paths.size)
		}

		empty_text() {
			return this.filtered_points().length
				? ''
				: 'No click data yet.'
		}

		empty_sub() {
			return this.filtered_points().length ? [] : [this.Empty_text()]
		}

		dots() {
			return this.filtered_points().map((_, i) => this.Dot(i))
		}

		dot_pos(id: number | string): readonly number[] {
			const pt = this.filtered_points()[Number(id)]
			if (!pt) return [0, 0]
			return [pt.x * VIEW_SIZE, pt.y * VIEW_SIZE]
		}
	}
}

